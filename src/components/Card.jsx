import copy from '../common/data/copy.json';
import React from 'react';

import CardTime from './presentational/Card/Time.jsx';
import CardLocation from './presentational/Card/Location.jsx';
import CardCaret from './presentational/Card/Caret.jsx';
import CardSummary from './presentational/Card/Summary.jsx';
import CardSource from './presentational/Card/Source.jsx';
import { makeNiceDate } from '../common/utilities';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  makeTimelabel(datetime) {
    return makeNiceDate(datetime);
  }

  handleCardSelect(e) {
    if (!e.target.className.includes('arrow-down')) {
      const selectedEventFormat = this.props.idx > 0 ? [this.props.event] : this.props.event;
      this.props.onSelect(selectedEventFormat, this.props.idx);
    }
  }

  renderSummary() {
    return (
      <CardSummary
        categoryColor={this.props.getCategoryColor(this.props.event.category)}
        language={this.props.language}
        description={this.props.event.description}
        data={this.props.event}
        isOpen={this.state.isOpen}
      />
    );
  }

  renderLocation() {
    return (
      <CardLocation
        language={this.props.language}
        data={this.props.event}
        isPrecise={!this.props.event.type || this.props.event.type === 'Structure'}
      />
    );
  }

  renderSources() {
    if (this.props.sourceError) {
      return <div>ERROR: something went wrong loading sources, TODO:</div>;
    }

    const sourceLang = copy[this.props.language].cardstack.sources;
    return (
      <div className="card-col">
        <h4>{sourceLang}: </h4>
        {this.props.event.sources.map((source) => (
          <CardSource
            isLoading={this.props.isLoading}
            source={source}
            onClickHandler={(source) => this.props.onViewSource(source)}
          />
        ))}
      </div>
    );
  }

  // NB: should be internaionalized.
  renderTime() {
    const timelabel = this.makeTimelabel(this.props.event.datetime);

    // let precision = this.props.event.time_display
    // if (precision === '_date_only') {
    //   precision = ''
    //   timelabel = timelabel.substring(0, 11)
    // } else if (precision === '_approximate_date_only') {
    //   precision = ' (Approximate date)'
    //   timelabel = timelabel.substring(0, 11)
    // } else if (precision === '_approximate_datetime') {
    //   precision = ' (Approximate datetime)'
    // } else {
    //   timelabel = timelabel.substring(0, 11)
    // }

    return <CardTime makeTimelabel={timelabel} language={this.props.language} timelabel={timelabel} />;
  }

  renderMain() {
    return (
      <div className="card-container">
        <div className="card-row details">
          {this.renderTime()}
          {this.renderLocation()}
        </div>
        {this.renderSummary()}
      </div>
    );
  }

  renderExtra() {
    return <div className="card-bottomhalf">{this.renderSources()}</div>;
  }

  renderCaret() {
    return this.props.features.USE_SOURCES ? (
      <CardCaret toggle={() => this.toggle()} isOpen={this.state.isOpen} />
    ) : null;
  }

  render() {
    const { isSelected, idx } = this.props;
    return (
      <li
        className={`event-card ${isSelected ? 'selected' : ''}`}
        id={`event-card-${idx}`}
        ref={this.props.innerRef}
        onClick={(e) => this.handleCardSelect(e)}
      >
        {this.renderMain()}
        {this.state.isOpen ? this.renderExtra() : null}
        {this.renderCaret()}
      </li>
    );
  }
}

// The ref to each card will be used in CardStack for programmatic scrolling
export default React.forwardRef((props, ref) => <Card innerRef={ref} {...props} />);
