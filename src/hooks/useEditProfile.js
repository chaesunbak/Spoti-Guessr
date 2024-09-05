import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authUser = useAuthStore(state => state.user);
  const setAuthUser = useAuthStore(state => state.setUser);

  const editProfile = async inputs => {
    if (loading || !authUser) return;
    setLoading(true);

    const userDocRef = doc(db, 'users', authUser.uid);

    try {
      const updatedUser = {
        ...authUser,
        nickname: inputs.nickname || authUser.nickname,
        email: inputs.email || authUser.email,
      };

      await updateDoc(userDocRef, updatedUser);
      setAuthUser(updatedUser);
      console.log('프로필 업데이트 성공');
    } catch (error) {
      console.log('프로필 업데이트 실패', error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { editProfile, loading, error };
};

export default useEditProfile;
