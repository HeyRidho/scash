import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <section id="home">
            <Outlet />
        </section>
    )
}

export default Home;