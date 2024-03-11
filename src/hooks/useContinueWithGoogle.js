import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase/firebase';
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { doc, getDoc, setDoc } from 'firebase/firestore'
import getRandomNickname from '../utils/getRandomNickname';


const useContinueWithGoogle = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore((state) => state.login);

    const handleContinueWithGoogle = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					nickname:getRandomNickname(),
					createdAt: Date.now(),
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

    return { handleContinueWithGoogle, user ,loading, error };
};

export default useContinueWithGoogle;