// Visualization 4: Monthly Seasonality
const spec4 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 450,
    "height": 300,
    "data": {"url": "data/monthly_seasonality.csv"},
    "transform": [
        {"filter": "datum.state != 'Total (State)'"}
    ],
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
        }
    },
    "layer": [
        {
            "mark": {"type": "line", "point": true},
            "encoding": {
                "color": {
                    "field": "state",
                    "type": "nominal",
                    "title": "State",
                    "scale": {"scheme": "category10"}
                }
            }
        },
        {
            "transform": [
                {"pivot": "state", "value": "turnover", "groupby": ["month", "month_name"]},
                {"calculate": "log(datum['Australian Capital Territory'])", "as": "ACT_log"},
                {"calculate": "log(datum['New South Wales'])", "as": "NSW_log"},
                {"calculate": "log(datum['Northern Territory'])", "as": "NT_log"},
                {"calculate": "log(datum['Queensland'])", "as": "QLD_log"},
                {"calculate": "log(datum['South Australia'])", "as": "SA_log"},
                {"calculate": "log(datum['Tasmania'])", "as": "TAS_log"},
                {"calculate": "log(datum['Victoria'])", "as": "VIC_log"},
                {"calculate": "log(datum['Western Australia'])", "as": "WA_log"}
            ],
            "mark": "rule",
            "encoding": {
                "x": {"field": "month", "type": "ordinal"},
                "y": {"value": 0},
                "y2": {"value": 300},
                "opacity": {
                    "condition": {"value": 0.3, "param": "hover", "empty": false},
                    "value": 0
                },
                "tooltip": [
                    {"field": "month_name", "type": "nominal", "title": "Month"},
                    {"field": "Australian Capital Territory", "type": "quantitative", "title": "ACT ($M)", "format": ",.0f"},
                    // {"field": "ACT_log", "type": "quantitative", "title": "ACT Log", "format": ".2f"},
                    {"field": "New South Wales", "type": "quantitative", "title": "NSW ($M)", "format": ",.0f"},
                    // {"field": "NSW_log", "type": "quantitative", "title": "NSW Log", "format": ".2f"},
                    {"field": "Northern Territory", "type": "quantitative", "title": "NT ($M)", "format": ",.0f"},
                    // {"field": "NT_log", "type": "quantitative", "title": "NT Log", "format": ".2f"},
                    {"field": "Queensland", "type": "quantitative", "title": "QLD ($M)", "format": ",.0f"},
                    // {"field": "QLD_log", "type": "quantitative", "title": "QLD Log", "format": ".2f"},
                    {"field": "South Australia", "type": "quantitative", "title": "SA ($M)", "format": ",.0f"},
                    // {"field": "SA_log", "type": "quantitative", "title": "SA Log", "format": ".2f"},
                    {"field": "Tasmania", "type": "quantitative", "title": "TAS ($M)", "format": ",.0f"},
                    // {"field": "TAS_log", "type": "quantitative", "title": "TAS Log", "format": ".2f"},
                    {"field": "Victoria", "type": "quantitative", "title": "VIC ($M)", "format": ",.0f"},
                    // {"field": "VIC_log", "type": "quantitative", "title": "VIC Log", "format": ".2f"},
                    {"field": "Western Australia", "type": "quantitative", "title": "WA ($M)", "format": ",.0f"},
                    // {"field": "WA_log", "type": "quantitative", "title": "WA Log", "format": ".2f"}
                ]
            },
            "params": [{
                "name": "hover",
                "select": {
                    "type": "point",
                    "fields": ["month"],
                    "nearest": true,
                    "on": "pointerover",
                    "clear": "pointerout"
                }
            }]
        }
    ]
};