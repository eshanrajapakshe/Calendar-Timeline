import { Calendar } from "./components/molecules/Calendar";
import { timelineData } from "./data";
import { CalendarViewTypes } from "./models/enum";
import 'remixicon/fonts/remixicon.css';
import "./App.css";
import "./styles/global.scss";

function App() {
  return (
    <Calendar
      calendarData={timelineData}
      calendarViewType={CalendarViewTypes.WEEK}
    />
  );
}

export default App;
