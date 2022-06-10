import React from 'react';
import Header from "./components/Header/Header";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import "./App.css"

const App = () => {
    return (<BrowserRouter>
        <div className="app-wrapper">
          <Header/>
            <AppRouter/>
        </div>
        </BrowserRouter>
    );
};

export default App;