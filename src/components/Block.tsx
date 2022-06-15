import { getColors } from "../utils";
interface BlockProps {
	num: number;
}
const Block = ({ num }: BlockProps) => {
	const { blockStyle } = style;

	return (
		<div
			style={{
				...blockStyle,
				background: getColors(num),
				color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
			}}
		>
			{num !== 0 ? num : ""}
		</div>
	);
};

const style = {
	blockStyle: {
		height: 80,
		width: 80,
		background: "lightgray",
		margin: 3,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontSize: 45,
		fontWeight: "800",
		color: "white",
	},
};

export default Block;
