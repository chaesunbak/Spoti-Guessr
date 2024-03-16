import { useToast } from "@/components/ui/use-toast"
import { useCallback } from "react";


const useShowToast = () => {
	const toast = useToast();

	const showToast = useCallback(
		( title, description ) => {
			toast({
				title: title,
				description: description,
			});
		},
		[toast]
	);

	return showToast;

};

export default useShowToast;