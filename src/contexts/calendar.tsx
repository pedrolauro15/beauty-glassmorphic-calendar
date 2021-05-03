/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import React from "react";
import produce from "immer";
import moment from "moment";
import { Day } from "../models/day.model";

interface CalendarContextData {
  previousMonth: () => void;
  nextMonth: () => void;
  currentMonth: {};
  rows: Array<Day[]>;
  selected: moment.Moment;
  changeSelected: (day: number) => void;
}

const CalendarContext = React.createContext({} as CalendarContextData);

export const CalendarProvider: React.FC = ({ children }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const [selected, setSelected] = React.useState(moment());
  const [rows, setRows] = React.useState<Array<Day[]>>([]);
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysOfMonth = React.useCallback(() => {
    const newArr = produce(rows, (draft) => {
      setRows([]);
      const today = moment(new Date(currentYear, currentMonth, 1));
      const daysInMonth = moment(today).daysInMonth();
      let buildedDate = moment(`${today.year()}-${today.month() + 1}-01`);
      let currentRow: Day[] = [];
      let extraDays = 0;
      for (let i = 0; i < daysInMonth + extraDays; i++) {
        const weekday = buildedDate.weekday();
        //write code
        const position = i % 7;
        if (currentRow.length !== weekday) {
          currentRow[position] = "NOT";
          extraDays += 1;
        } else {
          const day: Day = {
            date: buildedDate,
            literals: buildedDate.date(),
            weekday,
          };
          buildedDate = buildedDate.add(1, "days");
          currentRow[position] = day;
        }

        if (currentRow.length === 7 || i === daysInMonth + extraDays - 1) {
          draft = [...draft, currentRow];
          currentRow = [];
        }
      }
      return draft;
    });
    setRows(newArr);
  }, [currentMonth, currentYear, rows]);

  const changeSelected = (day: number) => {
    const newSelected = moment(`${selected.year()}-${selected.month()}-${day}`);
    setSelected(newSelected);
  };

  React.useEffect(() => {
    setRows([]);
    getDaysOfMonth();
    return () => {
      setRows([]);
    };
  }, [currentMonth]);

  return (
    <CalendarContext.Provider
      value={{
        currentMonth,
        rows,
        previousMonth,
        nextMonth,
        selected,
        changeSelected,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => React.useContext(CalendarContext);
