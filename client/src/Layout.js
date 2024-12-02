import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";



const Layout = () => {
    return (
        <>
            <div style={navStyle()}>
                <NavBar/>
            </div>
            <div style={bodyStyle()}>
                <Outlet />
            </div>
        </>
    );
};

function navStyle() {
    return {
        width: "100%",
        height: "13%",
    }
}

function bodyStyle() {
    return {
        height: "auto",
        overflow: "auto",
        padding: "0px",
        margin : "0px",
        flex: "1",
        borderTop: "white 4px solid",
        borderBottom: "white 4px solid",

    };
}

//function footerStyle() {
//    return { padding: "8px", textAlign: "center", backgroundColor: "lightgrey" };
//}

export default Layout;