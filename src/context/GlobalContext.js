import dayjs from "dayjs";
import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  daySelected: dayjs(0),
  setDaySelected: () => {},
  savedEvents: [],
  dispatchCalEvent: ({ type, payload }) => {},
});

export default GlobalContext;
