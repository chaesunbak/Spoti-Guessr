import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';

const useLogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const loginUser = useAuthStore(state => state.login);

  const logIn = async inputs => {
    setLoading(true);
    setError(null);
    try {
      const userCred = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

      if (userCred) {
        const docRef = doc(db, 'users', userCred.user.uid);
        const docSnap = await getDoc(docRef);
        loginUser(docSnap.data());
      }
    } catch (error) {
      const errorCode = error.code;
      console.log(error);
      let message;
      switch (errorCode) {
        case 'auth/user-not-found' || 'auth/wrong-password':
          message = '이메일 혹은 비밀번호가 일치하지 않습니다.';
          break;
        case 'auth/email-already-in-use':
          message = '이미 사용 중인 이메일입니다.';
          break;
        case 'auth/too-many-requests':
          message = '너무 많은 시도가 있었습니다. 나중에 다시 시도해주세요.';
          break;
        case 'auth/weak-password':
          message = '비밀번호는 6글자 이상이어야 합니다.';
          break;
        case 'auth/network-request-failed':
          message = '네트워크 연결에 실패 하였습니다.';
          break;
        case 'auth/invalid-email':
          message = '잘못된 이메일 형식입니다.';
          break;
        case 'auth/internal-error':
          message = '잘못된 요청입니다.';
          break;
        default:
          message = '로그인에 실패 하였습니다.';
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logIn };
};

export default useLogIn;
