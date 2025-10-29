// Visualization 3: Top Industries Small Multiples
const spec3 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 120,
    "height": 80,
    "data": {"url": "data/retail_latest_top10.csv"},
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "state",
            "type": "nominal",
            "title": null,
            "axis": {"labelAngle": -45}
        },
        "y": {
            "field": "turnover",
            "type": "quantitative",
            "title": "Turnover ($M)"
        },
        "color": {
            "field": "state",
            "type": "nominal",
            "legend": null,
            "scale": {"scheme": "category10"}
        },
        "facet": {
            "field": "industry",
            "type": "nominal",
            "columns": 4,
            "title": null
        },
        "tooltip": [
            {"field": "industry", "type": "nominal"},
            {"field": "state", "type": "nominal"},
            {"field": "turnover", "type": "quantitative", "format": ",.0f"}
        ]
    }
};