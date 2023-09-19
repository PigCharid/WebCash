import { useGlobalContext } from "./context";
import { Routes, Route } from "react-router-dom";
import bg from "./assets/images/bg.png";
import Nav from "./components/nav.tsx";
import Footer from "./components/footer";
import AirDrop from "./pages/AirDrop";
import Home from "./pages/Home";
import PreSale from "./pages/PreSale";
import Introduction from "./pages/Introduction";
import Earn from "./pages/Earn";
import Ecology from "./pages/Ecology";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

function App() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);
  const { showAlert, showLoading } = useGlobalContext();
  const [visible, setVisible] = useState(false);

  return (
    <div className="App ">
      {showAlert?.status && (
        <Alert
          state={showAlert.status}
          type={showAlert.type}
          message={showAlert.message}
        />
      )}
      {showLoading?.status && (
        <Loading state={showLoading.status} message={showLoading.message} />
      )}
      <Nav isActive={isActive} setIsActive={setIsActive} />
      <Routes>
        <Route element={<Home setIsActive={setIsActive} />} path="/"></Route>
        <Route element={<Introduction />} path="/introduction"></Route>
        <Route element={<Earn setIsActive={setIsActive} />} path="/earn"></Route>
        <Route element={<Ecology />} path="/ecology"></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
