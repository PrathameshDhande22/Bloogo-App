import { ThemeProvider, createTheme } from "@mui/material";
import Content from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { DetectSignLogin } from "./components/DetectSignLogin";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4b54c5",
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        text: {
          fontSize: "1.3rem",
          fontFamily: "Noto Serif",
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <ThemeProvider theme={theme}>
          <DetectSignLogin>
            <Header />
          </DetectSignLogin>
          <Content />
          <DetectSignLogin>
            <Footer />
          </DetectSignLogin>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
