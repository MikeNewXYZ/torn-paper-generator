import {useEffect} from "react";
import tw from "tailwind-styled-components";
import paperPattern from "@/Assets/paper-pattern.png";
import {useTornPaper} from "@/Hooks";

const Wrapper = tw.div`
  w-full
  h-full
  shadow-paper
`;

const Paper = tw.div`
  w-full
  h-full
  p-2
  md:p-4
`;

function PaperPlatform({children, ...rest}) {
  const [ref, generateStyles] = useTornPaper({
    amountOfPoints: 20,
    multiplier: 0.5,
    sides: {top: false, bottom: false},
  });

  useEffect(() => {
    generateStyles();
  }, []);

  return (
    <Wrapper>
      <Paper ref={ref} style={{backgroundImage: `url(${paperPattern})`}}>
        {children}
      </Paper>
    </Wrapper>
  );
}

export default PaperPlatform;
