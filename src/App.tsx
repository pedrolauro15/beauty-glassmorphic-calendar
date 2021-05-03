import "moment/locale/pt-br";
import React from "react";
import Calendar from "./components/Calendar";
import { CalendarProvider } from "./contexts/calendar";

const App: React.FC = () => {
  return (
    <CalendarProvider>
      <div id="App">
        <Calendar />
      </div>
    </CalendarProvider>
  );
};

export default App;
