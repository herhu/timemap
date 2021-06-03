import React from 'react';

export default ({ x, y, r, onSelect, styleProps, idx }) => {
  if (!y) return null;
  return <circle key={`eventDot-${idx}`} onClick={onSelect} className="event" cx={x} cy={y} style={styleProps} r={r} />;
};
