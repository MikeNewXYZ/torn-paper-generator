import {useEffect, useState} from "react";
import tw from "tailwind-styled-components";
import {useTornPaper} from "@/Hooks";
import {PaperPlatform, ResultsPaper} from "@/Components";

const Container = tw.main`
  container
  h-full
`;

const Flex = tw.div`
  flex
  justify-center
  items-center
  gap-8
  w-full
  h-full
`;

const ResultsArea = tw.div`
  flex-1
  w-full
  h-full
  p-0
  sm:p-6
  md:p-10
`;

const OptionsArea = tw.div`
  hidden
  lg:block
  flex-1
  w-full
  h-full
`;

function App() {
  const [copyStyles, setCopyStyles] = useState("clip-path: polygon();");
  const [ref, generateStyles] = useTornPaper({
    amountOfPoints: 50,
    multiplier: 1,
    sides: {top: true, right: true, bottom: true, left: true},
  });

  console.log(copyStyles);

  useEffect(() => {
    generateStyles();
    setClipPath();
  }, []);

  const handleResultsPaperClick = () => {
    generateStyles();
    setClipPath();
  };

  const setClipPath = () => {
    const clipPath = ref.current.style.clipPath;
    setCopyStyles(`clip-path: ${clipPath};`);
  };

  return (
    <Container>
      <PaperPlatform>
        <Flex>
          <OptionsArea></OptionsArea>
          <ResultsArea>
            <ResultsPaper innerRef={ref} onClick={handleResultsPaperClick} />
          </ResultsArea>
        </Flex>
      </PaperPlatform>
    </Container>
  );
}

export default App;
