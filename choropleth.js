const vlSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v6.json",
  // your spec goes here
};

vegaEmbed('#svg-choropleth', vlSpec, { renderer: 'svg' })
  .catch(console.error);

function vega_lite_spec() {
  return vlSpec;
}
function vega_spec() {
  return vegaLite.compile(vega_lite_spec()).spec;
}
