import SignIn from "../components/Auth/signin"
import SignUp from "../components/Auth/signup"

export default function Home() {
    return (
        <section id="home" className="w-full">
            <SignIn />
            <SignUp />
        </section>

    )
}