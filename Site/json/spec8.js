// Visualization 8: Top 10 Industries Bar Chart
const spec8 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 1000,
    "height": 400,
    "data": {"url": "data/retail_latest_top10.csv"},
    "transform": [
    {
        "aggregate": [{"op": "sum", "field": "turnover", "as": "total_turnover"}],
        "groupby": ["industry"]
    },
    {
        "window": [{"op": "rank", "as": "rank"}],
        "sort": [{"field": "total_turnover", "order": "descending"}]
    },
    {"filter": "datum.rank <= 10"},
    {"filter": "datum.industry != 'Total (Industry)'"},
    // {"filter": "datum.state != 'Total (State)'"}
    ],
    "mark": {"type": "bar", "color": "#4682b4"},
    "encoding": {
        "x": {
            "field": "total_turnover",
            "type": "quantitative",
            "title": "Total Turnover ($ Millions)"
        },
        "y": {
            "field": "industry",
            "type": "nominal",
            "title": "Industry",
            "sort": "-x"
        },
        "tooltip": [
            {"field": "industry", "type": "nominal", "title": "Industry"},
            {"field": "total_turnover", "type": "quantitative", "title": "Total Turnover ($M)", "format": ",.0f"}
        ]
    }
};