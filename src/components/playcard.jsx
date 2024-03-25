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
                <CardTitle className="text-white antialiased md:subpixel-antialiased">
                    <div className="text-xl md:text-4xl lg:text-7xl bg-black bg-opacity-20 size-fit p-1 rounded-t-sm rounded-br-sm" >{gameData.name}</div>
                    {(gameData.artist || gameData.release_date) && (<div className="text-md bg-black bg-opacity-20 size-fit p-1 rounded-b-sm">{gameData.artist} {gameData.release_date}</div>)}
                </CardTitle>
            </CardHeader>
            <CardContent className="text-white">
            </CardContent>
        </Card>
    )
}