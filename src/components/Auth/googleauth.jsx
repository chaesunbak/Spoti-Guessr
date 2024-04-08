import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import useContinueWithGoogle from "../../hooks/useContinueWithGoogle";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
    const { handleContinueWithGoogle, user ,loading, error } = useContinueWithGoogle();
    const navigate = useNavigate();

    const handleClick = async () => {
        await handleContinueWithGoogle();
        navigate(-1);
    }

    return (
        <Button variant="outline" onClick={handleClick} disabled={loading}>
            <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />구글계정으로 계속하기
        </Button>
    )
}
