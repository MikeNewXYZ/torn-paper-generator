import { useRef, useEffect, useCallback } from "react";
import isMobile from "is-mobile";

const defaultSettings = {
	perspective: "1000px",
	transition: "transform 500ms ease-out",
	multiplier: 5,
	hoverScale: 1.1,
};

export default function useFloatingCard(settings = defaultSettings) {
	settings = { ...defaultSettings, ...settings };
	const outerRef = useRef(null);
	const innerRef = useRef(null);
	const dimensions = useRef({ top: 0, left: 0, halfHeight: 0, halfWidth: 0 });
	const isMobileDevice = isMobile();

	// Set perspective on the outer element.
	useEffect(() => {
		if (isMobileDevice) return;
		const outer = outerRef.current;
		const inner = innerRef.current;

		outer.style.perspective = settings.perspective;
		inner.style.transition = settings.transition;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	// Add and remove mouse event listeners.
	useEffect(() => {
		if (isMobileDevice) return;
		const inner = innerRef.current;

		inner.addEventListener("mousemove", handleMouseMove);
		inner.addEventListener("mouseout", handleMouseOut);

		return () => {
			inner.removeEventListener("mousemove", handleMouseMove);
			inner.removeEventListener("mouseout", handleMouseOut);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [settings]);

	// Cache dimensions to prevent expensive calculations on every mouse event.
	useEffect(() => {
		if (isMobileDevice) return;
		const inner = innerRef.current;

		const updateDimensions = () => {
			const { top, left, height, width } = inner.getBoundingClientRect();
			dimensions.current = {
				top,
				left,
				halfHeight: height / 2,
				halfWidth: width / 2,
			};
		};
		updateDimensions();

		window.addEventListener("resize", updateDimensions);

		return () => window.removeEventListener("resize", updateDimensions);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Animate floating card effect.
	const handleMouseMove = useCallback(
		(e) => {
			const inner = innerRef.current;

			requestAnimationFrame(() => {
				const { top, left, halfHeight, halfWidth } = dimensions.current;
				const mouseY = e.clientY - top;
				const mouseX = e.clientX - left;
				const rotateY = -((mouseX - halfWidth) / halfWidth);
				const rotateX = (mouseY - halfHeight) / halfHeight;

				Object.assign(inner.style, {
					transform: `
			    rotateX(${rotateX * settings.multiplier}deg)
			    rotateY(${rotateY * settings.multiplier}deg)
			    scale(${settings.hoverScale})
			  `,
				});
			});
		},
		[settings],
	);

	// Reset floating card effect.
	const handleMouseOut = useCallback(() => {
		const inner = innerRef.current;

		requestAnimationFrame(() => {
			Object.assign(inner.style, {
				transform: `
          rotateX(0deg)
          rotateY(0deg)
          scale(1)
        `,
			});
		});
	}, []);

	return { outerRef, innerRef };
}
