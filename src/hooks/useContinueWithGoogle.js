import { useEffect, useState } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import useAuthStore from "../store/authStore";
import getRandomNickname from '../utils/getRandomNickname';

const useContinueWithGoogle = () => {
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loginUser = useAuthStore((state) => state.login);

    useEffect(() => {
        const handleRedirectResult = async () => {
            setLoading(true);
            try {
                const result = await getRedirectResult(auth);
                if (result) {
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
                }
            } catch (error) {
                console.log("Error", error.message);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        handleRedirectResult();
    }, [loginUser]);

    const continueWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider);
    };

    return { continueWithGoogle, loading, error };
};

export default useContinueWithGoogle;
