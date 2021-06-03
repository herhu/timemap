import React from 'react';
import Card from './Card.jsx';
import Adjust from './Adjust.jsx';
import Close from './Close.jsx';

export default ({ narrative, methods }) => {
  if (!narrative) return null;

  const { current, steps } = narrative;
  const prevExists = current !== 0;
  const nextExists = current < steps.length - 1;

  return (
    <>
      <Card narrative={narrative} />
      <Adjust isDisabled={!prevExists} direction="left" onClickHandler={methods.onPrev} />
      <Adjust isDisabled={!nextExists} direction="right" onClickHandler={methods.onNext} />
      <Close onClickHandler={() => methods.onSelectNarrative(null)} closeMsg="-- exit from narrative --" />
    </>
  );
};
