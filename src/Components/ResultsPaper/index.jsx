import {useState, useRef} from "react";
import tw from "tailwind-styled-components";
import {ArrowsClockwise} from "phosphor-react";
import linedPaperPattern from "@/Assets/lined-paper-pattern.png";
import {WigglyEffect} from "@/Components";

const Wrapper = tw.div`
  drop-shadow-md
  hover:drop-shadow-lg
  md:hover:scale-105
  cursor-pointer
  w-full
  h-full
  transition-all
  duration-500
`;

const Paper = tw.div`
  w-full
  h-full
  bg-repeat
  transition-all
  duration-500
`;

const Overlay = tw.div`
  flex
  flex-col
  gap-4
  justify-center
  items-center
  select-none
  w-full
  h-full
  p-4
  break-all
  lg:opacity-0
  lg:hover:opacity-100
  lg:translate-y-5
  lg:hover:translate-y-0
  transition-all
  duration-500
`;

const RefreshIcon = tw(ArrowsClockwise)`
  w-24
  h-24
  transition-all
  duration-500
`;

const OverlayHeading = tw.h1`
  text-center
  font-medium
  text-5xl
`;

let refreshIconRotation = 0;

function ResultsPaper({
  innerRef,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onClick = () => {},
  ...rest
}) {
  const refreshIconRef = useRef(null);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setHover(false);
    onMouseLeave();
  };

  const handleClick = () => {
    rotateRefreshIcon();
    onClick();
  };

  const rotateRefreshIcon = () => {
    const el = refreshIconRef.current;
    refreshIconRotation += 360;
    el.style.transform = `rotate(${refreshIconRotation}deg)`;
  };

  return (
    <Wrapper
      {...rest}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Paper
        ref={innerRef}
        style={{backgroundImage: `url(${linedPaperPattern})`}}
      >
        <WigglyEffect feDisplacementMap={{scale: 5}}>
          <Overlay>
            <RefreshIcon
              ref={refreshIconRef}
              $hide={!hover}
              style={{transform: "rotate(0deg)"}}
            />
            <OverlayHeading $hide={!hover}>Regenerate</OverlayHeading>
          </Overlay>
        </WigglyEffect>
      </Paper>
    </Wrapper>
  );
}

export default ResultsPaper;
