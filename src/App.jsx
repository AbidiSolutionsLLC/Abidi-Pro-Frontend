import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar";
import ThemeSelector from "./Pages/ThemeSelector";
import PeopleLayout from "./Pages/People/PeopleLayout";
import Home from "./Pages/People/Home";
import TimeTracker from "./Pages/People/TimeTracker";
import Files from "./Pages/People/files/Files";
import Profile from "./Pages/People/profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/theme-selector" element={<ThemeSelector />} />

        <Route path="/people/*" element={<PeopleLayout />}>
          <Route index element={<Home />} />
          <Route path="timetracker" element={<TimeTracker />} />
          <Route path="files" element={<Files />} />
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
