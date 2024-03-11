import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function GoogleAuth() {
    return (
        <Button variant="outline"><FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />구글로 계속하기</Button>
    )
}
