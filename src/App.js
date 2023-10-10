import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login.js";
import Scanner from "./pages/Scanner";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegisteredEvents from "./pages/RegisteredEvents";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/scanner"
            element={<Scanner />}
          />
        </Route>
        <Route path="/" element={<Login />} />
        <Route
          path="/studentinfo"
          element={<RegisteredEvents />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
