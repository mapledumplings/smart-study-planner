import { useState } from "react";
import AvailabilityForm from "./components/AvailabilityForm";
import CourseForm from "./components/CourseForm";
import PlannerOverview from "./components/PlannerOverview";
import ScheduleDisplay from "./components/ScheduleDisplay";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [availableHoursPerDay, setAvailableHoursPerDay] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [unscheduledTasks, setUnscheduledTasks] = useState([]);
  const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false);
  const [scheduleError, setScheduleError] = useState("");

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

  async function generateSchedule() {
    if (tasks.length === 0) {
      setScheduleError("Add at least one task before generating a schedule.");
      setSchedule([]);
      setUnscheduledTasks([]);
      return;
    }

    if (!availableHoursPerDay) {
      setScheduleError("Save your available study hours per day first.");
      setSchedule([]);
      setUnscheduledTasks([]);
      return;
    }

    setIsGeneratingSchedule(true);
    setScheduleError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks,
          availableHoursPerDay,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate the schedule.");
      }

      setSchedule(data.schedule);
      setUnscheduledTasks(data.unscheduledTasks);
    } catch (error) {
      setScheduleError(error.message);
      setSchedule([]);
      setUnscheduledTasks([]);
    } finally {
      setIsGeneratingSchedule(false);
    }
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
          <ScheduleDisplay
            schedule={schedule}
            unscheduledTasks={unscheduledTasks}
            isGeneratingSchedule={isGeneratingSchedule}
            scheduleError={scheduleError}
            onGenerateSchedule={generateSchedule}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
