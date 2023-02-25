import React from "react";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FormControl, TextField, Button, CardContent } from "@material-ui/core";
import { ThemeProvider, styled } from "@material-ui/core/styles";
import { useState } from "react";
import history from "../Navigation/history";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import { useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";

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
      paddingTop: 0,
      marginTop: 0,
    },
    h3: {
      fontSize: "18px",
      fontWeight: "500",
      paddingTop: "10px",
    },
    label: {
      fontSize: "12px",
      FontFace: "Cabin",
    },
    p: {
      fontSize: "13px",
      fontFace: "Cabin",
      margin: "8px 0 0 0",
    },
    a: {
      textDecoration: "underline",
      fontSize: "12px",
      color: "blue",
      margin: 0,
      cursor: "pointer",
    },
  },
});

const styles = {
  cardStyle: {
    background: theme.palette.primary.main,
    boxShadow: "none",
    marginTop: "10px",
  },
  type: {
    fontSize: "16px",
    padding: "0",
    margin: "0 0 10px 0",
    fontWeight: "400",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    background: "white",
    padding: "15px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0px 0px 15px #d4d4d4",
    cursor: "pointer",
  },
  button: {
    width: "100px",
    height: "30px",
    border: "none",
    backgroundColor: "#bf1d1d",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    width: "20rem",
    height: "30px",
    borderRadius: "5px",
    border: "solid 1px grey",
    padding: "3px 10px",
  },
  label: {
    margin: "0px 0 5px 0",
    fontSize: "14px",
    display: "block",
    fontWeight: "500",
  },
  mainContainer: {
    padding: "2rem",
  },
  inputSection: {
    marginBottom: "15px",
  },
};

const MainGridContainer = styled(Grid)(({ theme }) => ({
  padding: "2rem",
  background: theme.palette.background.default,
  height: "100vh",
}));

const Settings = (props) => {
  const [name, setName] = React.useState("Nadia Bisek");
  const [newName, setNewName] = React.useState("");
  const [email, setEmail] = React.useState("nbisek@uwaterloo.ca");
  const [password, setPassword] = React.useState("secret123");
  const [newPassword, setNewPassword] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true);

  const [displayModal, setDisplayModal] = React.useState(false);
  const [modalBody, setModalBody] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");

  const [deleteAccount, setDeleteAccount] = React.useState("");

  //Relpace this with code that saves the new username in the database
  const saveName = () => {
    setName(newName);
    setModalTitle("Saved Successfully");
    setModalBody("Your name was changed to " + name + ".");
    setDisplayModal(true);
    setTimeout(hideModal, 4000);
  };

  const savePassword = () => {
    if (password === newPassword) {
      setPassword(newPassword);
      setNewPassword("");

      setModalTitle("Saved Successfully");
      setModalBody("Your password was changed.");
      setDisplayModal(true);
      setTimeout(hideModal, 4000);
    } else {
      setModalTitle("Error");
      setModalBody(
        "The password fields do not match up. Make sure you entered the same password twice."
      );
      setDisplayModal(true);
      setTimeout(hideModal, 5000);
    }
  };

  const hideModal = () => {
    setDisplayModal(false);
  };

  const processDeleteAccount = () => {
    if (email === deleteAccount) {
      //delete account here
      history.push("/login");
    } else {
      setModalTitle("Error");
      setModalBody("The email entered is not correct.");
      setDisplayModal(true);
      setTimeout(hideModal, 5000);
    }
  };

  useEffect(() => {
    setNewName(name);
  }, []);

  return (
    <div style={styles.mainContainer}>
      <h2 style={theme.typography.h2}>Settings</h2>
      <h3 style={theme.typography.h3}>Personal Information</h3>
      <div style={styles.inputSection}>
        <label style={styles.label}>Name</label>
        <input
          id="name"
          label="Name"
          style={styles.input}
          type="email"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <a style={theme.typography.a} onClick={() => saveName()}>
          Save name
        </a>
      </div>

      <div style={styles.inputSection}>
        <label style={styles.label}>Email</label>
        <input
          id="email"
          label="Email"
          style={styles.input}
          type="email"
          value={email}
          disabled
        />
        <br />
        <label style={theme.typography.label}>You cannot edit your email</label>
      </div>

      <div
        style={{
          display: "inline-flex",
          flexDirection: "horizontal",
        }}
      >
        <span style={{ marginRight: "20px" }}>
          <label style={styles.label}>Password</label>
          <input
            id="password"
            label="Password"
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span>
          <label style={styles.label}>Retype Password</label>
          <input
            id="newPassword"
            label="Retype Password"
            style={styles.input}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </span>
      </div>
      <div>
        <label style={theme.typography.label}>
          Retype your new password to change it.
        </label>
        <br />
        <a style={theme.typography.a} onClick={() => savePassword()}>
          Save password
        </a>
      </div>

      <h3 style={theme.typography.h3}>Delete Account</h3>
      <p style={{ marginBottom: "15px", fontSize: "14px" }}>
        Deleting you account cannot be undone. To delete your account, type in
        your email.
      </p>
      <label style={styles.label}>Email</label>
      <input
        id="delete"
        label="Email"
        style={styles.input}
        type="text"
        value={deleteAccount}
        onChange={(e) => setDeleteAccount(e.target.value)}
        placeholder={email}
      />
      <br />
      <br />
      <button style={styles.button} onClick={() => processDeleteAccount()}>
        Delete
      </button>

      {displayModal && (
        <div
          id="modal"
          style={styles.modal}
          onClick={() => setDisplayModal(false)}
        >
          <h2>{modalTitle}</h2>
          <p>{modalBody}</p>
        </div>
      )}
    </div>
  );
};

export default Settings;
