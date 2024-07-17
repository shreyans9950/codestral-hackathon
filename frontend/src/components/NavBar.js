import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../styles.css"; // Import the CSS file

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          QueryMaster
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link
            to="/prompt"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Prompt
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
