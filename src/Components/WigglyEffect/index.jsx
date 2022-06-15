import React, {useId} from "react";

function WigglyEffect({feTurbulence, animate, feDisplacementMap, children}) {
  feTurbulence = {
    baseFrequency: 0.01,
    numOctaves: 5,
    seed: 100,
    ...feTurbulence,
  };

  animate = {
    attributeName: "seed",
    repeatCount: "indefinite",
    from: 1,
    to: 100,
    dur: 25,
    ...animate,
  };

  feDisplacementMap = {
    in: "SourceGraphic",
    scale: 10,
    ...feDisplacementMap,
  };

  const wigglyEffectFilterId = useId();

  const clones = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      style: {filter: `url(#${wigglyEffectFilterId})`},
    });
  });

  return (
    <>
      {clones}
      <svg style={{display: "none"}}>
        <filter id={wigglyEffectFilterId}>
          <feTurbulence {...feTurbulence}>
            <animate {...animate} />
          </feTurbulence>
          <feDisplacementMap {...feDisplacementMap} />
        </filter>
      </svg>
    </>
  );
}

export default WigglyEffect;
