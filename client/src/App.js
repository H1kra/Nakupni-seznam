import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './navbar/NavBar.js'
import UserProvider from "./User/UserProvider";
import ListProvider from "./List/ListProvider";
import Main from "./Main/Main";


function App() {
    return (
        <div className="App">
            <UserProvider>
                <ListProvider>
                    <NavBar/>
                    <Main/>
                </ListProvider>
            </UserProvider>
        </div>
    );
}

export default App;
