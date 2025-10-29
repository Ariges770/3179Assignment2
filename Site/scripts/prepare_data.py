#!/usr/bin/env python3
"""
Data preprocessing script for Vega-Lite visualization.
Converts wide-format CSVs to tidy format suitable for charting.
"""

import pandas as pd
import numpy as np
from pathlib import Path

# Paths
DATA_DIR = Path(__file__).parent.parent.parent / "Data"
OUTPUT_DIR = Path(__file__).parent.parent / "data"
OUTPUT_DIR.mkdir(exist_ok=True)

print("Starting data preprocessing...")

# ===== 1. Process RetailTradeData.csv =====
print("\n1. Processing RetailTradeData.csv...")

# Read header row to get state+industry mapping
header_df = pd.read_csv(DATA_DIR / "RetailTradeData.csv", nrows=1)

# Parse column headers
col_mapping = []
for col in header_df.columns[1:]:  # Skip first empty column
    if ";" in col:
        parts = [p.strip() for p in col.split(";")]
        if len(parts) >= 3:
            state = parts[1]
            industry = parts[2]
            col_mapping.append({"state": state, "industry": industry, "col_idx": len(col_mapping)})

# Read data rows (skip first 8 metadata rows)
retail_df = pd.read_csv(DATA_DIR / "RetailTradeData.csv", skiprows=8)
retail_df.columns = ["date"] + list(retail_df.columns[1:])

# Build tidy format
rows = []
for _, row_data in retail_df.iterrows():
    date_val = row_data["date"]
    if pd.isna(date_val) or str(date_val).strip() == "":
        continue
    
    # Process each state+industry column
    for idx, col_info in enumerate(col_mapping):
        if idx + 1 >= len(retail_df.columns):
            break
            
        col_name = retail_df.columns[idx + 1]
        turnover = row_data[col_name]
        
        if pd.notna(turnover):
            try:
                turnover_val = float(turnover)
                rows.append({
                    "date": date_val,
                    "state": col_info["state"],
                    "industry": col_info["industry"],
                    "turnover": turnover_val
                })
            except (ValueError, TypeError):
                continue

retail_tidy = pd.DataFrame(rows)
retail_tidy["date"] = pd.to_datetime(retail_tidy["date"], format="%b-%Y")

# Sort and compute YoY growth
retail_tidy = retail_tidy.sort_values(["state", "industry", "date"]).reset_index(drop=True)
retail_tidy["yoy_pct"] = retail_tidy.groupby(["state", "industry"])["turnover"].pct_change(12) * 100

# Save tidy retail data
retail_tidy.to_csv(OUTPUT_DIR / "retail_tidy.csv", index=False)
print(f"   ✓ Saved {len(retail_tidy)} rows to retail_tidy.csv")

# ===== 2. Latest Top 10 Industries by State =====
print("\n2. Creating top 10 industries dataset...")
latest_date = retail_tidy["date"].max()
latest_data = retail_tidy[retail_tidy["date"] == latest_date].copy()

# Get top 10 industries by total national turnover
industry_totals = latest_data.groupby("industry")["turnover"].sum().sort_values(ascending=False).head(10)
top_industries = industry_totals.index.tolist()

# Filter for top industries
top10_data = latest_data[latest_data["industry"].isin(top_industries)]
top10_data.to_csv(OUTPUT_DIR / "retail_latest_top10.csv", index=False)
print(f"   ✓ Saved {len(top10_data)} rows to retail_latest_top10.csv")

# ===== 3. Monthly Seasonality Pattern =====
print("\n3. Creating monthly seasonality dataset...")
# Calculate average turnover by month across all years
retail_tidy["month"] = retail_tidy["date"].dt.month
retail_tidy["month_name"] = retail_tidy["date"].dt.strftime("%B")

# Aggregate for "Total (Industry)" for each state
total_industry_data = retail_tidy[retail_tidy["industry"] == "Total (Industry)"].copy()
monthly_avg = total_industry_data.groupby(["state", "month", "month_name"])["turnover"].mean().reset_index()
monthly_avg = monthly_avg.sort_values(["state", "month"])

