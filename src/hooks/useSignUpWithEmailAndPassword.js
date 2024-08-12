import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useAuthStore from '../store/authStore';
import getRandomNickname from '../utils/getRandomNickname';
import { useNavigate } from 'react-router-dom';


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const auth = getAuth();
    const loginUser = useAuthStore(state => state.login);
    const navigate = useNavigate();

    const signUp = async (inputs) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            const userDoc = {
                uid: newUser.user.uid,
                email: inputs.email,
                nickname: getRandomNickname(), 
                createdAt: Date.now(),
                permission: "read-only",
            };

            await setDoc(doc(db, "users", newUser.user.uid), userDoc);
            localStorage.setItem("user-info", JSON.stringify(userDoc));
            loginUser(userDoc);
        } catch (error) {
            const errorCode = error.code;
			console.log(error);
			console.log(errorCode);
			let message;
            switch (errorCode) {
				case "auth/user-not-found" || "auth/wrong-password":
					message = "이메일 혹은 비밀번호가 일치하지 않습니다.";
					break;
				case "auth/email-already-in-use":
					message = "이미 사용 중인 이메일입니다.";
					break;
				case "auth/too-many-requests":
					message = "너무 많은 시도가 있었습니다. 나중에 다시 시도해주세요.";
					break;
				case "auth/weak-password":
					message = "비밀번호는 6글자 이상이어야 합니다.";
					break;
				case "auth/network-request-failed":
					message = "네트워크 연결에 실패 하였습니다.";
					break;
				case "auth/invalid-email":
					message = "잘못된 이메일 형식입니다.";
					break;
				case "auth/internal-error":
					message = "잘못된 요청입니다.";
					break;
				default:
					message = "회원가입에 실패 하였습니다.";
			  }
			alert(message);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, signUp };
};

export default useSignUp;