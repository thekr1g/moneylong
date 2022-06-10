import React from 'react';
import {loginRoutes, routes} from "../routes/routes";
import {Route,Routes} from "react-router-dom";

const AppRouter = () => {
    return (
        <Routes>
            {loginRoutes.map(({path,element})=>
                <Route key={path} path={path} element={element}/>
            ) }
            {routes.map(({path,element})=>
                <Route key={path} path={path} element={element}/>
            ) }
        </Routes>
    );
};

export default AppRouter;