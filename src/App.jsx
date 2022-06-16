import {useEffect, useState} from "react";
import tw from "tailwind-styled-components";
import {X} from "phosphor-react";
import {useTornPaper} from "@/Hooks";
import {
  PaperPlatform,
  ResultsPaper,
  CopyStyles,
  Options,
  Modal,
} from "@/Components";

const Container = tw.main`
  container
  h-full
`;

const Flex = tw.div`
  relative
  flex
  justify-center
  items-center
  gap-8
  w-full
  h-full
  px-0
  sm:px-2
  md:px-4
  lg:pb-4
  sm:pt-2
`;

const ResultsArea = tw.div`
  flex-1
  w-full
  h-full
  z-10
`;

const OptionsArea = tw.div`
  hidden
  lg:block
  flex-1
  w-full
  h-full
  overflow-hidden
`;

const OptionsButton = tw.button`
  block
  lg:hidden
  w-full
  p-4
  pb-4.5
  bg-purple-500
  text-slate-50
  text-3xl
  font-semibold
  sm:px-2
`;

function App() {
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({
    amountOfPoints: 50,
    roughness: 1,
    sides: {top: true, right: true, bottom: true, left: true},
  });
  const [copyStyles, setCopyStyles] = useState("clip-path: polygon();");
  const [ref, generateStyles] = useTornPaper({
    amountOfPoints: options.amountOfPoints,
    multiplier: options.roughness,
    sides: options.sides,
  });

  useEffect(() => {
    generateStyles();
    setClipPath();
  }, [options]);

  const handleResultsPaperClick = () => {
    generateStyles();
    setClipPath();
  };

  const setClipPath = () => {
    const clipPath = ref.current.style.clipPath;
    setCopyStyles(`clip-path: ${clipPath};`);
  };

  return (
    <>
      <Container>
        <PaperPlatform>
          <Flex>
            <OptionsArea>
              <Options options={options} setOptions={setOptions} />
            </OptionsArea>
            <ResultsArea>
              <ResultsPaper innerRef={ref} onClick={handleResultsPaperClick} />
            </ResultsArea>
          </Flex>
          <div className="sm:px-2 md:px-4">
            <OptionsButton onClick={() => setShowOptions(!showOptions)}>
              Options
            </OptionsButton>
          </div>
          <CopyStyles cssStyle={copyStyles} />
        </PaperPlatform>
      </Container>
      <Modal show={showOptions} onBackgroundClick={() => setShowOptions(false)}>
        <Container>
          <PaperPlatform>
            <button
              className="absolute right-1.5 top-1"
              onClick={() => setShowOptions(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <Options options={options} setOptions={setOptions} />
          </PaperPlatform>
        </Container>
      </Modal>
    </>
  );
}

export default App;
