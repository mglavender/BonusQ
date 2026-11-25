const vlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  "width": 800,
  "height": 450,

  "projection": {
    "type": "equalEarth"
  },

  "layer": [
    {
      "data": {
        "url": "https://raw.githubusercontent.com/mglavender/BonusQ/refs/heads/main/world_countries.json",
        "format": {
          "type": "geojson"
        }
      },
      "mark": {
        "type": "geoshape",
        "fill": "#e8e8e8",
        "stroke": "white",
        "strokeWidth": 0.5
      },
      "encoding": {
        "tooltip": [
          { "field": "properties.name", "type": "nominal", "title": "Country" }
        ]
      }
    },
    {
      "params": [
        {
          "name": "Selected_Year",
          "value": 2021,
          "bind": {
            "input": "select",
            "options":,
            "name": "Select Year: "
          }
        }
      ],
      "data": {
        "url": "https://raw.githubusercontent.com/mglavender/BonusQ/refs/heads/main/wildlife_trafficking.csv",
        "format": {
          "type": "csv",
          "parse": {
            "Year": "number",
            "Number_of_Incidents": "number",
            "Average_Fine": "number",
            "Average_Imprisonment": "number"
          }
        }
      },
      "transform": [
        {
          "filter": "datum.Year == Selected_Year"
        },
        {
          "calculate": "datum['Country of Incident'] == 'USA' ? 'United States of America' : datum['Country of Incident'] == 'England' ? 'United Kingdom' : datum['Country of Incident'] == 'Republic of Serbia' ? 'Serbia' : datum['Country of Incident']",
          "as": "Clean_Country"
        },
        {
          "lookup": "Clean_Country",
          "from": {
            "data": {
              "url": "https://githubusercontent.com",
              "format": {
                "type": "json",
                "property": "features"
              }
            },
            "key": "properties.name"
          },
          "as": "geometry"
        }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "white",
        "strokeWidth": 0.5
      },
      "encoding": {
        "shape": {
          "field": "geometry",
          "type": "geojson"
        },
        "color": {
          "field": "Number_of_Incidents",
          "type": "quantitative",
          "scale": {
            "scheme": "orangered"
          },
          "legend": {
            "title": "Number of Incidents"
          }
        },
        "tooltip": [
          {"field": "Country of Incident", "type": "nominal"},
          {"field": "Year", "type": "quantitative"},
          {"field": "Number_of_Incidents", "type": "quantitative"},
          {"field": "Average_Fine", "type": "quantitative"},
          {"field": "Average_Imprisonment", "type": "quantitative"}
        ]
      }
    }
  ]
};

vegaEmbed('#svg-choropleth', vlSpec, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec() {
  return vlSpec;
}
function vega_spec() {
  return vegaLite.compile(vega_lite_spec()).spec;
}
