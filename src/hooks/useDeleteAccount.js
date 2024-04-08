import { useState } from "react";
import useAuthStore from "../store/authStore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/firebase';

const useDeleteAccount = () => {
	const [isDeleting, setIsDeleting] = useState(false);

    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);

    const deleteAccount = async () => {
		if (isDeleting || !authUser) return;
		setIsDeleting(true);

		try {
			await deleteDoc(doc(db, "users", authUser.uid));
			localStorage.removeItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(null);
            console.log("계정 삭제 성공")
		} catch (error) {
			console.log("계정 삭제 실패". error.message);
		} finally {
            setIsDeleting(false);
        }
	};

	return { deleteAccount, isDeleting };
}

export default useDeleteAccount;