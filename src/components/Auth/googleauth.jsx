import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import useContinueWithGoogle from "../../hooks/useContinueWithGoogle";


export default function GoogleAuth() {
    const { handleContinueWithGoogle, user ,loading, error } = useContinueWithGoogle();

    return (
        <Button variant="outline" onClick={handleContinueWithGoogle} disabled={loading}>
            <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />구글로 계속하기
        </Button>
    )
}
