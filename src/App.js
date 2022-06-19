import React, { useState } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/ClaendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  console.table(getMonth());
  return (
    <React.Fragment>
      <div className="h-screen flex felx-columns">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
