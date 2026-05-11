import { PlayIcon } from "@heroicons/react/16/solid";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

export default function ChatInputPage() {
	const [value, setValue] = useState("");

	const inputRef = useRef<HTMLTextAreaElement>(null);

	const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		if (!inputRef.current) return;

		if (inputRef.current.scrollHeight > inputRef.current.offsetHeight) {
			inputRef.current.style.height = inputRef.current.scrollHeight + "px";
		}
	}, [value]);

	return (
		<div className={`rounded-lg ml-2 p-1.5 flex items-end bg-[--a-10-cl]`}>
			<textarea
				value={value}
				ref={inputRef}
				onChange={handleInputChange}
				rows={(value.match(/\n/g) || []).length + 1}
				className={`no-scrollbar resize-none outline-none max-h-[30vh] w-full !bg-transparent border-none`}
			/>

			<button>
				<PlayIcon className="w-6" />
			</button>
		</div>
	);
}
