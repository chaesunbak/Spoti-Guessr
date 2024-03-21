import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from '../store/authStore';
import getRandomNickname from '../utils/getRandomNickname';

const useSignUpWithEmailAndPassword = (inputs) => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login);

    const signup = async ( inputs ) => {
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                showToast("Error", error.message);
				return;
            }
            if (newUser) {
                const userDoc = {
                    uid:newUser.user.uid,
                    email:inputs.email,
                    nickname:getRandomNickname(),
                    createdAt:Date.now(),
                    permission:"read-only",
                }
                await setDoc(doc(db, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } catch (error) {
            showToast("Error", error.message);
        };
    }
    return { loading, error, signup};
};

export default useSignUpWithEmailAndPassword;