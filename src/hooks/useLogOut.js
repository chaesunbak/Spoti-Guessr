import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import useAuthStore from '../store/authStore';

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const logoutUser = useAuthStore(state => state.logout);

  const logOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      logoutUser();
    } catch (error) {
      const errorCode = error.code;
      let message;
      switch (errorCode) {
        case 'auth/too-many-requests':
          message = '너무 많은 시도가 있었습니다. 나중에 다시 시도해주세요.';
          break;
        case 'auth/network-request-failed':
          message = '네트워크 연결에 실패 하였습니다.';
          break;
        case 'auth/internal-error':
          message = '잘못된 요청입니다.';
          break;
        case 'auth/user-token-expired':
          message = '사용자 토큰이 만료되었습니다. 다시 로그인해주세요.';
          break;
        case 'auth/user-disabled':
          message = '사용자 계정이 비활성화되었습니다.';
          break;
        default:
          message = '로그아웃에 실패 하였습니다.';
      }
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logOut };
};

export default useLogOut;
