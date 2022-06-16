import {useState} from "react";
import tw from "tailwind-styled-components";
import {CopyToClipboard} from "react-copy-to-clipboard";
import paperPattern from "@/Assets/paper-pattern.png";
import CopyOverlay from "./CopyOverlay";

const Wrapper = tw(CopyToClipboard)`
  overflow-hidden
  shadow-inner
  mx-0
  sm:mx-4
  mb-0
  sm:mb-3
  cursor-pointer
  select-none
`;

const Code = tw.code`
  block
  truncate
  text-lg
  md:text-xl
  font-medium
  p-4
  sm:p-6
  contrast-[0.8]
`;

function CopyStyles({cssStyle}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
  };

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <>
      <Wrapper
        text={cssStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onCopy={handleCopy}
      >
        <Code style={{backgroundImage: `url(${paperPattern})`}}>
          {cssStyle}
        </Code>
      </Wrapper>
      <CopyOverlay show={showOverlay} copied={copied} />
    </>
  );
}

export default CopyStyles;
