import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";

import { Routes } from "constants/routes";
import history from "utils/history";

import { PublicRoute, PrivateRoute, AdminRoute } from "containers/Routes";

// Public Pages
// const Login = lazy(() => import("./Login"));
import EmailVerification from "./EmailVerification"
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ChangePassword from "./ChangePassword";
import AdminLogin from "./Admin/Login";
import AdminHome from "./Admin/Home";
import Navbar from "components/Navbar";

// Protected Pages

const Pages = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        {/* Public routes */}
        <PublicRoute path={Routes.login} component={Login} />
        <PublicRoute path={Routes.emailverification} component={EmailVerification} />
        <PublicRoute path={Routes.adminLogin} component={AdminLogin} />
        <PublicRoute path={Routes.register} component={Register} />

        {/* Private routes */}
        <PrivateRoute exact path={Routes.index} component={Home} />
        <PrivateRoute
          exact
          path={Routes.changePassword}
          component={ChangePassword}
        />

        {/* Admin routes */}
        <AdminRoute
          exact
          path={Routes.adminChangePassword}
          component={ChangePassword}
        />
        <AdminRoute path={Routes.adminHome} component={AdminHome} />
      </Switch>
    </Router>
  );
};

export default Pages;