monthly_avg.to_csv(OUTPUT_DIR / "monthly_seasonality.csv", index=False)
print(f"   ✓ Saved {len(monthly_avg)} rows to monthly_seasonality.csv")

# ===== 4. Process Labour Market Data =====
print("\n4. Processing labour market data...")

# Read unemployment rates data 
# The header is split across rows 6 and 7, actual data starts at row 8
labour_df = pd.read_csv(DATA_DIR / "LabourMarketRatingsUnemploymentRates.csv", skiprows=6, nrows=100)

# Set proper column names from row 6+7
labour_df.columns = [
    "SA4_Code",
    "SA4_Name", 
    "Rating",
    "Working_Age_Employment_Rate",
    "Unemployment_Rate",
    "JobSeeker_Proportion",
    "Underemployment_Rate",
    "Vacancy_Fill_Rate",
    "Unnamed_8",
    "Unnamed_9",
    "Unnamed_10",
    "Unnamed_11",
    "Unnamed_12"
]

# Drop the first row (it contains date labels) and unnamed columns
labour_df = labour_df.iloc[1:].reset_index(drop=True)
labour_df = labour_df[["SA4_Code", "SA4_Name", "Rating", "Working_Age_Employment_Rate", 
                        "Unemployment_Rate", "JobSeeker_Proportion", 
                        "Underemployment_Rate", "Vacancy_Fill_Rate"]]

# Convert numeric columns
for col in ["Unemployment_Rate", "Working_Age_Employment_Rate", "JobSeeker_Proportion",
            "Underemployment_Rate", "Vacancy_Fill_Rate"]:
    labour_df[col] = pd.to_numeric(labour_df[col], errors='coerce')

# Convert SA4_Code to string to match TopoJSON format
labour_df["SA4_Code"] = labour_df["SA4_Code"].astype(str)

# This is already tidy, just save it
labour_df.to_csv(OUTPUT_DIR / "labour_unemp_tidy.csv", index=False)
print(f"   ✓ Saved {len(labour_df)} rows to labour_unemp_tidy.csv")

# ===== 5. Rating Distribution =====
print("\n5. Creating rating distribution dataset...")

# Count how many SA4 regions have each rating
if "Rating" in labour_df.columns:
    rating_dist = labour_df["Rating"].value_counts().reset_index()
    rating_dist.columns = ["rating", "count"]
    
    # Sort by a custom order
    rating_order = ["Weak", "Below average", "Average", "Above average", "Strong"]
    rating_dist["rating"] = pd.Categorical(rating_dist["rating"], categories=rating_order, ordered=True)
    rating_dist = rating_dist.sort_values("rating").reset_index(drop=True)
    
    rating_dist.to_csv(OUTPUT_DIR / "rating_distribution.csv", index=False)
    print(f"   ✓ Saved {len(rating_dist)} rows to rating_distribution.csv")

# ===== 6. Scatter Plot Data (Retail vs Unemployment) =====
print("\n6. Creating scatter plot dataset...")

# Get latest retail data by state (total industry)
latest_retail_by_state = retail_tidy[
    (retail_tidy["date"] == latest_date) & 
    (retail_tidy["industry"] == "Total (Industry)")
].copy()
latest_retail_by_state = latest_retail_by_state[["state", "turnover"]].rename(columns={"turnover": "retail_turnover"})

# Calculate average unemployment rate by state from SA4 data
# Extract state from SA4 name (first word before " - ")
labour_df["State"] = labour_df["SA4_Name"].str.split(" - ").str[0]
state_unemp = labour_df.groupby("State")["Unemployment_Rate"].mean().reset_index()
state_unemp.columns = ["state", "unemployment_rate"]

# Merge
scatter_data = latest_retail_by_state.merge(state_unemp, on="state", how="inner")
scatter_data.to_csv(OUTPUT_DIR / "scatter_retail_unemp.csv", index=False)
print(f"   ✓ Saved {len(scatter_data)} rows to scatter_retail_unemp.csv")

print("\n✅ All preprocessing complete!")
print(f"Output directory: {OUTPUT_DIR.absolute()}")
