import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./Layout";
import UserProvider from "./User/UserProvider";
import ListProvider from "./List/ListProvider";
import Main from "./Main/Main";
import ListDetail from "./List/ListDetail";


function App() {
    return (
        <div className="App">
            <UserProvider>
                <ListProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Main />} />
                                <Route path="/ListDetail/:id" element={<ListDetail />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </ListProvider>
            </UserProvider>
        </div>
    );
}

export default App;
