import React from "react";
import "./App.css";
import { getMonth } from "./util";

const App = () => {
  console.table(getMonth(4));
  return (
    <React.Fragment>
      <div>Lets Do It</div>
    </React.Fragment>
  );
};

export default App;
