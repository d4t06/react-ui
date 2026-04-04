import { useEffect, useRef, useState } from "react";

export default function useCountDown() {
	const [value, setValue] = useState(10);
	const [trigger, setTrigger] = useState(0);

	const ranEffect = useRef(false);
	const intervalId = useRef(0);

	useEffect(() => {
		if (!ranEffect.current) {
			ranEffect.current = true;

			intervalId.current = setInterval(
				() =>
					setValue((prev) => {
						if (prev <= 1) setTrigger(1);

						return prev - 1;
					}),
				1000,
			);
		}
	}, []);

	useEffect(() => {
		if (!trigger) return;
		clearInterval(intervalId.current);
	}, [trigger]);

	const reset = () => {
		setValue(10);
		setTrigger(0);
	};

	return { value, reset };
}
