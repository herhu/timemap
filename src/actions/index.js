/* global fetch */
import { urlFromEnv } from '../common/utilities';

// TODO: relegate these URLs entirely to environment variables
// const CONFIG_URL = urlFromEnv('CONFIG_EXT')
const EVENT_DATA_URL = urlFromEnv('EVENTS_EXT');
const VICTIMAS_EXT = urlFromEnv('VICTIMAS_EXT');
const CAIS_EXT = urlFromEnv('CAIS_EXT');
// const CATEGORY_URL = urlFromEnv('CATEGORIES_EXT');
// const ASSOCIATIONS_URL = urlFromEnv('ASSOCIATIONS_EXT');
const SOURCES_URL = urlFromEnv('SOURCES_EXT');
// const SITES_URL = urlFromEnv('SITES_EXT');
// const SHAPES_URL = urlFromEnv('SHAPES_EXT');
const STATIC_URL = urlFromEnv('STATIC_EXT');

export function fetchDomain() {
  const notifications = [];

  function handleError(message) {
    notifications.push({
      message,
      type: 'error',
    });
    return [];
  }

  return (dispatch, getState) => {
    if (!EVENT_DATA_URL) return;
    // const features = getState().features;
    dispatch(toggleFetchingDomain());

    // let configPromise = Promise.resolve([])
    // if (features.USE_REMOTE_CONFIG) {
    //   configPromise = fetch(CONFIG_URL)
    //     .then(response => response.json())
    //     .catch(() => handleError("Couldn't find data at the config URL you specified."))
    // }

    // NB: EVENT_DATA_URL is a list, and so results are aggregated

    const eventPromise = Promise.all(
      EVENT_DATA_URL.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .catch(() => handleError('events'))
      )
    ).then((results) => results.flatMap((t) => t));

    /**
     * Nuevo endpoint para importar las categorias y CAIs en proyecto 9S.
     * TODO: ¿que forma le damos a los siguientes proyectos? - definir este endpoint de forma genérica.
     */
    const staticPromise = fetch(STATIC_URL)
      .then((response) => response.json())
      .catch(() => handleError('static'));

    const caisPromise = fetch(CAIS_EXT)
      .then((response) => response.json())
      .catch(() => handleError('cais'));

    const victimasPromise = fetch(VICTIMAS_EXT)
      .then((response) => response.json())
      .catch(() => handleError('victimas'));

    // let catPromise = Promise.resolve([]);
    // if (features.USE_CATEGORIES) {
    //   catPromise = fetch(CATEGORY_URL)
    //     .then((response) => response.json())
    //     .catch(() => handleError(domainMsg('categories')));
    // }

    // let associationsPromise = Promise.resolve([]);
    // if (features.USE_ASSOCIATIONS) {
    //   if (!ASSOCIATIONS_URL) {
    //     associationsPromise = Promise.resolve(
    //       handleError('USE_ASSOCIATIONS is true, but you have not provided a ASSOCIATIONS_EXT')
    //     );
    //   } else {
    //     associationsPromise = fetch(ASSOCIATIONS_URL)
    //       .then((response) => response.json())
    //       .catch(() => handleError(domainMsg('associations')));
    //   }
    // }

    // let sourcesPromise = Promise.resolve([]);
    // if (features.USE_SOURCES) {
    //   if (!SOURCES_URL) {
    //     sourcesPromise = Promise.resolve(handleError('USE_SOURCES is true, but you have not provided a SOURCES_EXT'));
    //   } else {
    //     sourcesPromise = fetch(SOURCES_URL)
    //       .then((response) => response.json())
    //       .catch(() => handleError(domainMsg('sources')));
    //   }
    // }

    // let sitesPromise = Promise.resolve([]);
    // if (features.USE_SITES) {
    //   sitesPromise = fetch(SITES_URL)
    //     .then((response) => response.json())
    //     .catch(() => handleError(domainMsg('sites')));
    // }

    // let shapesPromise = Promise.resolve([]);
    // if (features.USE_SHAPES) {
    //   shapesPromise = fetch(SHAPES_URL)
    //     .then((response) => response.json())
    //     .catch(() => handleError(domainMsg('shapes')));
    // }

    return Promise.all([eventPromise, caisPromise, staticPromise, victimasPromise])
      .then((response) => {
        const eventos = response[0].filter((evento) =>{
          console.log('events per year ', evento.date.split('/')[2])

          return +evento.date.split('/')[2] === 2022 && 2021
        });

        console.log('eventos', eventos)

        const result = {
          // eventos: response[0],
          eventos: eventos,
          categories: response[2].categories ? response[2].categories.map((cat) => ({ category: cat })) : response[2],
          // categories: response[1].categories,
          cais: response[1],
          victimas: [],
          // filters: response[1].categories,
          associations: [],
          // sources: response[3],
          // sites: response[4],
          // shapes: response[5],
          notifications,
        };

        if (Object.values(result).some((resp) => resp.hasOwnProperty('error'))) {
          throw new Error('Some URLs returned negative. If you are in development, check the server is running');
        }
        dispatch(toggleFetchingDomain());
        return result;
      })
      .catch((err) => {
        dispatch(fetchError(err.message));
        dispatch(toggleFetchingDomain());
        console.log(err);
      });
  };
}

