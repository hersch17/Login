import React, { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchAdminEvents } from "../api";
import "../styles/info.css";

const StudentInfo = () => {
  const location = useLocation();
  const type = location.state.profile.type;
  const token = location.state.token;
  //response from api
  let userDetails = {
    name: "Atul",
    id: "2023ABC1234",
    email: "2023abc1234@mnit.ac.in",
    phoneNumber: 1234567890,
    events: [
      {
        name: "Robowars",
        description: "Robowars",
      },
      {
        name: "Hackathon",
        description: "Hackathon",
      },
      {
        name: "Robowars",
        description: "Robowars",
      },
      {
        name: "Hackathon",
        description: "Hackathon",
      },
    ],
    passes: [{ name: "PassName" }],
  };
  const handleScan = () => {
    fetchAdminEvents(token)
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const eventName = "Robowars";
  const admin = "eventAdmin";

  return (
    <div className="container">
      <button onClick={() => handleScan()}>
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
      </div>
    </div>
  );
};

export default StudentInfo;
