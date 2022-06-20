import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const {
    daySelected,
    setShowEventModal,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
    savedEvents,
  } = useContext(GlobalContext);

  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [time, setTime] = useState(
    selectedEvent ? selectedEvent.time : { startTime: "", endTime: "" }
  );

  const formik = useFormik({
    initialValues: {
      title: selectedEvent ? selectedEvent.title : "",
      description: selectedEvent ? selectedEvent.description : "",
    },
    onSubmit: (values) => {
      const calendarEvent = {
        title: values.title,
        description: values.description,
        time: time,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };

      const events = savedEvents.filter(
        (evt) =>
          dayjs(evt.day).format("DD-MM-YY") ===
          dayjs(calendarEvent.day).format("DD-MM-YY")
      );

      let flag = 0;
      const timeObj = calendarEvent.time;
      for (let i = 0; i < events.length; i++) {
        if (
          !(
            timeObj.endTime < events[i].time.startTime ||
            timeObj.startTime > events[i].time.endTime
          )
        ) {
          flag = 1;
        }
      }

      if (flag) {
        alert("Event is Overlapping, please choose another time");
        return;
      }

      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
        console.log("Aman");
      }
      setShowEventModal(false);
    },
  });

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg shadow-2xl w-1/4"
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setSelectedEvent(null);
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={formik.values.title}
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
              onChange={formik.handleChange}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <div></div>
            <div className="flex flex-rows gap-x-4">
              <span>
                <label className="text-gray-400">Start Time</label>
                <input
                  type="time"
                  name="Time"
                  value={time.startTime}
                  className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
                  onChange={(e) => {
                    setTime({ ...time, startTime: e.target.value });
                  }}
                />
              </span>

              <span>
                <label className="text-gray-400">End Time</label>
                <input
                  type="time"
                  name="Time"
                  placeholder="Add Time"
                  value={time.endTime}
                  className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
                  onChange={(e) =>
                    setTime({ ...time, endTime: e.target.value })
                  }
                />
              </span>
            </div>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={formik.values.description}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500 "
              onChange={formik.handleChange}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((x, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(x)}
                  className={`bg-${x}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === x && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