export const FETCH_ERROR = 'FETCH_ERROR';
export function fetchError(message) {
  return {
    type: FETCH_ERROR,
    message,
  };
}

export const UPDATE_DOMAIN = 'UPDATE_DOMAIN';
export function updateDomain(payload) {
  return {
    type: UPDATE_DOMAIN,
    payload,
  };
}

export function fetchSource(source) {
  return (dispatch) => {
    if (!SOURCES_URL) {
      dispatch(fetchSourceError('No source extension specified.'));
    } else {
      dispatch(toggleFetchingSources());

      fetch(`${SOURCES_URL}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('No sources are available at the URL specified in the config specified.');
          } else {
            return response.json();
          }
        })
        .catch((err) => {
          dispatch(fetchSourceError(err.message));
          dispatch(toggleFetchingSources());
        });
    }
  };
}

export const UPDATE_HIGHLIGHTED = 'UPDATE_HIGHLIGHTED';
export function updateHighlighted(highlighted) {
  return {
    type: UPDATE_HIGHLIGHTED,
    highlighted: highlighted,
  };
}

export const UPDATE_SELECTED = 'UPDATE_SELECTED';
export function updateSelected(selected) {
  return {
    type: UPDATE_SELECTED,
    selected: selected,
  };
}

export const UPDATE_DISTRICT = 'UPDATE_DISTRICT';
export function updateDistrict(district) {
  return {
    type: UPDATE_DISTRICT,
    district,
  };
}

export const CLEAR_FILTER = 'CLEAR_FILTER';
export function clearFilter(filter) {
  return {
    type: CLEAR_FILTER,
    filter,
  };
}

export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export function toggleFilter(filter, value) {
  return {
    type: TOGGLE_FILTER,
    filter,
    value,
  };
}

export const SET_LOADING = 'SET_LOADING';
export function setLoading() {
  return {
    type: SET_LOADING,
  };
}

export const SET_NOT_LOADING = 'SET_NOT_LOADING';
export function setNotLoading() {
  return {
    type: SET_NOT_LOADING,
  };
}

export const UPDATE_TIMERANGE = 'UPDATE_TIMERANGE';
export function updateTimeRange(timerange) {
  return {
    type: UPDATE_TIMERANGE,
    timerange,
  };
}

export const UPDATE_DIMENSIONS = 'UPDATE_DIMENSIONS';
export function updateDimensions(dims) {
  return {
    type: UPDATE_DIMENSIONS,
    dims,
  };
}

export const UPDATE_SOURCE = 'UPDATE_SOURCE';
export function updateSource(source) {
  return {
    type: UPDATE_SOURCE,
    source,
  };
}

// UI

export const TOGGLE_SITES = 'TOGGLE_SITES';
export function toggleSites() {
  return {
    type: TOGGLE_SITES,
  };
}

export const TOGGLE_FETCHING_DOMAIN = 'TOGGLE_FETCHING_DOMAIN';
export function toggleFetchingDomain() {
  return {
    type: TOGGLE_FETCHING_DOMAIN,
  };
}

export const TOGGLE_FETCHING_SOURCES = 'TOGGLE_FETCHING_SOURCES';
export function toggleFetchingSources() {
  return {
    type: TOGGLE_FETCHING_SOURCES,
  };
}

export const TOGGLE_LANGUAGE = 'TOGGLE_LANGUAGE';
export function toggleLanguage(language) {
  return {
    type: TOGGLE_LANGUAGE,
    language,
  };
}

export const CLOSE_TOOLBAR = 'CLOSE_TOOLBAR';
export function closeToolbar() {
  return {
    type: CLOSE_TOOLBAR,
  };
}

export const TOGGLE_INFOPOPUP = 'TOGGLE_INFOPOPUP';
export function toggleInfoPopup() {
  return {
    type: TOGGLE_INFOPOPUP,
  };
}

export const TOGGLE_NOTIFICATIONS = 'TOGGLE_NOTIFICATIONS';
export function toggleNotifications() {
  return {
    type: TOGGLE_NOTIFICATIONS,
  };
}

export const MARK_NOTIFICATIONS_READ = 'MARK_NOTIFICATIONS_READ';
export function markNotificationsRead() {
  return {
    type: MARK_NOTIFICATIONS_READ,
  };
}

export const TOGGLE_COVER = 'TOGGLE_COVER';
export function toggleCover() {
  return {
    type: TOGGLE_COVER,
  };
}

export const UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY';
export function updateSearchQuery(searchQuery) {
  return {
    type: UPDATE_SEARCH_QUERY,
    searchQuery,
  };
}

// ERRORS

export const FETCH_SOURCE_ERROR = 'FETCH_SOURCE_ERROR';
export function fetchSourceError(msg) {
  return {
    type: FETCH_SOURCE_ERROR,
    msg,
  };
}
