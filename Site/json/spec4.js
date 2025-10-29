// Visualization 4: Monthly Seasonality
const spec4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 300,
    "data": {"url": "data/monthly_seasonality.csv"},
    "transform": [
        {"filter": "datum.state != 'Total (State)'"}
    ],
    "mark": {"type": "line", "point": true},
    "encoding": {
        "x": {
            "field": "month",
            "type": "ordinal",
            "title": "Month",
            "sort": Array.from({ length: 10 }, (_, i) => i + 1),
            "axis": {"labelExpr": "['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][datum.value - 1]"}
        },
        "y": {
            "field": "turnover",
            "type": "quantitative",
            "title": "Average Turnover ($M, Log Scale)",
            "scale": {"type": "log"}
        },
        "color": {
            "field": "state",
            "type": "nominal",
            "title": "State",
            "scale": {"scheme": "category10"}
        },
        "tooltip": [
            {"field": "state", "type": "nominal"},
            {"field": "month_name", "type": "nominal", "title": "Month"},
            {"field": "turnover", "type": "quantitative", "title": "Avg Turnover ($M)", "format": ",.0f"}
        ]
    }
};