const root = process.env.NODE_ENV === 'production' ? 'https://cartoapi.enflujo.com' : 'http://localhost:4040';

module.exports = {
  display_title: 'CARTOGRAFÍA DE LA VIOLENCIA POLICIAL',
  SERVER_ROOT: root,
  CAIS_EXT: '/api/gvp/cais/rows',
  EVENTS_EXT: '/api/gvp/eventos/deeprows',
  STATIC_EXT: '/api/gvp/menus/columns',
  VICTIMAS_EXT: '/api/gvp/victimas/rows',
  FILTER_TREE_EXT: '/api/gvp/menus/columns',
  SITES_EXT: '',
  SHAPES_EXT: '',
  DATE_FMT: 'DD/MM/YYYY',
  TIME_FMT: 'hh:mm',
  MAPBOX_TOKEN: 'pk.eyJ1IjoianVhbmNnb256YSIsImEiOiJja3BoaWJ0a3EwZXViMzFsYWllMGJiZHk0In0.P6r6Zi6Xx5NGK1kPK_9hcQ',
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
