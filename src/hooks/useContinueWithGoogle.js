import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import { getRandomNickname } from "../utils/utils";

const useContinueWithGoogle = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loginUser = useAuthStore((state) => state.login);
    const provider = new GoogleAuthProvider();

    const continueWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const newUser = result.user;
            const userRef = doc(db, "users", newUser.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                // login
                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            } else {
                // signup
                const userDoc = {
                    uid: newUser.uid,
                    email: newUser.email,
                    nickname: getRandomNickname(),
                    createdAt: Date.now(),
                    permission: "read-only",
                };
                await setDoc(doc(db, "users", newUser.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { continueWithGoogle, loading, error };
};

export default useContinueWithGoogle;