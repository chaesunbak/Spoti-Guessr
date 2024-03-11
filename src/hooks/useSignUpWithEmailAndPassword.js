import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";

const useSignUpWithEmailAndPassword = (inputs) => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const signup = async ( inputs ) => {
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newUser && error) {
                console.log(error);
                return
            }
            if (newUser) {
                const userDoc = {
                    uid:newUser.user.uid,
                    email:inputs.email,
                    createdAt:Date.now(),
                }
                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
            }
        } catch (error) {
            console.log(error);
        };
    }
    return { loading, error, signup};
};

export default useSignUpWithEmailAndPassword;