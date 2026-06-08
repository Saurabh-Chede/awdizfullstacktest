import './App.css'
import StudentsPage from './pages/StudentsPage';
import {Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import EnrollmentsPage from './pages/EnrollmentsPage';
import CoursePage from './pages/CoursePage';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex w-full gap-4">
       <Toaster position="top-right" />
      <Sidebar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/enrollments" element={<EnrollmentsPage />} />
          <Route path="/courses" element={<CoursePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
