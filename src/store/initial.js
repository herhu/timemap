import { mergeDeepLeft } from 'ramda';
import global from '../common/global';

const initial = {
  /*
   * The Domain or 'domain' of this state refers to the tree of data
   *  available for render and display.
   * Selections and filters in the 'app' subtree will operate the domain
   *   in mapStateToProps of the Dashboard, and determine which items
   *   in the domain will get rendered by React
   */
  domain: {
    events: [],
    locations: [],
    categories: [],
    associations: [],
    sources: {},
    sites: [],
    notifications: [],
  },

  /*
   * The 'app' subtree of this state determines the data and information to be
   *   displayed.
   * It may refer to those the user interacts with, by selecting,
   *   filtering and so on, which ultimately operate on the data to be displayed.
   * Additionally, some of the 'app' flags are determined by the config file
   *   or by the characteristics of the client, browser, etc.
   */
  app: {
    errors: {
      source: false,
    },
    highlighted: null,
    selected: [],
    source: null,
    associations: {
      filters: [],
      narrative: null,
      categories: [],
      views: {
        events: true,
        routes: false,
        sites: true,
      },
    },
    isMobile: /Mobi/.test(navigator.userAgent),
    language: 'es-MX',
    map: {
      anchor: [4.6445491, -74.0686627],
      startZoom: 11,
      minZoom: 6,
      maxZoom: 18,
      bounds: null,
      maxBounds: [
        [180, -180],
        [-180, 180],
      ],
    },
    timeline: {
      dimensions: {
        height: 200,
        width: 0,
        marginLeft: 0,
        marginTop: 15,
        marginBottom: 60,
        contentHeight: 200,
        width_controls: 80,
      },
      range: [new Date(2021, 3, 4, 11), new Date(2021, 5, 1, 9)],
      // rangeLimits: [new Date(1, 1, 1, 1), new Date()],
      zoomLevels: [
        { label: '20 años', duration: 10512000 },
        { label: '2 años', duration: 1051200 },
        { label: '3 meses', duration: 129600 },
        { label: '3 días', duration: 4320 },
        { label: '12 horas', duration: 720 },
        { label: '1 hora', duration: 60 },
      ],
    },
    flags: {
      isFetchingDomain: false,
      isFetchingSources: false,
      isCover: true,
      isCardstack: true,
      isInfopopup: false,
      isShowingSites: true,
    },
    cover: {
      title: 'project title',
      description:
        'A description of the project goes here.\n\nThis description may contain markdown.\n\n# This is a large title, for example.\n\n## Whereas this is a slightly smaller title.\n\nCheck out docs/custom-covers.md in the [Timemap GitHub repo](https://github.com/forensic-architecture/timemap) for more information around how to specify custom covers.',
      exploreButton: 'EXPLORE',
    },
    loading: false,
  },

  /*
   * The 'ui' subtree of this state refers the state of the cosmetic
   *   elements of the application, such as color palettes of categories
   *   as well as dom elements to attach SVG
   */
  ui: {
    tiles: 'openstreetmap', // ['openstreetmap', 'streets', 'satellite']
    style: {
      categories: {
        default: global.fallbackEventColor,
        // 'Disparo asociado a presencia de policía': '#99FF9E',
        // 'Policía disparando': '#FF94A6',
        'Disparo sin referencia de origen': '#0378A6',
        //'Policía disparando arma de fuego': '#2703A6',
        'Disparos en presencia de policía': '#007336',
        'Policía armado': '#97C9FF',
        Herido: '#F25C05',
        Muerto: '#ff2134',
        Contexto: '#fff697',
        'Otras agresiones': '#F2B035',
        //'Otras agresiones': '#774ba3',
        'Conducta sospechosa policía': '#86f7f2',
        'Policía disparando arma de fuego': '#78548a',
      },
      narratives: {
        default: {
          opacity: 0.9,
          stroke: global.fallbackEventColor,
          strokeWidth: 3,
        },
      },
      shapes: {
        default: {
          stroke: 'blue',
          strokeWidth: 3,
          opacity: 0.9,
        },
      },
    },
    dom: {
      timeline: 'timeline',
      timeslider: 'timeslider',
      map: 'map',
    },
    eventRadius: 8,
  },

  features: {
    USE_COVER: false,
    USE_ASSOCIATIONS: false,
    USE_SITES: false,
    USE_SOURCES: false,
    USE_SHAPES: false,
    GRAPH_NONLOCATED: false,
    HIGHLIGHT_GROUPS: false,
  },
};

let appStore;
if (process.env.store) {
  appStore = mergeDeepLeft(process.env.store, initial);
} else {
  appStore = initial;
}

// NB: config.js dates get implicitly converted to strings in mergeDeepLeft
appStore.app.timeline.range[0] = new Date(appStore.app.timeline.range[0]);
appStore.app.timeline.range[1] = new Date(appStore.app.timeline.range[1]);

export default appStore;
