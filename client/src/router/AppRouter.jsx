import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {publicRoutes, loginRegRoutes, adminRoutes} from "./routes";
import {HOME_ROUTE} from "../utils/consts";
import {connect} from "react-redux";

class AppRouter extends React.Component {
    render() {
        const { isAuth, isAdmin } = this.props.user;

        return (
            <>
                <Routes>
                    {!isAuth && loginRegRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={Component} exact />
                    )}
                    {isAuth && isAdmin && adminRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={Component} exact />
                    )}
                    {publicRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={Component} exact />
                    )}
                    <Route path="*" element={<Navigate to={HOME_ROUTE} />} />
                </Routes>
            </>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
};

const actionCreators = {

};

export default connect(
    mapStateToProps,
    actionCreators
)(AppRouter);