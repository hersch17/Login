import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login.js";
import StudentInfo from "./pages/StudentInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/studentinfo"
          element={<StudentInfo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
