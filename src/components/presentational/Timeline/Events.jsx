import React, { Fragment } from 'react';
import DatetimeDot from './DatetimeDot.jsx';
import DatetimeBar from './DatetimeBar.jsx';
import DatetimeSquare from './DatetimeSquare.jsx';
import DatetimeStar from './DatetimeStar.jsx';
import Project from './Project.jsx';
import { calcOpacity } from '../../../common/utilities';

function renderDot(event, styles, props, idx) {
  return (
    <DatetimeDot
      key={idx}
      onSelect={props.onSelect}
      category={event.category}
      events={[event]}
      x={props.x}
      y={props.y}
      r={props.eventRadius}
      styleProps={styles}
    />
  );
}

function renderBar(event, styles, props, idx) {
  const fillOpacity = props.features.GRAPH_NONLOCATED
    ? event.projectOffset >= 0
      ? styles.opacity
      : 0.5
    : calcOpacity(1);

  return (
    <DatetimeBar
      key={idx}
      onSelect={props.onSelect}
      category={event.category}
      events={[event]}
      x={props.x}
      y={props.dims.marginTop}
      width={props.eventRadius / 4}
      height={props.dims.trackHeight}
      styleProps={{ ...styles, fillOpacity }}
      highlights={props.highlights}
    />
  );
}

function renderDiamond(event, styles, props, idx) {
  return (
    <DatetimeSquare
      key={idx}
      onSelect={props.onSelect}
      x={props.x}
      y={props.y}
      r={1.8 * props.eventRadius}
      styleProps={styles}
    />
  );
}

function renderStar(event, styles, props, idx) {
  return (
    <DatetimeStar
      key={idx}
      onSelect={props.onSelect}
      x={props.x}
      y={props.y}
      r={1.8 * props.eventRadius}
      styleProps={{ ...styles, fillRule: 'nonzero' }}
      transform="rotate(90)"
    />
  );
}

const TimelineEvents = ({
  events,
  projects,
  getDatetimeX,
  getY,
  getCategoryColor,
  getHighlights,
  onSelect,
  transitionDuration,
  dims,
  features,
  eventRadius,
}) => {
  function renderEvent(event, idx) {
    const isDot = (!!event.location && !!event.longitude) || (features.GRAPH_NONLOCATED && event.projectOffset !== -1);
    let renderShape = isDot ? renderDot : renderBar;

    if (event.shape) {
      if (event.shape === 'bar') {
        renderShape = renderBar;
      } else if (event.shape === 'diamond') {
        renderShape = renderDiamond;
      } else if (event.shape === 'star') {
        renderShape = renderStar;
      } else {
        renderShape = renderDot;
      }
    }

    const eventY = getY(event);
    const colour = event.colour ? event.colour : getCategoryColor(event.category);

    const styles = {
      fill: colour,
      fillOpacity: eventY > 0 ? calcOpacity(1) : 0,
      transition: `transform ${transitionDuration / 1000}s ease`,
    };

    return renderShape(
      event,
      styles,
      {
        x: getDatetimeX(event.datetime),
        y: eventY,
        eventRadius,
        onSelect: () => onSelect(event),
        dims,
        highlights: features.HIGHLIGHT_GROUPS
          ? getHighlights(event.filters[features.HIGHLIGHT_GROUPS.filterIndexIndicatingGroup])
          : [],
        features,
      },
      idx
    );
  }

  let renderProjects = () => null;

  if (features.GRAPH_NONLOCATED) {
    renderProjects = () => {
      return (
        <>
          {Object.values(projects).map((project, idx) => (
            <Project
              key={`project-${idx}`}
              {...project}
              eventRadius={eventRadius}
              onClick={() => console.log(project)}
              getX={getDatetimeX}
              dims={dims}
              colour={getCategoryColor(project.category)}
            />
          ))}
        </>
      );
    };
  }

  return (
    <g clipPath="url(#clip)">
      {renderProjects()}
      {events.map((event, idx) => renderEvent(event, idx))}
    </g>
  );
};

export default TimelineEvents;
