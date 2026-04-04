import useCountDown from "./useCountDown";

export default function CountDown() {
	const { value } = useCountDown();

	return <div>{value}</div>;
}
