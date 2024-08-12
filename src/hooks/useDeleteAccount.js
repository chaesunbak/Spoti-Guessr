import { useState } from "react";
import useAuthStore from "../store/authStore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

const useDeleteAccount = () => {
	const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);

    const deleteAccount = async () => {
		if (loading || !authUser) return;

		// 사용자에게 삭제를 확인합니다.
		const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
		if (!isConfirmed) return;

		setLoading(true);
        setError(null);

		try {
			await deleteDoc(doc(db, "users", authUser.uid));
			localStorage.removeItem("user-info");
			setAuthUser(null);
            console.log("계정 삭제 성공");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
	};

	return { deleteAccount, loading, error };
}

export default useDeleteAccount;