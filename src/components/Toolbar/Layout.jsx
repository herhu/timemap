import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

import { TabPanel } from 'react-tabs';
import FilterListPanel from './FilterListPanel.jsx';
import CategoriesListPanel from './CategoriesListPanel.jsx';
import BottomActions from './BottomActions.jsx';
import copy from '../../common/data/copy.json';
import { trimAndEllipse } from '../../common/utilities.js';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _selected: -1,
    };
    this.infoRef = createRef();
  }

  selectTab(selected) {
    const _selected = this.state._selected === selected ? -1 : selected;
    this.setState({ _selected });
  }

  renderClosePanel() {
    return (
      <div className="panel-header" onClick={() => this.selectTab(-1)}>
        <div className="caret" />
      </div>
    );
  }

  goToNarrative(narrative) {
    this.selectTab(-1); // set all unselected within this component
    this.props.methods.onSelectNarrative(narrative);
  }

  renderToolbarNarrativePanel() {
    return (
      <TabPanel>
        <h2>{copy[this.props.language].toolbar.narrative_panel_title}</h2>
        <p>{copy[this.props.language].toolbar.narrative_summary}</p>
        {this.props.narratives.map((narr, i) => {
          return (
            <div key={`tab${i}`} className="panel-action action">
              <button
                onClick={() => {
                  this.goToNarrative(narr);
                }}
              >
                <p>{narr.id}</p>
                <p>
                  <small>{trimAndEllipse(narr.desc, 120)}</small>
                </p>
              </button>
            </div>
          );
        })}
      </TabPanel>
    );
  }

  renderToolbarCategoriesPanel() {
    if (this.props.features.CATEGORIES_AS_FILTERS) {
      return (
        <TabPanel>
          <CategoriesListPanel
            categories={this.props.categories}
            activeCategories={this.props.activeCategories}
            onCategoryFilter={this.props.methods.onCategoryFilter}
            language={this.props.language}
          />
        </TabPanel>
      );
    }
  }

  renderToolbarFilterPanel() {
    return (
      <TabPanel>
        <FilterListPanel
          filters={this.props.filters}
          activeFilters={this.props.activeFilters}
          onSelectFilter={this.props.methods.onSelectFilter}
          language={this.props.language}
        />
      </TabPanel>
    );
  }

  renderToolbarTab(_selected, label, iconKey) {
    const isActive = this.state._selected === _selected;
    let classes = isActive ? 'toolbar-tab active' : 'toolbar-tab';

    return (
      <div
        className={classes}
        onClick={() => {
          this.selectTab(_selected);
        }}
      >
        <i className="material-icons">{iconKey}</i>
        <div className="tab-caption">{label}</div>
      </div>
    );
  }

  renderToolbarPanels() {
    const { features, narratives } = this.props;
    let classes = this.state._selected >= 0 ? 'toolbar-panels' : 'toolbar-panels folded';
    return (
      <div className={classes}>
        {this.renderClosePanel()}
        {/* <Tabs selectedIndex={this.state._selected} onSelect={(firstTab, lastTab) => ''}>
          {narratives && narratives.length !== 0 ? this.renderToolbarNarrativePanel() : null}
          {features.CATEGORIES_AS_FILTERS ? this.renderToolbarCategoriesPanel() : null}
          {features.USE_ASSOCIATIONS ? this.renderToolbarFilterPanel() : null}
        </Tabs> */}
      </div>
    );
  }

  renderToolbarNavs() {
    if (this.props.narratives) {
      return this.props.narratives.map((nar, idx) => {
        const isActive = idx === this.state._selected;

        let classes = isActive ? 'toolbar-tab active' : 'toolbar-tab';

        return (
          <div
            key={`nav${idx}`}
            className={classes}
            onClick={() => {
              this.selectTab(idx);
            }}
          >
            <div className="tab-caption">{nar.label}</div>
          </div>
        );
      });
    }
    return null;
  }

  renderToolbarTabs() {
    // const { features, narratives } = this.props;
    // const narrativesExist = narratives && narratives.length !== 0;
    let title = copy[this.props.language].toolbar.title;
    if (process.env.display_title) title = process.env.display_title;
    // const narrativesLabel = copy[this.props.language].toolbar.narratives_label;
    // const filtersLabel = copy[this.props.language].toolbar.filters_label;
    // const categoriesLabel = 'Categorías'; // TODO:

    // const narrativesIdx = 0;
    // const categoriesIdx = narrativesExist ? 1 : 0;
    // const filtersIdx =
    //   narrativesExist && features.CATEGORIES_AS_FILTERS ? 2 : narrativesExist || features.CATEGORIES_AS_FILTERS ? 1 : 0;
    return (
      <div className="toolbar">
        <div className="toolbar-header" onClick={this.props.methods.onTitle}>
          <p>{title}</p>
        </div>
        <div className="toolbar-tabs">
          {/* <div className="toolbar-tab" onClick={() => this.props.actualizarHistoria('estanDisparando')}>
            <i className="material-icons">star</i>
            <div className="tab-caption">¡Están disparando!</div>
          </div> */}

          <div className="toolbar-tab" onClick={() => this.cuandoClic()}>
            <i className="material-icons">request_quote</i>
            <div className="tab-caption">Paro Nacional 28A</div>
          </div>
        </div>

        <BottomActions
          info={{
            enabled: this.props.infoShowing,
            toggle: this.props.actions.toggleInfoPopup,
          }}
          sites={{
            enabled: this.props.sitesShowing,
            toggle: this.props.actions.toggleSites,
          }}
          cover={{
            toggle: this.props.actions.toggleCover,
          }}
          features={this.props.features}
        />
      </div>
    );
  }

  handleClose = () => {
    this.infoRef.current.classList.add('hidden');
  };

  handleOpen = () => {
    this.infoRef.current.classList.remove('hidden');
  };

  cuandoClic() {
    this.infoRef.current.classList.toggle('hidden');
    this.props.actualizarHistoria('segunda');
  }

  segunda(conteoMuertos, dias) {
    return (
      <div>
        <h2>Cartografía de la violencia policial</h2>
        <h3 className="resaltar">REPRESIÓN Y MUERTE EN LAS CALLES DE COLOMBIA</h3>

        <p className="highlight">
          Al menos <span className="contador">{conteoMuertos + 1}</span> personas han muerto en los últimos{' '}
          <span className="contador">{dias}</span> días en choques con la policía durante las protestas contra el
          gobierno de Iván Duque. Estos son los puntos y los videos que ayudan a entender cómo ocurrieron sus muertes.
          Además, seleccionamos algunas secuencias que demuestran el desborde de la represión y la violencia policial en
          medio del paro nacional de Colombia.
        </p>

        <p>
          Este mapa de violencia policial se hizo con material tomado de fuentes abiertas que nuestro equipo ha podido
          verificar y geolocalizar con análisis y reportería en terreno. Este mapa se actualizará con cada nuevo caso
          que podamos verificar.{' '}
          <a href="https://cerosetenta.uniandes.edu.co/represion-y-muerte-mapa/" target="_blank">
            Así se hizo este trabajo.
          </a>
        </p>

        <p className="rojo">ESTE TRABAJO CONTIENE IMÁGENES DE VIOLENCIA.</p>

        <p>
          Un proyecto de: <a href="https://cerosetenta.uniandes.edu.co/">Cerosetenta</a> –{' '}
          <a href="https://www.bellingcat.com/" target="_blank">
            Bellingcat
          </a>{' '}
          -{' '}
          <a href="https://github.com/enflujo" target="_blank">
            EnFlujo
          </a>
        </p>

        <h3>Equipo</h3>

        <ul className="center">
          <li>Carlos Gonzales</li>
          <li>Giancarlo Fiorella</li>
          <li>Lorenzo Morales</li>
          <li>Natalia Arenas</li>
          <li>Nathan Jaccard</li>
          <li>Juan Camilo González</li>
          <li>Diego Forero</li>
          <li>Tania Tapia</li>
          <li>Manuela Saldarriaga</li>
          <li>María Fernanda Fitzgerald</li>
          <li>Ana Sophia López</li>
          <li>Goldy Levy</li>
          <li>Alejandro Gómez Dugand</li>
          <li>Antonia Bustamante</li>
          <li>Jeanniffer Pimentel</li>
          <li>Sara Cely Vélez</li>
          <li>Laura Ramos Rico</li>
          <li>Sandrine Exil</li>
          <li>Juan Belleville</li>
          <li>Carlos Borda</li>
          <li>Juan Felipe Rozo</li>
          <li>Mariana Ramos Abello</li>
          <li>Javier Morales Cifuentes</li>
          <li>Valeria M.</li>
          <li>Alejandro Barragán</li>
        </ul>
      </div>
    );
  }

  render() {
    const { isNarrative } = this.props;
    let conteoMuertos = 0;
    this.props.eventos.forEach((evento) => (evento.category === 'Muerto' ? conteoMuertos++ : ''));
    let dias = new Date().getTime() - new Date(2021, 3, 28).getTime();
    dias = Math.ceil(dias / (1000 * 3600 * 24));

    return (
      <div id="toolbar-wrapper" className={`toolbar-wrapper ${isNarrative ? 'narrative-mode' : ''}`}>
        <article ref={this.infoRef} className="historiaInfo">
          <div className="closeBtn" onClick={this.handleClose}>
            X
          </div>
          {this.segunda(conteoMuertos, dias)}
        </article>
        {this.renderToolbarTabs()}
        {this.renderToolbarPanels()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: selectors.getFilters(state),
    categories: selectors.getCategories(state),
    narratives: selectors.selectNarratives(state),
    language: state.app.language,
    activeFilters: selectors.getActiveFilters(state),
    activeCategories: selectors.getActiveCategories(state),
    viewFilters: state.app.associations.views,
    narrative: state.app.associations.narrative,
    sitesShowing: state.app.flags.isShowingSites,
    infoShowing: state.app.flags.isInfopopup,
    features: selectors.getFeatures(state),
    eventos: state.domain.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
