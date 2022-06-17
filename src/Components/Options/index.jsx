import {useId} from "react";
import tw from "tailwind-styled-components";
import {Adsense} from "@ctrl/react-adsense";

const Wrapper = tw.div`
  flex
  flex-col
  gap-6
  w-full
  h-full
  overflow-x-hidden
  overflow-y-auto
`;

const Heading = tw.h1`
  text-4xl
  font-semibold
  p-2
  pb-3
`;

const Form = tw.form`
  flex
  flex-col
  gap-4
  flex-1
`;

const OptionsWrapper = tw.div`
  flex
  flex-col
  gap-2
`;

const OptionHeading = tw.div`
  text-xl
  font-semibold
`;
const CheckboxWrapper = tw.div`
  flex
  items-center
  gap-2
  text-lg
  font-medium
`;

const AdvertWrapper = tw.div`
  w-full
  flex-shrink-0
  h-32
  overflow-hidden
`;

function Options({options, setOptions, ...rest}) {
  const amountOfPointsId = useId();
  const roughnessId = useId();
  const topSideId = useId();
  const bottomSideId = useId();
  const leftSideId = useId();
  const rightSideId = useId();

  const handleChange = (e) => {
    const {name, type, value, checked, min, max} = e.target;
    if (type === "number") {
      const newValue = Math.max(
        Number(min),
        Math.min(Number(max), Number(value))
      );
      setOptions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (type === "checkbox") {
      setOptions((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          [value]: checked,
        },
      }));
    }
  };

  return (
    <Wrapper {...rest}>
      <Heading>Options:</Heading>
      <Form onChange={handleChange}>
        <OptionsWrapper>
          <OptionHeading>
            <label htmlFor={amountOfPointsId}>Amount of Points</label>
          </OptionHeading>
          <input
            id={amountOfPointsId}
            name="amountOfPoints"
            type="number"
            defaultValue={options.amountOfPoints}
            step={1}
            min={0}
            max={5000}
          />
        </OptionsWrapper>
        <OptionsWrapper>
          <OptionHeading>
            <label htmlFor={roughnessId}>Roughness</label>
          </OptionHeading>
          <input
            id={roughnessId}
            name="roughness"
            type="number"
            defaultValue={options.roughness}
            step={0.1}
            min={0}
            max={50}
          />
        </OptionsWrapper>
        <OptionsWrapper>
          <OptionHeading>Sides</OptionHeading>
          <CheckboxWrapper>
            <input
              id={topSideId}
              name="sides"
              type="checkbox"
              value="top"
              defaultChecked
            />
            <label htmlFor={topSideId}>Top Side</label>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <input
              id={bottomSideId}
              name="sides"
              type="checkbox"
              value="bottom"
              defaultChecked
            />
            <label htmlFor={bottomSideId}>Bottom Side</label>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <input
              id={leftSideId}
              name="sides"
              type="checkbox"
              value="left"
              defaultChecked
            />
            <label htmlFor={leftSideId}>Left Side</label>
          </CheckboxWrapper>
          <CheckboxWrapper>
            <input
              id={rightSideId}
              name="sides"
              type="checkbox"
              value="right"
              defaultChecked
            />
            <label htmlFor={rightSideId}>Right Side</label>
          </CheckboxWrapper>
        </OptionsWrapper>
      </Form>
      <AdvertWrapper style={{maxHeight: "8rem"}}>
        <Adsense
          client="ca-pub-4798866127328745"
          slot="9059795233"
          format="fluid"
          style={{display: "block", width: "100%", height: "100%"}}
        />
      </AdvertWrapper>
    </Wrapper>
  );
}

export default Options;
