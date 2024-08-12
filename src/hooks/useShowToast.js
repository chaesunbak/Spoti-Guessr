import { useToast } from "../components/ui/use-toast";
import { useCallback } from "react";

const useShowToast = () => {
	const toast = useToast();

	// useCallback is used to prevent infinite loop, by  caching the function
	const showToast = useCallback(
		(title, description) => {
			toast({
				title: title,
				description: description,
				duration: 3000,
			});
		},
		[toast]
	);

	return showToast;
};

export default useShowToast;