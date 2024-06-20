const defaultOptions = {
	topSide: true,
	bottomSide: true,
	leftSide: true,
	rightSide: true,
	amountOfPoints: 50,
	roughness: 1,
};

export default function tornPaper(options = defaultOptions) {
	options = { ...defaultOptions, ...options };

	return `polygon(
    ${generatePoints("top", options.topSide, options)},
    ${generatePoints("right", options.rightSide, options)},
    ${generatePoints("bottom", options.bottomSide, options)},
    ${generatePoints("left", options.leftSide, options)}
  )`;
}

function generatePoints(side, isTorn, options) {
	let points = [];

	for (let i = 0; i < options.amountOfPoints; i++) {
		const path = ((100 / options.amountOfPoints) * i).toFixed(0);
		const variability = Math.random() * options.roughness;

		if (side === "top") {
			if (isTorn) {
				points.push(`${path}% ${variability}%`);
			} else {
				points.push("0% 0%, 100% 0%");
				break;
			}
		} else if (side === "right") {
			if (isTorn) {
				points.push(`${100 - variability}% ${path}%`);
			} else {
				points.push("100% 0%, 100% 100%");
				break;
			}
		} else if (side === "bottom") {
			if (isTorn) {
				points.push(`${100 - path}% ${100 - variability}%`);
			} else {
				points.push("100% 100%, 0% 100%");
				break;
			}
		} else if (side === "left") {
			if (isTorn) {
				points.push(`${variability}% ${100 - path}%`);
			} else {
				points.push("0% 100%, 0% 0%");
				break;
			}
		}
	}

	return points;
}
