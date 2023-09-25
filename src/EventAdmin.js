import React from "react";

const EventAdmin = () => {
  //response from api
  let userDetails = {
    id: "2022ABC1234",
    phoneno: "1234567890",
    events: [
      ["event1", false],
      ["event2", false],
      ["event3", false],
      ["event4", false],
      ["event5", false],
    ],
    passes: ["pass1", "pass2"],
  };
  return (
    <div className="container">
      <div className="display-grp">
        <div className="id">
          <h4>ID</h4>
          {userDetails.id}
        </div>
      </div>
      <div className="display-grp">
        <div className="phoneno">
          <h4>Phone number</h4>
          {userDetails.phoneno}
        </div>
      </div>
      <div className="display-grp">
        <div className="events">
          <h4>Events</h4>
          {userDetails.events.map((item) => {
            return (
              <div key={item}>
                <input
                  type="checkbox"
                  value={true}
                />
                {item[0]}
              </div>
            );
          })}
        </div>
      </div>
      <div className="display-grp">
        <div className="passes">
          <h4>Passes</h4>
          {userDetails.passes.map((item) => {
            return <div key={item}>{item}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default EventAdmin;
