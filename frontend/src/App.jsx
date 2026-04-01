import { useState } from "react";
import AvailabilityForm from "./components/AvailabilityForm";
import CourseForm from "./components/CourseForm";
import PlannerOverview from "./components/PlannerOverview";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [availableHoursPerDay, setAvailableHoursPerDay] = useState("");

  function addCourse(courseName) {
    const newCourse = {
      id: crypto.randomUUID(),
      name: courseName,
    };

    setCourses((currentCourses) => [...currentCourses, newCourse]);
  }

  function addTask(taskData) {
    // App stores submitted form data so multiple components can reuse it.
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  function saveAvailableHours(hours) {
    setAvailableHoursPerDay(hours);
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Study Planner Setup</p>
        <h1>Smart Study Planner</h1>
        <p className="description">
          Start by entering the basic information your planner will need. These
          forms collect courses, study tasks, and the number of hours available
          each day.
        </p>
      </section>

      <div className="layout">
        <section className="forms-column">
          <CourseForm onAddCourse={addCourse} />
          <TaskForm onAddTask={addTask} />
          <AvailabilityForm
            availableHoursPerDay={availableHoursPerDay}
            onSaveAvailability={saveAvailableHours}
          />
        </section>

        <section className="summary-column">
          <PlannerOverview
            courses={courses}
            tasks={tasks}
            availableHoursPerDay={availableHoursPerDay}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
