const root = process.env.NODE_ENV === 'production' ? 'https://mapa.proyectoinventario.org/api/' : 'http://localhost:4040';

module.exports = {
  display_title: 'CARTOGRAFÍA DE LA VIOLENCIA POLICIAL',
  SERVER_ROOT: root,
  CAIS_EXT: 'v1/gvp/cais/rows',
  EVENTS_EXT: 'v1/gvp/eventos/deeprows',
  STATIC_EXT: 'v1/gvp/menus/columns',
  VICTIMAS_EXT: 'v1/gvp/victimas/rows',
  FILTER_TREE_EXT: 'v1/gvp/menus/columns',
  SITES_EXT: '',
  SHAPES_EXT: '',
  DATE_FMT: 'DD/MM/YYYY',
  TIME_FMT: 'hh:mm',
  MAPBOX_TOKEN: 'pk.eyJ1IjoiaGVybmFucG1zIiwiYSI6ImNrenBzcmFxYjA0MGoyeWxqazl1dmxkMXUifQ.KsGfa9dfEHn8hoSfq7NlyA',
  store: {
    app: {
      language: 'es-MX',
      map: {
        anchor: [2.6445491, -74.0686627],
      },
    },
    features: {
      USE_CATEGORIES: true,
      CATEGORIES_AS_FILTERS: true,
      USE_ASSOCIATIONS: false,
      USE_SOURCES: false,
      USE_COVER: false,
      USE_SITES: false,
      USE_SHAPES: false,
      GRAPH_NONLOCATED: false,
      HIGHLIGHT_GROUPS: false,
    },
  },
};
