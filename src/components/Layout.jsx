/* global alert, Event */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Globals and utilities
import * as actions from '../actions';
import * as selectors from '../selectors';
import colors from '../common/global';
import { binarySearch, insetSourceFrom } from '../common/utilities';

// Interface sections
import Map from './Map.jsx';
import Timeline from './Timeline.jsx';

// Interface components
import LoadingOverlay from './Overlay/Loading.jsx';
import Toolbar from './Toolbar/Layout.jsx';
import CardStack from './CardStack.jsx';
import NarrativeControls from './presentational/Narrative/Controls.jsx';
import InfoPopUp from './InfoPopup.jsx';
import Notification from './Notification.jsx';
import StateOptions from './StateOptions.jsx';
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
            styleUrl: 'mapbox://styles/juancgonza/ckobpms3r1bxb17oa5jbdy53s',
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
            styleUrl: 'mapbox://styles/jeanniffer/ckoc8u49m1uz317l72cuudiz8?optimize=true',
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

  setNarrative = (narrative) => {
    // only handleSelect if narrative is not null and has associated events
    if (narrative && narrative.steps.length >= 1) {
      this.handleSelect([narrative.steps[0]]);
    }
    this.props.actions.updateNarrative(narrative);
  };

  setNarrativeFromFilters = (withSteps) => {
    const { app, domain } = this.props;
    let activeFilters = app.associations.filters;

    if (activeFilters.length === 0) {
      alert('No filters selected, cant narrativise');
      return;
    }

    activeFilters = activeFilters.map((f) => ({ name: f }));

    const evs = domain.events.filter((ev) => {
      let hasOne = false;
      // add event if it has at least one matching filter
      for (let i = 0; i < activeFilters.length; i++) {
        if (ev.associations.includes(activeFilters[i].name)) {
          hasOne = true;
          break;
        }
      }
      if (hasOne) return true;
      return false;
    });

    if (evs.length === 0) {
      alert('No associated events, cant narrativise');
      return;
    }

    const name = activeFilters.map((f) => f.name).join('-');
    const desc = activeFilters.map((f) => f.description).join('\n\n');
    this.setNarrative({
      id: name,
      label: name,
      description: desc,
      withLines: withSteps,
      steps: evs.map(insetSourceFrom(domain.sources)),
    });
  };

  selectNarrativeStep = (idx) => {
    // Try to find idx if event passed rather than number
    if (typeof idx !== 'number') {
      let e = idx[0] || idx;

      if (this.props.app.associations.narrative) {
        const { steps } = this.props.app.associations.narrative;
        // choose the first event at a given location
        const locationEventId = e.id;
        const narrativeIdxObj = steps.find((s) => s.id === locationEventId);
        let narrativeIdx = steps.indexOf(narrativeIdxObj);

        if (narrativeIdx > -1) {
          idx = narrativeIdx;
        }
      }
    }

    const { narrative } = this.props.app.associations;
    if (narrative === null) return;

    if (idx < narrative.steps.length && idx >= 0) {
      const step = narrative.steps[idx];

      this.handleSelect([step]);
      this.props.actions.updateNarrativeStepIdx(idx);
    }
  };

  onKeyDown = (e) => {
    const { narrative, selected } = this.props.app;
    const { events } = this.props.domain;

    const prev = (idx) => {
      if (narrative === null) {
        this.handleSelect(events[idx - 1], 0);
      } else {
        this.selectNarrativeStep(this.props.narrativeIdx - 1);
      }
    };
    const next = (idx) => {
      if (narrative === null) {
        this.handleSelect(events[idx + 1], 0);
      } else {
        this.selectNarrativeStep(this.props.narrativeIdx + 1);
      }
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
          isNarrative={!!app.associations.narrative}
          historiaActual={this.state.historiaActual}
          propiedadesMapa={this.state.historias[this.state.historiaActual].mapa}
          actualizarHistoria={this.actualizarHistoria}
          methods={{
            onTitle: actions.toggleCover,
            onSelectFilter: (filter) => actions.toggleFilter('filters', filter),
            onCategoryFilter: (category) => actions.toggleFilter('categories', category),
            onSelectNarrative: this.setNarrative,
          }}
        />
        {/* Acá esta la instancia del mapa */}
        <Map
          historiaActual={this.state.historiaActual}
          propiedadesMapa={this.state.historias[this.state.historiaActual].mapa}
          onKeyDown={this.onKeyDown}
          methods={{
            onSelectNarrative: this.setNarrative,
            getCategoryColor: this.getCategoryColor,
            onSelect: app.associations.narrative ? this.selectNarrativeStep : (ev) => this.handleSelect(ev, 1),
          }}
        />
        <Timeline
          onKeyDown={this.onKeyDown}
          methods={{
            onSelect: app.associations.narrative ? this.selectNarrativeStep : (ev) => this.handleSelect(ev, 0),
            onUpdateTimerange: actions.updateTimeRange,
            getCategoryColor: this.getCategoryColor,
          }}
        />
        <CardStack
          timelineDims={app.timeline.dimensions}
          onViewSource={this.handleViewSource}
          onSelect={app.associations.narrative ? this.selectNarrativeStep : this.handleSelect}
          onHighlight={this.handleHighlight}
          onToggleCardstack={() => actions.updateSelected([])}
          getCategoryColor={this.getCategoryColor}
        />
        <StateOptions
          showing={
            this.props.narratives &&
            this.props.narratives.length !== 0 &&
            !app.associations.narrative &&
            app.associations.filters.length > 0
          }
          timelineDims={app.timeline.dimensions}
          onClickHandler={this.setNarrativeFromFilters}
        />
        <NarrativeControls
          narrative={
            app.associations.narrative
              ? {
                  ...app.associations.narrative,
                  current: this.props.narrativeIdx,
                }
              : null
          }
          methods={{
            onNext: () => this.selectNarrativeStep(this.props.narrativeIdx + 1),
            onPrev: () => this.selectNarrativeStep(this.props.narrativeIdx - 1),
            onSelectNarrative: this.setNarrative,
          }}
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
        <Search
          narrative={app.narrative}
          queryString={app.searchQuery}
          events={domain.events}
          onSearchRowClick={this.handleSelect}
        />
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
    narrativeIdx: selectors.selectNarrativeIdx(state),
    narratives: selectors.selectNarratives(state),
    selected: selectors.selectSelected(state),
  }),
  mapDispatchToProps
)(Layout);
