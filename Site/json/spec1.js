// Visualization 1: State Total Turnover Timeline
const spec1 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 1000,
    "height": 400,
    "data": {"url": "data/retail_tidy.csv"},
    "transform": [
        {"filter": "datum.industry == 'Total (Industry)'"},
        {"filter": "datum.state != 'Total (State)'"}
    ],
    "mark": {"type": "line", "point": false, "strokeWidth": 2},
    "encoding": {
        "x": {
            "field": "date",
            "type": "temporal",
            "title": "Date",
            "axis": {"format": "%Y"}
        },
        "y": {
            "field": "turnover",
            "type": "quantitative",
            "title": "Log Turnover ($ Millions)",
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
            {"field": "date", "type": "temporal", "title": "Date", "format": "%b %Y"},
            {"field": "turnover", "type": "quantitative", "title": "Turnover ($M)", "format": ",.0f"}
        ]
    }
};