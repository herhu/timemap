import React from 'react';

export default ({ x, y, r, transform, onSelect, styleProps, idx }) => {
  const s = (r * 2) / 3;
  return (
    <polygon
      key={`dateTimeStar-${idx}`}
      onClick={onSelect}
      className="event"
      x={x}
      y={y - r}
      style={styleProps}
      points={`${x},${y + s} ${x - s},${y - s} ${x + s},${y} ${x - s},${y} ${x + s},${y - s}`}
    />
  );
};
