import * as ReactDOM from "react-dom";
import tw from "tailwind-styled-components";
import {ClipboardText} from "phosphor-react";
import {isMobile} from "react-device-detect";
import stardustPattern from "@/Assets/stardust-pattern.png";
import {WigglyEffect} from "@/Components";

const Wrapper = tw.div`
  fixed
  inset-0
  w-full
  h-screen
  z-50
  flex
  justify-center
  items-center
  ${(p) => {
    return isMobile && p.$show ? "pointer-events-auto" : "pointer-events-none";
  }}
  ${(p) => (p.$show ? "opacity-100" : "opacity-0")}
  transition-opacity
  duration-500
`;

const Background = tw.div`
  absolute
  inset-0
  w-full
  h-full
  bg-repeat
  opacity-75
`;

const ContentWrapper = tw.div`
  flex
  justify-center
  items-center
  flex-col
  gap-4
  pb-6
  text-slate-50
  drop-shadow-md
  z-10
  ${(p) => (p.$show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5")}

  transition-all
  duration-500
  delay-100
`;

const CopyIcon = tw(ClipboardText)`
  h-32
  w-32
`;

const Heading = tw.h1`
  text-6xl
  font-medium
  text-center
`;

function CopyOverlay({show, copied, ...rest}) {
  return ReactDOM.createPortal(
    <>
      <Wrapper $show={show} {...rest}>
        <Background style={{backgroundImage: `url(${stardustPattern})`}} />
        <WigglyEffect>
          <ContentWrapper $show={show}>
            <CopyIcon />
            <Heading>{copied ? "Success!" : "Click to Copy!"}</Heading>
          </ContentWrapper>
        </WigglyEffect>
      </Wrapper>
    </>,
    document.getElementById("root")
  );
}

export default CopyOverlay;
