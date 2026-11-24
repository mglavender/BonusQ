const vlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  // your spec goes here
  "width": 800,
  "height": 450,

  "data": {
    "url": "https://raw.githubusercontent.com/mglavender/BonusQ/main/wildlife_trafficking.csv",
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
      "lookup": "Country",
      "from": {
        "data": {
          "url": "https://gist.githubusercontent.com/mglavender/b3a1403a45a3b244a697619c64e74a30/raw/44cdeb87787cb9f1b96f2e6b4f916ec19e95a84c/world_countries.json",
          "format": {
            "type": "json",
            "property": "features"
          }
        },
        "key": "properties.name",
        "fields": ["geometry"]
      }
    }
  ],

  "projection": {
    "type": "equalEarth"
  },

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
      {"field": "Country", "type": "nominal"},
      {"field": "Year", "type": "quantitative"},
      {"field": "Number of Incidents", "type": "quantitative"},
      {"field": "Average Fine", "type": "quantitative"},
      {"field": "Average Imprisonment", "type": "quantitative"}
    ]
  }
};

vegaEmbed('#svg-choropleth', vlSpec, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec() {
  return vlSpec;
}
function vega_spec() {
  return vegaLite.compile(vega_lite_spec()).spec;
}
