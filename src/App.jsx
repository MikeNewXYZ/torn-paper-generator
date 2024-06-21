import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Paper from "./components/paper/paper";
import Options from "./components/options/options";
import tornPaper from "./lib/tornPaper/tornPaper";
import JSConfetti from "js-confetti";

const jsConfetti = new JSConfetti();

export default function App() {
	// State to manage options for clip path styles.
	const [optionValues, setOptionValues] = useState({
		topSide: true,
		bottomSide: true,
		leftSide: true,
		rightSide: true,
		amountOfPoints: 50,
		roughness: 1,
	});

	// State to manage the clip path css style.
	const [clipPath, setClipPath] = useState("");

	// Function to generate a new clip path based on the current options.
	const setNewClipPath = useCallback(() => {
		setClipPath(tornPaper(optionValues));
	}, [optionValues]);

	// Effect to update the clip path whenever options change.
	useEffect(() => {
		setNewClipPath();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionValues]);

	// Handler to update option values based on user input.
	const handleOptions = useCallback((e) => {
		const { type, checked, value, name } = e.target;

		setOptionValues((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : parseFloat(value),
		}));
	}, []);

	// Handler to copy the clip path styles to clipboard.
	const handleCopyStyles = useCallback(
		(e) => {
			e.preventDefault();
			navigator.clipboard.writeText(`clip-path: ${clipPath};`);
			jsConfetti.addConfetti();
		},
		[clipPath],
	);

	// Handler to refresh and generate a new clip path.
	const handleRefresh = useCallback(
		(e) => {
			e.preventDefault();
			setNewClipPath();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[optionValues],
	);

	return (
		<main className="w-full h-full flex justify-center items-center pt-2 pb-2 md:landscape:pb-4 px-2">
			<Paper clipPath={clipPath}>
				<div className="w-full h-full px-4 pb-4 pt-3 flex flex-col text-xs sm:text-base overflow-y-auto">
					<div className="flex justify-between mb-8">
						<h1>Torn Paper Generator</h1>
						<a
							className="text-right animate-jump animate-once animate-duration-[750ms] animate-delay-[2000ms]"
							href="https://MikeNew.XYZ"
							target="_blank"
						>
							By MikeNewXYZ
						</a>
					</div>

					<Options
						handleOptions={handleOptions}
						options={optionValues}
						handleCopyStyles={handleCopyStyles}
						handleRefresh={handleRefresh}
					/>
				</div>
			</Paper>
		</main>
	);
}
