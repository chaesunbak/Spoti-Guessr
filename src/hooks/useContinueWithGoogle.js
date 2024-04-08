import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase/firebase';
import useAuthStore from "../store/authStore";
import { doc, getDoc, setDoc } from 'firebase/firestore'
import getRandomNickname from '../utils/getRandomNickname';


const useContinueWithGoogle = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const loginUser = useAuthStore((state) => state.login);

    const handleContinueWithGoogle = async (toast) => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message);
				return;
			}
			const userRef = doc(db, "users", newUser.user.uid);
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
					permission:"read-only",
				};
				await setDoc(doc(db, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			console.log("Error", error.message);
		}
	};

    return { handleContinueWithGoogle, user ,loading, error };
};

export default useContinueWithGoogle;