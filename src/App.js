import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Login.js";
import GeneralAdmin from "./GeneralAdmin.js";
import EventAdmin from "./EventAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/generaladmin"
          element={<GeneralAdmin />}
        />
        <Route
          path="/eventadmin"
          element={<EventAdmin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
