import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hero from "./pages/HeroPage"


function AppRoutes (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/hero-page/:id" element={<Hero/>}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes