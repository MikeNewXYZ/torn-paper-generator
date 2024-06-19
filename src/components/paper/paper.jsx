import { useRef } from "react";
import linedPaperPapper from "../../assets/lined-paper-pattern.png";
import isMobile from "is-mobile";

export default function Paper({ children }) {
	const containerRef = useRef();
	const paperRef = useRef();

	const handleMouseMove = (e) => {
		if (isMobile()) return;

		requestAnimationFrame(() => {
			const { top, left } = e.target.getBoundingClientRect();
			const halfHeight = paperRef.current.offsetHeight / 2;
			const halfWidth = paperRef.current.offsetWidth / 2;
			const mouseY = e.clientY - top;
			const mouseX = e.clientX - left;
			const rotateY = -((mouseX - halfWidth) / halfWidth);
			const rotateX = (mouseY - halfHeight) / halfHeight;

			Object.assign(paperRef.current.style, {
				transform: `
			    rotateX(${rotateX * 5}deg)
			    rotateY(${rotateY * 5}deg)
			    scale(${1.05})
			  `,
			});
		});
	};

	const handleMouseOut = () => {
		requestAnimationFrame(() => {
			Object.assign(paperRef.current.style, {
				transform: `
          rotateX(0deg)
          rotateY(0deg)
          scale(1)
        `,
			});
		});
	};

	return (
		<div
			ref={containerRef}
			className="w-full sm:w-[30rem] landscape:h-full md:landscape:h-fit overflow-x-visible drop-shadow-md"
			style={{ perspective: "1000px", overflowY: isMobile() ? "auto" : "visible" }}
		>
			<div
				ref={paperRef}
				className="w-full bg-base-100 transition-transform duration-500 ease-out select-none"
				style={{ background: `url(${linedPaperPapper})` }}
				onMouseMove={handleMouseMove}
				onMouseOut={handleMouseOut}
			>
				{children}
			</div>
		</div>
	);
}
