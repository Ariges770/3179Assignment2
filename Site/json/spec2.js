// Visualization 2: YoY Growth Rate Timeline
const spec2 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 300,
    "data": { "url": "data/retail_tidy.csv" },
    "transform": [
        { "filter": "datum.industry == 'Total (Industry)'" },
        { "filter": "datum.yoy_pct != null" }
    ],
    "encoding": {
        "x": {
            "field": "date",
            "type": "temporal",
            "title": "Date",
            "axis": { "format": "%Y" }
        },
        "y": {
            "field": "yoy_pct",
            "type": "quantitative",
            "title": "Growth (%)",
            "scale": { "domain": [-10, 25] }
        }
    },
    "layer": [
        {
            "transform": [
                { "filter": "datum.state == 'Total (State)'" }
            ],
            "mark": { "type": "line", "strokeWidth": 2, "color": "#4682b4" }
        },
        {
            "transform": [
                { "pivot": "state", "value": "yoy_pct", "groupby": ["date"] },
                { "filter": "datum['Total (State)'] != null" }
            ],
            "mark": "rule",
            "encoding": {
                "x": { "field": "date", "type": "temporal" },
                "y": { "value": 0 },
                "y2": { "value": 300 },
                "opacity": {
                    "condition": { "value": 0.3, "param": "hover", "empty": false },
                    "value": 0
                },
                "tooltip": [
                    { "field": "date", "type": "temporal", "title": "Date", "format": "%b %Y" },
                    { "field": "Total (State)", "type": "quantitative", "title": "Australia YoY Growth (%)", "format": ".1f" }
                ]
            },
            "params": [{
                "name": "hover",
                "select": {
                    "type": "point",
                    "fields": ["date"],
                    "nearest": true,
                    "on": "pointerover",
                    "clear": "pointerout"
                }
            }]
        },
        {
            "data": {
                "values": [
                    { "start": "2020-03-01", "end": "2021-12-01", "event": "COVID-19 Pandemic" }
                ]
            },
            "mark": {
                "type": "rect",
                "color": "#ffebee",
                "opacity": 0.3,
                "stroke": "#f44336",
                "strokeWidth": 1,
                "strokeDash": [2, 2]
            },
            "encoding": {
                "x": { "field": "start", "type": "temporal" },
                "x2": { "field": "end", "type": "temporal" },
                "y": { "value": 300 },
                "y2": { "value": 0 }
            }
        },
        {
            "data": {
                "values": [
                    { "start": "2008-09-01", "end": "2010-01-01", "event": "GFC" }
                ]
            },
            "mark": {
                "type": "rect",
                "color": "#b494f1ff",
                "opacity": 0.3,
                "stroke": "#ff9100ff",
                "strokeWidth": 1,
                "strokeDash": [2, 2]
            },
            "encoding": {
                "x": { "field": "start", "type": "temporal" },
                "x2": { "field": "end", "type": "temporal" },
                "y": { "value": 300 },
                "y2": { "value": 0 }
            }
        },
        {
            "data": {
                "values": [
                    { "date": "2021-12-01", "text": "COVID-19", "y": -2 }
                ]
            },
            "mark": {
                "type": "text",
                "color": "black",
                "fontSize": 12,
                "fontWeight": "bold",
                "angle": 0
            },
            "encoding": {
                "x": { "field": "date", "type": "temporal" },
                "y": { "field": "y", "type": "quantitative" },
                "text": { "field": "text" }
            }
        },
        {
            "data": {
                "values": [
                    { "date": "2008-09-01", "text": "GFC", "y": -2 }
                ]
            },
            "mark": {
                "type": "text",
                "color": "black",
                "fontSize": 11,
                "fontWeight": "bold",
                "angle": 0
            },
            "encoding": {
                "x": { "field": "date", "type": "temporal" },
                "y": { "field": "y", "type": "quantitative" },
                "text": { "field": "text" }
            }
        }
    ]
};