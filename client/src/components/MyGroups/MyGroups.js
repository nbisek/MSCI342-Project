import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import GroupDisplay from "./GroupDisplay";

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#DEDEDE",
      black: "#000000",
    },
    secondary: {
      main: "#68709c",
    },
  },
  typography: {
    h1: {
      fontSize: "35px",
      margin: "auto",
      textAlign: "center",
      fontWeight: "600",
      paddingTop: "200px",
    },
    h2: {
      fontSize: "25px",
      fontWeight: "400",
    },
    h6: {
      fontSize: "16px",
      margin: "auto",
      textAlign: "center",
      fontWeight: "400",
      paddingTop: "10px",
    },
  },
});

const MainGridContainer = styled(Grid)(({ theme }) => ({
  padding: "1rem",
  background: theme.palette.background.default,
  height: "100vh",
}));

const clubs = [
  {
    title: "Loded Diper",
    description: "A cool band for even cooler guyz",
    type: "music",
    members: "4",
  },
  {
    title: "Cheese Club",
    description: "We like cheese, so we meet and eat it weekly.",
    type: "food",
    members: "25",
  },
];

//When the page loads for the first time
// useEffect(() => {}, []);

const MyGroups = () => {
  const [sortBy, setSortBy] = React.useState("");

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MainGridContainer
          container
          spacing={0}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} m={2}>
            <h2 style={theme.typography.h2}>My Groups</h2>
            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Select"
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "100px" }}
            >
              <MenuItem value={10}>Group 1</MenuItem>
              <MenuItem value={20}>Group 2</MenuItem>
              <MenuItem value={30}>Group 3</MenuItem>
            </Select>
            {clubs.map((club) => {
              return (
                <GroupDisplay
                  title={club.title}
                  description={club.description}
                  type={club.type}
                  members={club.members}
                />
              );
            })}
          </Grid>
        </MainGridContainer>
      </ThemeProvider>
    </div>
  );
};

export default MyGroups;
