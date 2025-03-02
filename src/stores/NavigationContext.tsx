import { ReactNode, createContext, useContext, useState } from "react";
import { redirect } from "react-router-dom";

const useNavigation = () => {
	const [ahead, setAhead] = useState<string[]>([]);
	const [behind, setBehind] = useState<string[]>([]);

	const backward = () => {
		setBehind((prev) => {
			const last = prev.pop();

			if (last) {
				setAhead((_prev) => {
					_prev.push(last);

					return _prev;
				});

				redirect(last);
			}

			return prev;
		});
	};

	const forward = () => {
		setAhead((prev) => {
			const last = prev.pop();

			if (last) {
				setBehind((_prev) => {
					_prev.push(last);

					return _prev;
				});

				redirect(last);
			}

			return prev;
		});
	};

	return {
		ahead,
		behind,
		backward,
		forward,
	};
};

type ContextType = ReturnType<typeof useNavigation>;

const Context = createContext<ContextType | null>(null);

export default function NavigationProvider({ children }: { children: ReactNode }) {
	return <Context.Provider value={useNavigation()}>{children}</Context.Provider>;
}

export const useNavigationContext = () => {
	const ct = useContext(Context);
	if (!ct) throw new Error("Navigation context not provided");

	return ct;
};
