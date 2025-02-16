import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // we should add the container in a central place of our app and then call the toast method to display a toast
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header_footer/header";
import Footer from "./Components/Header_footer/footer";
import Home from "./Components/Home";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/Admin/Dashboard";
import AdminPlayers from "./Components/Admin/players";
import AuthGuard from "./Hoc/Auth";
import AddEditPlayers from "./Components/Admin/players/addEditPlayers";
import TheTeam from "./Components/theTeam";
import AdminMatches from "./Components/Admin/matches";
import AddEditMatch from "./Components/Admin/matches/addEditMatch";
import TheMatches from "./Components/theMatches";
import NotFound from "./Components/not_found";

const Routes = ({ user }) => {
  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route
          path="/admin_matches/edit_match/:matchId"
          component={AuthGuard(AddEditMatch)}
        />
        <Route
          path="/admin_matches/add_match"
          component={AuthGuard(AddEditMatch)}
        />
        <Route path="/admin_matches" component={AuthGuard(AdminMatches)} />
        <Route
          path="/admin_players/edit_player/:playerId"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path="/admin_players/add_player"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path="/admin_players" component={AuthGuard(AdminPlayers)} />
        <Route path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route path="/the_matches" component={TheMatches} />
        <Route path="/the_team" component={TheTeam} />
        <Route
          path="/log_in"
          // we wanted to redirect logged in users to dashboard when going to signIn. Because we cannot pass props to Route components, we passed a function that receives the default props of the Route and then return the component we want with them and the user
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
