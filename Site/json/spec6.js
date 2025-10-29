// Visualization 6: Rating Distribution Bar Chart
const spec6 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 300,
    "data": {"url": "data/rating_distribution.csv"},
    "mark": {"type": "bar", "color": "#4682b4"},
    "encoding": {
        "x": {
            "field": "rating",
            "type": "nominal",
            "title": "Labour Market Rating",
            "axis": {"labelAngle": -30}
        },
        "y": {
            "field": "count",
            "type": "quantitative",
            "title": "Number of SA4 Regions"
        },
        "tooltip": [
            {"field": "rating", "type": "nominal", "title": "Rating"},
            {"field": "count", "type": "quantitative", "title": "Regions"}
        ]
    }
};