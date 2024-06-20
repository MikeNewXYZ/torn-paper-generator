import isMobile from "is-mobile";
import linedPaperPapper from "../../assets/lined-paper-pattern.png";
import useFloatingCard from "../../hooks/useFloatingCard/useFloatingCard";

export default function Paper({ clipPath, children }) {
	const { outerRef, innerRef } = useFloatingCard();

	return (
		<div
			ref={outerRef}
			className="w-full sm:w-[30rem] landscape:h-full md:landscape:h-fit overflow-x-visible drop-shadow-md"
			style={{ overflowY: isMobile() ? "auto" : "visible" }}
		>
			<div
				ref={innerRef}
				className="w-full bg-base-100 transition-transform duration-500 ease-out select-none"
				style={{
					background: `url(${linedPaperPapper})`,
					clipPath: clipPath,
				}}
			>
				{children}
			</div>
		</div>
	);
}
