import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Box() {
    return (
        <Card className="aspect-square">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    )
}