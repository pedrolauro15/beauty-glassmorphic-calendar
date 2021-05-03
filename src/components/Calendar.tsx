import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useCalendar } from "../contexts/calendar";
import "../styles/components/calendar.scss";

const Calendar: React.FC = () => {
  const { rows, selected, changeSelected, previousMonth, nextMonth } = useCalendar();

  return (
    <div id="Calendar">
      <header>
        <button onClick={previousMonth}>
          <FiChevronLeft />
        </button>
        <span>Abril de 2021</span>
        <button onClick={nextMonth}>
          <FiChevronRight />
        </button>
      </header>
      <table id="Calendar__table">
        <thead>
          <tr>
            <th>D</th>
            <th>S</th>
            <th>T</th>
            <th>Q</th>
            <th>Q</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((day, index) => {
                  if (day === "NOT") {
                    return <td key={index}></td>;
                  } else {
                    return (
                      <td
                        key={index}
                        onClick={() => changeSelected(day.literals)}
                        className={`${
                          day.literals === selected.date() && "selected"
                        }`}
                      >
                        {day.literals}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
