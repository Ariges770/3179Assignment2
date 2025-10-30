// Visualization 7: Scatter Plot (Retail vs Unemployment)
const spec7 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 450,
    "data": {"url": "data/scatter_retail_unemp.csv"},
    "transform": [
        {"calculate": "log(datum.retail_turnover)", "as": "retail_turnover_log"}
    ],
    "mark": {"type": "point", "filled": true, "size": 200},
    "encoding": {
        "x": {
            "field": "unemployment_rate",
            "type": "quantitative",
            "title": "Average Unemployment Rate (%)"
        },
        "y": {
            "field": "retail_turnover",
            "type": "quantitative",
            "title": "Retail Turnover ($M, Log Scale)",
            "scale": {"type": "log"}
        },
        "color": {
            "field": "state",
            "type": "nominal",
            "title": "State",
            "scale": {"scheme": "category10"}
        },
        "tooltip": [
            {"field": "state", "type": "nominal", "title": "State"},
            {"field": "unemployment_rate", "type": "quantitative", "title": "Unemployment Rate (%)", "format": ".1f"},
            {"field": "retail_turnover", "type": "quantitative", "title": "Retail Turnover ($M)", "format": ",.0f"},
            {"field": "retail_turnover_log", "type": "quantitative", "title": "Retail Turnover (Log)", "format": ".2f"}
        ]
    }
};