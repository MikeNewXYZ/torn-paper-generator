import "./App.css";
import { useCallback, useEffect, useState } from "react";
import Paper from "./components/paper/paper";
import Options from "./components/options/options";
import tornPaper from "./lib/tornPaper/tornPaper";

export default function App() {
	const [optionValues, setOptionValues] = useState({
		topSide: true,
		bottomSide: true,
		leftSide: true,
		rightSide: true,
		amountOfPoints: 50,
		roughness: 1,
	});

	const [clipPath, setClipPath] = useState("");

	const setNewClipPath = useCallback(() => {
		setClipPath(tornPaper(optionValues));
	}, [optionValues]);

	useEffect(() => {
		setNewClipPath();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionValues]);

	const handleOptions = useCallback((e) => {
		const { type, checked, value, name } = e.target;

		setOptionValues((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : parseFloat(value),
		}));
	}, []);

	const handleCopyStyles = useCallback((e) => {
		e.preventDefault();
	}, []);

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
						<p className="text-right">By MikeNewXYZ</p>
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
