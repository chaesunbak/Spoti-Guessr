import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function PlayCard({gameData}) {

    const bgStyle = {
        backgroundImage: `url('${gameData.image}')`,
        backgroundSize: 'cover',
    };

    return (
        <Card className="aspect-square rounded-3xl" style={bgStyle} >
            <CardHeader>
                <CardTitle className="text-7xl text-white">{gameData.name}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
        </Card>
    )
}