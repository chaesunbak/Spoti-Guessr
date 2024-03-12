import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useLogin = () => {
	const [signInWithEmailAndPassword, , loggingin, error] = useSignInWithEmailAndPassword(auth);
    const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

	const login = async (inputs) => {
		try {
			const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);

			if (userCred) {
				const docRef = doc(firestore, "users", userCred.user.uid);
				const docSnap = await getDoc(docRef);
				localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
				loginUser(docSnap.data());
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return { login, loggingin, error };
};

export default useLogin;