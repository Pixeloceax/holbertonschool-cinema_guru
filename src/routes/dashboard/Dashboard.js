import React from "react";

import Header from "../../components/navigation/Header";

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
  return (
    <div>
      <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};

export default Dashboard;
