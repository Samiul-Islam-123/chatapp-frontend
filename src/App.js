import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";

//custom files
import Signup from "./AuthPages/Signup";
import Login from "./AuthPages/Login";
import Verification from "./AuthPages/Verification";
import NavBar from "./Components/NavBar";
import { Container } from "@mui/material";
import Chat from "./Chat/Chat";
import ChatMobile from "./Chat/SmallScreen/ChatMobile";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem('darkMode');
    if (localStorageData) {
      setDarkMode(JSON.parse(localStorageData));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Container>
          <Routes>
            <Route exact path="/auth/signup" element={<Signup />}></Route>
            <Route exact path="/auth/login" element={<Login />}></Route>
            <Route exact path="/auth/verification" element={<Verification />}></Route>
            <Route exact path="/" element={<Chat />} />
            <Route exact path="/chats/:id/:target" element={<ChatMobile />} />

          </Routes>
        </Container>
      </ThemeProvider>

    </>
  );
}

export default App;
