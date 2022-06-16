import * as ReactDOM from "react-dom";
import tw from "tailwind-styled-components";
import stardustPattern from "@/Assets/stardust-pattern.png";

const Wrapper = tw.div`
  fixed
  inset-0
  w-full
  h-screen
  z-50
  flex
  justify-center
  items-center
  ${(p) => (p.$show ? "pointer-events-auto" : "pointer-events-none")}
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

function Modal({show, onBackgroundClick = () => {}, children, ...rest}) {
  return ReactDOM.createPortal(
    <>
      <Wrapper $show={show} {...rest}>
        <Background
          onClick={onBackgroundClick}
          style={{backgroundImage: `url(${stardustPattern})`}}
        />
        {children}
      </Wrapper>
    </>,
    document.getElementById("root")
  );
}

export default Modal;
