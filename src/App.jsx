import tw from "tailwind-styled-components";
import {PaperPlatform} from "@/Components";

const Container = tw.main`
  container
  h-full
`;

function App() {
  return (
    <Container>
      <PaperPlatform>Hello</PaperPlatform>
    </Container>
  );
}

export default App;
