import React, {
  useEffect,
  useState,
} from "react";
import Select from "react-select";
import {
  useNavigate,
  //Link,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  toast,
  ToastContainer,
} from "react-toastify";

import "../styles/login.css";
import { loginRegister } from "../api";

const toastStyle = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};
const Login = () => {
  return (
    <div className="container">
      <EventAdminForm />
    </div>
  );
};

const EventAdminForm = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [eventAdminForm, setEventAdminForm] =
    useState({
      email: "",
      password: "",
      remember: false,
    });
  const [admin, setAdmin] = useState("");
  function handleSubmit() {
    //formData.isRegistration = false;
    //event.preventDefault();
    loginRegister(eventAdminForm)
      .then((data) => {
        if (data.profile.type === "participant") {
          toast.error("Not an Admin", toastStyle);
        } else if (
          data.profile.type !== "eventAdmin" &&
          admin === "eventAdmin"
        ) {
          toast.error(
            "Not an Event Admin",
            toastStyle
          );
        } else if (
          data.profile.type !== "superAdmin" &&
          admin === "superAdmin"
        ) {
          toast.error(
            "Not a Super Admin",
            toastStyle
          );
        } else if (
          data.profile.type !== "generalAdmin" &&
          admin === "generalAdmin"
        ) {
          toast.error(
            "Not a General Admin",
            toastStyle
          );
        } else {
          sessionStorage.setItem("login", true);
          toast.info("Success", toastStyle);
          setTimeout(() => {
            console.log(data.profile.type);
            navigate("/scanner", {
              state: {
                profile: data.profile,
                token: data.token,
              },
            });
          }, 1000);
        }
      })
      .catch((err) => {
        toast.error(err, toastStyle);
      });
  }

  function onChange(event) {
    const { name, value } = event.target;
    setEventAdminForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const options = [
    { value: "superAdmin", label: "Super Admin" },
    { value: "eventAdmin", label: "Event Admin" },
    {
      value: "generalAdmin",
      label: "General Admin",
    },
  ];
  const selectChange = (value) => {
    setAdmin(value.value);
  };
  return (
    <div className="admin-form">
      <div className="select">
        <Select
          options={options}
          onChange={(value) => {
            selectChange(value);
          }}
          placeholder="Designation"
          styles={{
            container: (styles) => ({
              ...styles,
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#2d2d2d",
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "#757575",
              textIndent: "10px",
            }),
            option: (style, state) => ({
              ...style,
              backgroundColor: state.isFocused
                ? "#2d2d2d"
                : "#2d2d2d",
              backgroundColor: state.isSelected
                ? "#a9a9a9"
                : "#2d2d2d",
              color: "#757575",
            }),
            placeholder: (styles) => ({
              ...styles,
              color: "#757575",
              textIndent: "10px",
            }),
          }}
        />
      </div>

      {/* <div className="login-form-input-grp">
        <label className="login-form-text-label">
          ID *
        </label>
        <input
          className="login-form-text-inputs"
          name="id"
          autoFocus
          type="text"
          value={eventAdminForm.id}
          onChange={(e) => onChange(e)}
        />
      </div> */}
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          User ID:
        </label>
        <input
          className="login-form-text-inputs"
          name="email"
          type="email"
          value={eventAdminForm.email}
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="login-form-input-grp">
        <label className="login-form-text-label">
          Password:
        </label>
        <input
          className="login-form-text-inputs"
          name="password"
          type="password"
          value={eventAdminForm.password}
          onChange={(e) => onChange(e)}
        />
      </div>
      <button
        className="submit-btn"
        onClick={handleSubmit}
      >
        Login
      </button>
      <ToastContainer />
    </div>
  );
};

export default Login;
