/* global alert, Event */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Globals and utilities
import * as actions from '../actions';
import * as selectors from '../selectors';
import colors from '../common/global';
import { binarySearch } from '../common/utilities';

// Interface sections
import Map from './Map.jsx';
import Timeline from './Timeline.jsx';

// Interface components
import LoadingOverlay from './Overlay/Loading.jsx';
import Toolbar from './Toolbar/Layout.jsx';
import CardStack from './CardStack.jsx';
import InfoPopUp from './InfoPopup.jsx';
import Notification from './Notification.jsx';
import Search from './Search.jsx';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      muertos: [],
      historiaActual: 'segunda',
      historias: {
        estanDisparando: {
          mapa: {
            styleUrl: 'npm',
            anchor: [-74.057, 4.619],
            startZoom: 11,
            minZoom: 6,
            maxZoom: 18,
            bounds: null,
            maxBounds: [
              [180, -180],
              [-180, 180],
            ],
          },
        },
        segunda: {
          mapa: {
            styleUrl: 'mapbox://styles/proyectoinventario/cl2z4gaqa000w15mgu4ryyz2j',
            anchor: [-77.477, 1.012],
            startZoom: 5,
            minZoom: 6,
            maxZoom: 18,
            bounds: null,
            maxBounds: [
              [180, -180],
              [-180, 180],
            ],
          },
        },
      },
    };
  }

  componentDidMount() {
    const promise = this.props.actions.fetchDomain();

    if (promise) {
      promise.then((domain) =>
        this.props.actions.updateDomain({
          domain,
          features: this.props.features,
        })
      );
    }
  }

  componentDidUpdate() {
    if (!this.state.muertos.length && this.props.domain && this.props.domain.events.length) {
      const muertos = this.props.domain.events
        .filter((event) => {
          return event.category === 'Muerto';
        })
        .map((event) => event.nombre_victima);

      this.setState({
        muertos: muertos,
      });
    }
  }

  handleHighlight = (highlighted) => {
    this.props.actions.updateHighlighted(highlighted || null);
  };

  handleViewSource = (source) => {
    this.props.actions.updateSource(source);
  };

  findEventIdx = (theEvent) => {
    const { events } = this.props.domain;
    return binarySearch(events, theEvent, (theev, otherev) => {
      return theev.datetime - otherev.datetime;
    });
  };

  handleSelect = (selected, axis) => {
    let matchedEvents = [];
    const TIMELINE_AXIS = 0;
    if (axis === TIMELINE_AXIS) {
      // find in events
      const { events } = this.props.domain;

      const fechaSelecionado = selected.datetime.getTime();
      matchedEvents = events.filter((event) => {
        return event.datetime.getTime() === fechaSelecionado;
      });
    } else {
      if (Array.isArray(selected)) {
        selected.forEach((event) => matchedEvents.push(event));
      } else {
        // const std = { ...selected };
        matchedEvents.push(selected);
      }
    }

    this.props.actions.updateSelected(matchedEvents);
  };

  getCategoryColor = (category) => {
    if (!this.props.features.USE_CATEGORIES) {
      return colors.fallbackEventColor;
    }

    const cat = this.props.ui.style.categories[category];
    if (cat) {
      return cat;
    } else {
      return this.props.ui.style.categories['default'];
    }
  };

  onKeyDown = (e) => {
    const { selected } = this.props.app;
    const { events } = this.props.domain;

    const prev = (idx) => {
      this.handleSelect(events[idx - 1], 0);
    };
    const next = (idx) => {
      this.handleSelect(events[idx + 1], 0);
    };
    if (selected.length > 0) {
      const ev = selected[selected.length - 1];
      const idx = this.findEventIdx(ev);
      switch (e.keyCode) {
        case 37: // left arrow
        case 38: // up arrow
          if (idx <= 0) return;
          prev(idx);
          break;
        case 39: // right arrow
        case 40: // down arrow
          if (idx < 0 || idx >= this.props.domain.length - 1) return;
          next(idx);
          break;
        default:
      }
    }
  };

  actualizarHistoria = (nombre) => {
    this.setState({
      historiaActual: nombre,
    });
  };

  render() {
    const { actions, app, domain, ui } = this.props;

    return (
      <div>
        {/* Este es el que contiene el menu y la historia */}
        <Toolbar
          historiaActual={this.state.historiaActual}
          propiedadesMapa={this.state.historias[this.state.historiaActual].mapa}
          actualizarHistoria={this.actualizarHistoria}
          methods={{
            onTitle: actions.toggleCover,
            onSelectFilter: (filter) => actions.toggleFilter('filters', filter),
            onCategoryFilter: (category) => actions.toggleFilter('categories', category),
          }}
        />
        {/* Acá esta la instancia del mapa */}
        <Map
          historiaActual={this.state.historiaActual}
          propiedadesMapa={this.state.historias[this.state.historiaActual].mapa}
          onKeyDown={this.onKeyDown}
          methods={{
            getCategoryColor: this.getCategoryColor,
            onSelect: (ev) => this.handleSelect(ev, 1),
          }}
        />
        <Timeline
          onKeyDown={this.onKeyDown}
          methods={{
            onSelect: (ev) => this.handleSelect(ev, 0),
            onUpdateTimerange: actions.updateTimeRange,
            getCategoryColor: this.getCategoryColor,
          }}
        />
        <CardStack
          timelineDims={app.timeline.dimensions}
          onViewSource={this.handleViewSource}
          onSelect={this.handleSelect}
          onHighlight={this.handleHighlight}
          onToggleCardstack={() => actions.updateSelected([])}
          getCategoryColor={this.getCategoryColor}
        />
        <InfoPopUp
          ui={ui}
          app={app}
          methods={{
            onClose: actions.toggleInfoPopup,
          }}
        />
        <Notification
          isNotification={app.flags.isNotification}
          notifications={domain.notifications}
          onToggle={actions.markNotificationsRead}
        />
        <Search queryString={app.searchQuery} events={domain.events} onSearchRowClick={this.handleSelect} />
        <LoadingOverlay
          isLoading={app.loading || app.flags.isFetchingDomain}
          ui={app.flags.isFetchingDomain}
          language={app.language}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  (state) => ({
    ...state,
    selected: selectors.selectSelected(state),
  }),
  mapDispatchToProps
)(Layout);
