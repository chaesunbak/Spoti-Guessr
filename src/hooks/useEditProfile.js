import { useState } from "react";
import useAuthStore from "../store/authStore";
import { doc, updateDoc } from "firebase/firestore";

const useEditProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);

    const editProfile = async (inputs ) => {
		if (isUpdating || !authUser) return;
		setIsUpdating(true);

		const userDocRef = doc(firestore, "users", authUser.uid);

		try {
			const updatedUser = {
				...authUser,
				nickname: inputs.nickname || authUser.nickname,
				email: inputs.email || authUser.email,
			};

			await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
            console.log("프로필 업데이트 성공")
		} catch (error) {
			console.log("프로필 업데이트 실패". error.message);
		} finally {
			setIsUpdating(false);
		}
	};

	return { editProfile, isUpdating };
}

export default useEditProfile;