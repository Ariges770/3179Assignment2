// Visualization 2: YoY Growth Rate Timeline
const spec2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 300,
    "data": {"url": "data/retail_tidy.csv"},
    "transform": [
        {"filter": "datum.industry == 'Total (Industry)'"},
        {"filter": "datum.yoy_pct != null"},
        {"filter": "datum.state == 'Total (State)'"}
    ],
    "mark": {"type": "line", "strokeWidth": 2, "color": "#4682b4"},
    "encoding": {
        "x": {
            "field": "date",
            "type": "temporal",
            "title": "Date",
            "axis": {"format": "%Y"}
        },
        "y": {
            "field": "yoy_pct",
            "type": "quantitative",
            "title": "Year-over-Year Growth (%)"
        },
        "tooltip": [
            {"field": "date", "type": "temporal", "title": "Date", "format": "%b %Y"},
            {"field": "yoy_pct", "type": "quantitative", "title": "YoY Growth (%)", "format": ".1f"}
        ]
    }
};