import React from "react";
import GlobalStyles from "./GlobalStyles";
import {BrowserRouter as Router, Routes, Route, Switch} from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import CalendarView from "./Calendar/CalendarView";
import DayView from "./Day/DayView";
import WeekView from "./Week/WeekView";
import Focus from "./Focus";

function App() {
    return (
        <Router>
            <GlobalStyles/>
            <Routes>
                <Route exact path="/" element={<Homepage />}>
                    {/*<Homepage/>*/}
                </Route>
                <Route exact path="/calendar-month" element={<CalendarView />}>
                    {/*<CalendarView/>*/}
                </Route>
                <Route exact path="/date/:date" element={<DayView />}>
                    {/*<DayView/>*/}
                </Route>
                <Route exact path="/week/:date" element={<WeekView />}>
                    {/*<WeekView/>*/}
                </Route>
                <Route exact path="/focus" element={<Focus />}>
                    {/*<Focus/>*/}
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
