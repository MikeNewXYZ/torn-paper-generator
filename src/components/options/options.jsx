function Checkbox({ title = "", checked, onChange, ...props }) {
	return (
		<label htmlFor={title} className="flex items-center gap-4">
			<input
				{...props}
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="checkbox checkbox-xs sm:checkbox-md"
				id={title}
				aria-checked={checked}
				aria-label={title}
			/>
			<span>{title}</span>
		</label>
	);
}

function Range({ title = "", value, onChange, ...props }) {
	return (
		<label htmlFor={title} className="flex flex-col gap-2">
			<span>
				{title} ({value})
			</span>
			<input
				min={0}
				max={100}
				{...props}
				value={value}
				onChange={onChange}
				type="range"
				className="range range-xs sm:range-md"
				id={title}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				aria-label={title}
			/>
		</label>
	);
}

export default function Options({ handleOptions, options, handleCopyStyles, handleRefresh }) {
	return (
		<form className="w-full flex flex-col gap-4 grow justify-center">
			<div className="flex flex-col gap-4 mb-2">
				<span>Affected Sides</span>

				<Checkbox
					title="Top Side"
					name="topSide"
					onChange={handleOptions}
					checked={options.topSide}
				/>
				<Checkbox
					title="Bottom Side"
					name="bottomSide"
					onChange={handleOptions}
					checked={options.bottomSide}
				/>
				<Checkbox
					title="Left Side"
					name="leftSide"
					onChange={handleOptions}
					checked={options.leftSide}
				/>
				<Checkbox
					title="Right Side"
					name="rightSide"
					onChange={handleOptions}
					checked={options.rightSide}
				/>
			</div>

			<Range
				title="Amount of Points"
				name="amountOfPoints"
				onChange={handleOptions}
				value={options.amountOfPoints}
			/>
			<Range
				title="Roughness"
				name="roughness"
				min={0}
				max={5}
				step={0.1}
				onChange={handleOptions}
				value={options.roughness}
			/>

			<div className="flex gap-2 sm:gap-4 mt-2 flex-col sm:flex-row">
				<button
					className="btn btn-sm sm:btn-md btn-primary sm:text-xl uppercase sm:grow-[3]"
					onClick={handleCopyStyles}
					aria-label="Copy Styles"
				>
					Copy Styles
				</button>
				<button
					className="btn btn-sm sm:btn-md btn-primary sm:text-xl uppercase sm:grow-[1]"
					onClick={handleRefresh}
					aria-label="Refresh"
				>
					Refresh
				</button>
			</div>
		</form>
	);
}
