// Visualization 8: Top 5 Industries by State Bar Chart
const spec8 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 600,
    "autosize": {
        "type": "fit",
        "contains": "padding"
    },
    "title": {"expr": "zoomLevel == 'Australia' ? 'Australia Top 5' : zoomLevel + ' Top 5'"},
    "params": [
        {
            "name": "zoomLevel",
            "value": "Australia"
        }
    ],
    "data": {"url": "data/retail_tidy.csv"},
    "transform": [
        {"filter": "datum.date == '2025-06-01'"},
        {"calculate": "zoomLevel == 'Australia' ? 'Total (State)' : zoomLevel", "as": "targetState"},
        {"filter": "datum.state == datum.targetState"},
        {"filter": "datum.industry != 'Total (Industry)'"},
        {
            "aggregate": [{"op": "sum", "field": "turnover", "as": "total_turnover"}],
            "groupby": ["industry"]
        },
        {
            "window": [{"op": "rank", "as": "rank"}],
            "sort": [{"field": "total_turnover", "order": "descending"}]
        },
        {"filter": "datum.rank <= 10"}
    ],
    "mark": {"type": "bar"},
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
        "color": {
            "condition": {
                "test": "datum.rank <= 3",
                "value": "#4682b4"
            },
            "value": "#cccccc"
        },
        "tooltip": [
            {"field": "industry", "type": "nominal", "title": "Industry"},
            {"field": "total_turnover", "type": "quantitative", "title": "Total Turnover ($M)", "format": ",.0f"},
            {"field": "rank", "type": "ordinal", "title": "Rank"}
        ]
    }
};
