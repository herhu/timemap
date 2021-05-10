const root =
  process.env.NODE_ENV === 'production' ? 'https://hd.uniandes.edu.co/apps/datasheet-server' : 'http://localhost:4040';

module.exports = {
  title: 'example',
  display_title: 'La geografía de la violencia policial',
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
  // MAPBOX_TOKEN: 'pk.YOUR_MAPBOX_TOKEN',
  store: {
    app: {
      language: 'es-MX',
      map: {
        anchor: [4.6445491, -74.0686627],
      },
    },
    ui: {
      // tiles: 'your-mapbox-account-name/x5678-map-id'
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
