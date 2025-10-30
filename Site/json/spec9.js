// Visualization 9: Australia SA4 Unemployment Choropleth Map
const spec9 = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": "container",
    "height": 600,
    // "title": "Australia Unemployment Rate (June 2025)",
    "params": [
        {
            "name": "zoomLevel",
            "value": "Australia",
            "bind": {
                "input": "select",
                "options": [
                    "Australia",
                    "Australian Capital Territory",
                    "New South Wales",
                    "Northern Territory",
                    "Victoria",
                    "Queensland",
                    "South Australia",
                    "Tasmania",
                    "Western Australia"
                ],
                "name": "Zoom to: "
            }
        }
    ],
    "projection": {
        "type": "mercator",
        "center": {"expr": "zoomLevel == 'Australia' ? [135, -28] : zoomLevel == 'New South Wales' ? [147, -33] : zoomLevel == 'Victoria' ? [145, -37.5] : zoomLevel == 'Queensland' ? [145, -20] : zoomLevel == 'South Australia' ? [137, -32.5] : zoomLevel == 'Western Australia' ? [118, -32] : zoomLevel == 'Tasmania' ? [147, -43] : zoomLevel == 'Northern Territory' ? [133, -19] : zoomLevel == 'Australian Capital Territory' ? [149, -35.5] : [135, -28]"},
        "scale": {"expr": "zoomLevel == 'Australia' ? 800 : zoomLevel == 'New South Wales' ? 3000 : zoomLevel == 'Victoria' ? 3500 : zoomLevel == 'Queensland' ? 1500 : zoomLevel == 'Western Australia' ? 2800 : zoomLevel == 'Tasmania' ? 2800 : zoomLevel == 'Australian Capital Territory' ? 9000 : 2000"}
    },
    "layer": [ 
        {
            "data": {
                "url": "data/state_sa4.json",
                "format": {
                    "type": "topojson",
                    "feature": "SA4_2021_AUST_GDA2020"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "gray",
                "stroke": "black",
                "strokeWidth": 0.1
            },
            "encoding": {
                "tooltip": [{
                    "field": "properties.SA4_NAME21",
                    "type": "nominal",
                    "title": "Region (No Data)"
                }]
            }
        },
        {
            "data": {
                "url": "data/state_sa4.json",
                "format": {
                    "type": "topojson",
                    "feature": "SA4_2021_AUST_GDA2020"
                }
            },
            "transform": [
                {
                    "lookup": "properties.SA4_CODE21",
                    "from": {
                        "data": {
                            "url": "data/labour_unemp_tidy.csv"
                        },
                        "key": "SA4_Code",
                        "fields": [
                            "SA4_Name",
                            "Rating",
                            "Working_Age_Employment_Rate",
                            "Unemployment_Rate"
                        ]
                    }
                },
                {
                    "filter": "datum.Unemployment_Rate != null"
                }
            ],
            "mark": {
                "type": "geoshape",
                "stroke": "black",
                "strokeWidth": 0.1
            },
            "encoding": {
                "color": {
                    "field": "Unemployment_Rate",
                    "type": "quantitative",
                    "scale": {
                        "type": "threshold",
                        "domain": [3.0, 4.0, 5.0],
                        "range": ["#fc9272", "#fcbba1", "#fee0d2", "#fff5f0"]
                    },
                    "legend": {
                        "title": "Unemployment Rate (%)",
                        "format": ".1f"
                    }
                },
                "tooltip": [
                    {
                        "field": "SA4_Name",
                        "type": "nominal",
                        "title": "Region"
                    },
                    {
                        "field": "Unemployment_Rate",
                        "type": "quantitative",
                        "title": "Unemployment Rate (%)",
                        "format": ".1f"
                    },
                    {
                        "field": "Working_Age_Employment_Rate",
                        "type": "quantitative",
                        "title": "Employment Rate (%)",
                        "format": ".1f"
                    },
                    {
                        "field": "Rating",
                        "type": "nominal",
                        "title": "Labour Market Rating"
                    }
                ]
            }
        },
        {
            "data": {
                "url": "data/state_sa4.json",
                "format": {
                    "type": "topojson",
                    "feature": "STE_2021_AUST_GDA2020"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "null",
                "stroke": "black",
                "strokeWidth": 1
            }
        },
        {
            "data": {
                "url": "data/state_sa4.json",
                "format": {
                    "type": "topojson",
                    "feature": "SA4_2021_AUST_GDA2020"
                }
            },
            "mark": {
                "type": "geoshape",
                "fill": "null",
                "stroke": "black",
                "strokeWidth": 0.1
            },
            "encoding": {
                "tooltip": [{
                    "field": "properties.SA4_NAME21",
                    "type": "nominal",
                    "title": "Region (No Data)"
                }]
            }
        },
        {
            "data": {
                "url": "data/state_sa4.json",
                "format": {
                    "type": "topojson",
                    "feature": "SA4_2021_AUST_GDA2020"
                }
            },
            "transform": [
                {
                    "lookup": "properties.SA4_CODE21",
                    "from": {
                        "data": {
                            "url": "data/labour_unemp_tidy.csv"
                        },
                        "key": "SA4_Code",
                        "fields": [
                            "SA4_Name",
                            "Rating",
                            "Working_Age_Employment_Rate",
                            "Unemployment_Rate"
                        ]
                    }
                },
                {
                    "filter": "datum.Unemployment_Rate != null"
                }
            ],
            "mark": {
                "type": "geoshape",
                "fill": "null",
                "stroke": "null",
                "strokeWidth": 0
            },
            "encoding": {
                "color": {
                    "field": "Unemployment_Rate",
                    "type": "quantitative",
                    "scale": {
                        "type": "threshold",
                        "domain": [3.0, 4.0, 5.0],
                        "range": ["#fc9272", "#fcbba1", "#fee0d2", "#fff5f0"]
                    },
                    "legend": {
                        "title": "Unemployment Rate (%)",
                        "format": ".1f"
                    }
                },
                "tooltip": [
                    {
                        "field": "SA4_Name",
                        "type": "nominal",
                        "title": "Region"
                    },
                    {
                        "field": "Unemployment_Rate",
                        "type": "quantitative",
                        "title": "Unemployment Rate (%)",
                        "format": ".1f"
                    },
                    {
                        "field": "Working_Age_Employment_Rate",
                        "type": "quantitative",
                        "title": "Employment Rate (%)",
                        "format": ".1f"
                    },
                    {
                        "field": "Rating",
                        "type": "nominal",
                        "title": "Labour Market Rating"
                    }
                ]
            }
        },
    ]
};