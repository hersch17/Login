import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import "../styles/info.css";
import {
  getAttendanceStatus,
  markAttendance,
} from "../api";
import {
  ToastContainer,
  toast,
} from "react-toastify";

const RegisteredEvents = () => {
  const [eventsList, setEventsList] = useState(
    []
  );
  const location = useLocation();
  const {
    name,
    college,
    userID,
    uniqueID,
    events,
    passes,
    type,
  } = location.state;
  console.log(
    name,
    college,
    userID,
    uniqueID,
    events,
    passes,
    type
  );
  //response from api
  let userDetails = {
    name: name,
    id: "2023ABC1234",
    email: "2023abc1234@mnit.ac.in",
    phoneNumber: 1234567890,
    events: [
      {
        name: "Minute to pitch it",
        eventID: "65049911b7743f92c6804363",
        description: "Minute to pitch it",
      },
      {
        name: "Hackathon",
        eventID: "65049911b7743f92c6804363",
        description: "Hackathon",
      },
      {
        name: "Robowars",
        eventID: "65049911b7743f92c6804363",
        description: "Robowars",
      },
      {
        name: "Treasure Hunt",
        eventID: "65049911b7743f92c6804363",
        description: "Trasure Hunt",
      },
    ],
    passes: [{ name: "PassName" }],
  };
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

  function mark() {
    markAttendance({
      eventID: "65049911b7743f92c6804363",
      userID: "651736574c766ff1865a8a68",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [content, setContent] = useState(false);

  useEffect(() => {
    let list = [];

    if (type === "superAdmin") {
      events.map((item, idx) => {
        list.push({
          eventID: item.eventID,
          name: item.name,
          userID: userID,
          attendance: getAttendanceStatus({
            eventID: item.eventID,
            userID: userID,
          })
            .then((data) => {
              //console.log(name, data.status);
              return data.status;
            })
            .catch((err) => {
              toast.error(
                "Sorry, couldn't find event.",
                toastStyle
              );
            }),
        });
      });
    } else if (type === "eventAdmin") {
      userDetails.events
        .filter((ele) => {
          //FIX IT!!!!
          return ele.name === "Robowars";
        })
        .map((item, idx) => {
          list.push({
            eventID: item.eventID,
            name: item.name,
            userID: userID,
          });
        });
    }
    setEventsList(list);
    setContent(true);
  }, []);
  return (
    <div>
      <Link to="/scanner">Scan again</Link>
      {/* <div>{details.name}</div> */}
      {content && (
        <div className="display-grp">
          <div className="events">
            <h3>Registered Events</h3>

            {eventsList.map((item, id) => {
              return (
                <div key={item}>
                  <h4>
                    {id + 1}. {item.name}
                    <button onClick={mark}>
                      {item.attendance
                        ? "MARK"
                        : "Already marked"}
                    </button>
                  </h4>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
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
      <ToastContainer />
    </div>
  );
};

export default RegisteredEvents;
