import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MergeTypeOutlinedIcon from "@material-ui/icons/MergeTypeOutlined";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 200,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" className="AppBar" color="inherit">
      <Toolbar>
        <div className="HeaderContainer">
          <div className="HeaderLeftContainer">
            <AssignmentTurnedInIcon color="primary" className="HeaderIcon" />
            <Typography variant="h5" color="inherit" noWrap>
              WarriorsTogether
            </Typography>
          </div>
          <div>
            <Button
              title="New Board"
              startIcon={<AddCircleOutlineIcon />}
              color="primary"
              component={Link}
              to="/mygroups"
            >
              My Groups
            </Button>
            <Button
              startIcon={<MergeTypeOutlinedIcon />}
              size="large"
              color="primary"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
            <Button
              id="github-button"
              color="primary"
              component={Link}
              to="/signup"
            >
              <GithubIcon></GithubIcon>
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

{
  /* <AppBar position="sticky" className="AppBar" color="inherit">
        <Toolbar>
          <div className="HeaderContainer">
            <div className="HeaderLeftContainer">
              <AssignmentTurnedInIcon color="primary" className="HeaderIcon" />
              <Typography variant="h5" color="inherit" noWrap>
              WarriorsTogether
              </Typography>
            </div>
            <div>
              <Button
                title="New Board"
                startIcon={<AddCircleOutlineIcon />}
                color="primary"
                component={Link} to="/mygroups"
              >
                My Groups
              </Button>
              <Button
                startIcon={<MergeTypeOutlinedIcon />}
                size="large"
                color="primary"
                component={Link} to="/signup"
              >
                Sign Up
              </Button>
              <Button id="github-button" color="primary" component={Link} to="/signup">
                <GithubIcon></GithubIcon>
              </Button>
            </div>
          </div>
        </Toolbar>
      </AppBar> */
}
