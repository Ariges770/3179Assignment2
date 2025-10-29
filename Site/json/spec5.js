// Visualization 5: Unemployment Choropleth Map (simplified dot map due to lack of geojson)
const spec5 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 300,
    "data": {"url": "data/labour_unemp_tidy.csv"},
    "mark": {"type": "circle", "size": 100},
    "encoding": {
        "y": {
            "field": "SA4_Name",
            "type": "nominal",
            "title": "SA4 Region",
            "axis": {"labelLimit": 200},
            "sort": {"field": "Unemployment_Rate", "order": "descending"}
        },
        "x": {
            "field": "Unemployment_Rate",
            "type": "quantitative",
            "title": "Unemployment Rate (%)"
        },
        "color": {
            "field": "Unemployment_Rate",
            "type": "quantitative",
            "title": "Unemployment Rate (%)",
            "scale": {"scheme": "reds"}
        },
        "tooltip": [
            {"field": "SA4_Name", "type": "nominal", "title": "Region"},
            {"field": "Unemployment_Rate", "type": "quantitative", "title": "Unemployment Rate (%)", "format": ".1f"},
            {"field": "Rating", "type": "nominal", "title": "Labour Market Rating"}
        ]
    }
};