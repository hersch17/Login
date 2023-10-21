import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  fetchAdminEvents,
  getUserByUniqueID,
} from "../api";
import styled from "styled-components";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../styles/info.css";
import topLeft from "./../images/top-left.png";
import user from "./../images/user.png";

const Scanner = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: "LOADING...",
    college: "",
    userID: "",
    uniqueID: "",
    events: [],
    passes: [],
  });
  const [adminDetails, setAdminDetails] =
    useState({
      type: "",
      event: "",
      token: "",
    });
  useEffect(() => {
    const adminType =
      sessionStorage.getItem("adminType");
    const adminToken =
      sessionStorage.getItem("adminToken");
    if (adminType && adminToken) {
      if (adminType === "eventAdmin") {
        fetchAdminEvents(adminToken)
          .then((data) => {
            //console.log("data: ", data);
            setAdminDetails({
              ...adminDetails,
              event: data,
            });
          })
          .catch((err) => {
            //console.log(err);
          });
      }
      setAdminDetails({
        ...adminDetails,
        token: adminToken,
        type: adminType,
      });
    } else {
      navigate("/");
    }
  }, []);

  // const location = useLocation();
  // const type = location.state.profile.type;
  // const token = location.state.token;
  //response from api
  // let userDetails = {
  //   name: "ABC",
  //   id: "2023ABC1234",
  //   email: "2023abc1234@mnit.ac.in",
  //   phoneNumber: 1234567890,
  //   events: [
  //     {
  //       name: "Robowars",
  //       description: "Robowars",
  //     },
  //     {
  //       name: "Hackathon",
  //       description: "Hackathon",
  //     },
  //     {
  //       name: "Robowars",
  //       description: "Robowars",
  //     },
  //     {
  //       name: "Hackathon",
  //       description: "Hackathon",
  //     },
  //   ],
  //   passes: [{ name: "PassName" }],
  // };
  // const eventName = "Robowars";
  // const admin = "eventAdmin";

  const [scanResult, setScanResult] = useState();
  const handleUserChange = (
    name,
    college,
    uid,
    uniq,
    eventsList,
    passesList
  ) => {
    setUserDetails({
      ...userDetails,
      college: college,
      name: name,
      userID: uid,
      uniqueID: uniq,
      events: eventsList,
      passes: passesList,
    });
  };
  let html5QrCode;
  useEffect(() => {
    if (!html5QrCode?.getState()) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 100,
            height: 100,
          },
          fps: 5,
        }
      );
      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setScanResult(result);
        //console.log(result);
        getUserByUniqueID({ uid: result })
          .then((data) => {
            //console.log("unique data: ", data);
            handleUserChange(
              data.users[0].name,
              data.users[0].collegeName,
              data.users[0]._id,
              data.users[0].uniqueID,
              data.users[0].events,
              data.users[0].passes
            );
          })
          .catch((err) => {
            //console.log(err);
          });
      }
      function error(err) {
        //console.log(err);
      }
    }
  }, []);
  const NavUnlisted = styled.ul`
    text-decoration: none;
  `;
  const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: "blue",
    zIndex: "2",
  };
  return (
    <div className="container">
      {/* <img
        src={topLeft}
        alt="top-left-design"
        className="top-left"
      ></img>
      <div className="qr-space">
        QR SCAN THING
      </div>
      <button className="submit-btn aprv">
        APPROVED
      </button> */}
      {scanResult ? (
        <div id="main">
          {/* Success: {scanResult} */}
          <div className="USER-DETAILS">
            <img
              src={user}
              alt="user"
              className="user-img"
            ></img>
            <div
              className="user-details"
              // navigate("/studentinfo", {
              //   state: {
              //     name: userDetails.profile,
              //     college: userDetails.college,
              //     uniqueID: userDetails.uniqueID,
              //     userID: userDetails.userID,
              //     events: userDetails.events,
              //     passes: userDetails.passes,
              //   },
              // });
            >
              <div className="name">
                {userDetails.name}
              </div>
              <div className="email">
                {userDetails.college}
              </div>
              <div className="ref-id">
                #{userDetails.uniqueID}
              </div>
              <NavUnlisted>
                <Link
                  to="/studentinfo"
                  state={{
                    name: userDetails.name,
                    college: userDetails.college,
                    userID: userDetails.userID,
                    uniqueID:
                      userDetails.uniqueID,
                    events: userDetails.events,
                    passes: userDetails.passes,
                    type: adminDetails.adminType,
                  }}
                  style={linkStyle}
                >
                  Show details
                </Link>
              </NavUnlisted>
            </div>
          </div>
        </div>
      ) : (
        <div id="reader"></div>
      )}
      {/* <button onClick={() => handleScan()}>
        SCAN
      </button>
      <h1>{type}</h1>
      <div className="display-grp">
        <div className="name">
          <h3>Name</h3>
          {userDetails.name}
        </div>
      </div>
      <div className="display-grp">
        <div className="id">
          <h3>ID</h3>
          {userDetails.id}
        </div>
      </div>
      <div className="display-grp">
        <div className="id">
          <h3>Email</h3>
          {userDetails.email}
        </div>
      </div>
      <div className="display-grp">
        <div className="phoneno">
          <h3>Phone number</h3>
          {userDetails.phoneNumber}
        </div>
      </div>
      <div className="display-grp">
        <div className="events">
          <h3>Registered Events</h3>
          {type === "superAdmin"
            ? userDetails.events.map(
                (item, idx) => {
                  return (
                    <div key={item}>
                      <h4>
                        {idx + 1}. {item.name}{" "}
                        <button>MARK</button>
                      </h4>
                      <p>{item.description}</p>
                    </div>
                  );
                }
              )
            : userDetails.events
                .filter((ele) => {
                  return ele.name === eventName;
                })
                .map((item, idx) => {
                  return (
                    <div key={item}>
                      <h4>
                        {idx + 1}. {item.name}{" "}
                        <button>MARK</button>
                      </h4>
                      <p>{item.description}</p>
                    </div>
                  );
                })}
        </div>
      </div>
      <div className="display-grp">
        <div className="passes">
          <h3>Passes</h3>
          {userDetails.passes.map((item, idx) => {
            return (
              <div key={item}>
                {idx + 1}. {item.name}
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Scanner;
