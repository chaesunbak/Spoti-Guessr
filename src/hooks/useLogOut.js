import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const useLogOut = () => {
    const [signOut, isLoggingOut, error] = useSignOut(auth);
    const logoutUser = useAuthStore((state) => state.logout);

    const handleLogOut = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            logoutUser();
        } catch (error) {
            console.log("Error", error.message);
        }
    };

    return { handleLogOut, isLoggingOut, error };
};

export default useLogOut;