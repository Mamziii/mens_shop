import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes";

// components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Navbar />
      {router}
      <Footer />
    </>
  );
}

export default App;
