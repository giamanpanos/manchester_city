import React from "react";
import { Link, withRouter } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { logoutHandler } from "../../Utils/tools";

const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/admin_matches",
    },
    {
      title: "Players",
      linkTo: "/admin_players",
    },
  ];

  const renderItems = () =>
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));

  return (
    <div>
      {renderItems()}
      <ListItem
        button
        className="admin_nav_link"
        onClick={() => logoutHandler()}
      >
        Log out
      </ListItem>
    </div>
  );
};

// When we want a component to receive the props from the Router component, if it is not a direct children of it like Dashboard for example, we can use the withRouter and this component will get access to them
export default withRouter(AdminNav);
