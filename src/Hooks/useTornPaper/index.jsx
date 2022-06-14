import {useRef} from "react";

function useTornPaper(props) {
  props = {
    amountOfPoints: 10,
    multiplier: 3,
    ...props,
    sides: {top: true, right: true, bottom: true, left: true, ...props.sides},
  };
  const {amountOfPoints, multiplier, sides} = props;

  const ref = useRef(null);

  const generatePoints = (side = "top", isTorn = false) => {
    let newPoints = [];

    for (let i = 0; i < amountOfPoints; i++) {
      const path = ((100 / amountOfPoints) * i).toFixed(0);
      const torn = Math.random() * multiplier;

      if (side === "top") {
        if (isTorn) {
          newPoints.push(`${path}% ${torn}%`);
        } else {
          newPoints.push("0% 0%, 100% 0%");
          break;
        }
      } else if (side === "right") {
        if (isTorn) {
          newPoints.push(`${100 - torn}% ${path}%`);
        } else {
          newPoints.push("100% 0%, 100% 100%");
          break;
        }
      } else if (side === "bottom") {
        if (isTorn) {
          newPoints.push(`${100 - path}% ${100 - torn}%`);
        } else {
          newPoints.push("100% 100%, 0% 100%");
          break;
        }
      } else if (side === "left") {
        if (isTorn) {
          newPoints.push(`${torn}% ${100 - path}%`);
        } else {
          newPoints.push("0% 100%, 0% 0%");
          break;
        }
      }
    }

    return newPoints;
  };

  const generateStyles = () => {
    const el = ref.current;

    el.style.clipPath = `polygon(
      ${generatePoints("top", sides.top)},
      ${generatePoints("right", sides.right)},
      ${generatePoints("bottom", sides.bottom)},
      ${generatePoints("left", sides.left)}
    )`;
  };

  return [ref, generateStyles];
}

export default useTornPaper;
