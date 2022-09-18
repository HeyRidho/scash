import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <section id="home">
            <h1>Hello Home</h1>
            <Outlet />
        </section>
    )
}

export default Home;