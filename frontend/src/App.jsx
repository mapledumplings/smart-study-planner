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
  const plannedDays = schedule.filter((day) => day.tasks.length > 0).length;
  const totalStudyHours = tasks.reduce(
    (total, task) => total + Number(task.estimatedHours || 0),
    0
  );
  const setupProgress = [
    courses.length > 0,
    tasks.length > 0,
    Number(availableHoursPerDay) > 0,
    plannedDays > 0,
  ].filter(Boolean).length;
  const setupSteps = [
    {
      title: "Add courses",
      detail: "Create a simple list of the classes you are managing this term.",
    },
    {
      title: "Add tasks",
      detail: "Enter assignments, exams, projects, and the hours they may need.",
    },
    {
      title: "Save availability",
      detail: "Tell the planner how many study hours you realistically have each day.",
    },
    {
      title: "Generate plan",
      detail: "Get a day-by-day study schedule that spreads work before deadlines.",
    },
  ];

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
        <div className="hero-copy">
          <p className="eyebrow">Smart Study Planner</p>
          <h1>Turn a messy list of deadlines into a realistic study plan.</h1>
          <p className="description">
            This project helps students organize courses, break down upcoming
            work, and generate a day-by-day schedule based on urgency,
            difficulty, and available study time.
          </p>
          <p className="hero-note">
            The interface stays simple on purpose, but the experience is
            polished enough to feel like a finished project demo.
          </p>
        </div>

        <div className="hero-stats">
          <article className="hero-stat">
            <p className="hero-stat-label">Courses</p>
            <strong>{courses.length}</strong>
            <span>subjects tracked</span>
          </article>
          <article className="hero-stat">
            <p className="hero-stat-label">Tasks</p>
            <strong>{tasks.length}</strong>
            <span>{totalStudyHours} planned hours</span>
          </article>
          <article className="hero-stat hero-stat-accent">
            <p className="hero-stat-label">Progress</p>
            <strong>{setupProgress}/4</strong>
            <span>{plannedDays > 0 ? `${plannedDays} study days planned` : "ready for schedule generation"}</span>
          </article>
        </div>
      </section>

      <section className="card roadmap-card">
        <div className="card-header">
          <h2>Planner Workflow</h2>
          <p>Follow these steps to build a complete study plan.</p>
        </div>

        <div className="roadmap-grid">
          {setupSteps.map((step, index) => (
            <article className="roadmap-step" key={step.title}>
              <div className="step-number">0{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
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
