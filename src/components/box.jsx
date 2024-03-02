import { Link } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Box( {title} ) {
    return (
        <Link to={title}>
            <Card className="aspect-square">
                <CardHeader>
                    <CardTitle>{title || 'Untitled'}</CardTitle>
                </CardHeader>
                <CardContent>
                </CardContent>
            </Card>
        </Link>
    )
}