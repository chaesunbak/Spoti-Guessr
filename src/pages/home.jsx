import SignIn from "../components/signin"
import SignUp from "../components/signup"

export default function Home() {
    return (
        <section id="home" className="w-full">
            <SignIn />
            <SignUp />
        </section>

    )
}