import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Box( {link, title, bgColor} ) {
    return (
        <Link to={link}>
            <Card className={`aspect-square drop-shadow-md hover:drop-shadow-lg ${bgColor}`} >
                <CardHeader>
                    <CardTitle className="text-white">{title || 'Untitled'}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </Link>
    )
}