import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

import BottomActions from './BottomActions.jsx';
import copy from '../../common/data/copy.json';

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

  renderToolbarPanels() {
    let classes = this.state._selected >= 0 ? 'toolbar-panels' : 'toolbar-panels folded';
    return <div className={classes}>{this.renderClosePanel()}</div>;
  }

  renderToolbarTabs() {
    let title = copy[this.props.language].toolbar.title;
    if (process.env.display_title) title = process.env.display_title;

    return (
      <div className="toolbar">
        <div className="toolbar-header" onClick={this.props.methods.onTitle}>
          <p>{title}</p>
        </div>
        <div className="toolbar-tabs">
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
        <h2>Cartograf??a de la violencia policial</h2>
        <h3 className="resaltar">REPRESI??N Y MUERTE EN LAS CALLES DE COLOMBIA</h3>

        <p className="highlight">
          En 100 d??as de choques con la Polic??a al menos <span className="contador">{conteoMuertos + 1}</span> personas
          murieron en el contexto de las protestas contra el Gobierno de Iv??n Duque, desde el 28 de abril del 2021.
          Estos son los puntos con el registro audiovisual que ciudadanos compartieron en redes sociales y que
          Cerosetenta ha analizado, verificado y geolocalizado para entender mejor c??mo ocurri?? cada caso de agresi??n
          por parte de la Fuerza P??blica, incluyendo los nombres de las v??ctimas y la descripci??n de los hechos.
          {/* Al menos <span className="contador">{conteoMuertos + 1}</span> personas han muerto en los ??ltimos{' '}
          <span className="contador">{dias}</span> d??as en choques con la polic??a durante las protestas contra el
          gobierno de Iv??n Duque. Estos son los puntos y los videos que ayudan a entender c??mo ocurrieron sus muertes.
          Adem??s, seleccionamos algunas secuencias que demuestran el desborde de la represi??n y la violencia policial en
          medio del paro nacional de Colombia. */}
        </p>

        <p>
          {/* Este mapa de violencia policial se hizo con material tomado de fuentes abiertas que nuestro equipo ha podido
          verificar y geolocalizar con an??lisis y reporter??a en terreno. Este mapa se actualizar?? con cada nuevo caso
          que podamos verificar.{' '} */}
          <a href="https://cerosetenta.uniandes.edu.co/represion-y-muerte-mapa/" target="_blank">
            As?? se hizo este trabajo.
          </a>
        </p>

        <p className="rojo">ESTE TRABAJO CONTIENE IM??GENES DE VIOLENCIA.</p>

        <p>
          Un proyecto de: <a href="https://cerosetenta.uniandes.edu.co/">Cerosetenta</a> ???{' '}
          <a href="https://www.bellingcat.com/" target="_blank">
            Bellingcat
          </a>{' '}
          -{' '}
          <a href="https://enflujo.com" target="_blank">
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
          <li>Juan Camilo Gonz??lez</li>
          <li>Diego Forero</li>
          <li>Tania Tapia</li>
          <li>Manuela Saldarriaga</li>
          <li>Mar??a Fernanda Fitzgerald</li>
          <li>Ana Sophia L??pez</li>
          <li>Goldy Levy</li>
          <li>Alejandro G??mez Dugand</li>
          <li>Antonia Bustamante</li>
          <li>Jeanniffer Pimentel</li>
          <li>Sara Cely V??lez</li>
          <li>Laura Ramos Rico</li>
          <li>Sandrine Exil</li>
          <li>Juan Belleville</li>
          <li>Carlos Borda</li>
          <li>Juan Felipe Rozo</li>
          <li>Mariana Ramos Abello</li>
          <li>Javier Morales Cifuentes</li>
          <li>Valeria M.</li>
          <li>Alejandro Barrag??n</li>
        </ul>
      </div>
    );
  }

  render() {
    let conteoMuertos = 0;
    this.props.eventos.forEach((evento) => (evento.category === 'Muerto' ? conteoMuertos++ : ''));
    let dias = new Date().getTime() - new Date(2021, 3, 28).getTime();
    dias = Math.ceil(dias / (1000 * 3600 * 24));

    return (
      <div id="toolbar-wrapper" className="toolbar-wrapper">
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
    language: state.app.language,
    activeFilters: selectors.getActiveFilters(state),
    activeCategories: selectors.getActiveCategories(state),
    viewFilters: state.app.associations.views,
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
