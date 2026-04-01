import { useState } from "react";

const initialTaskForm = {
  title: "",
  subject: "",
  type: "Assignment",
  dueDate: "",
  estimatedHours: "",
  difficulty: "3",
};

function TaskForm({ onAddTask }) {
  const [taskForm, setTaskForm] = useState(initialTaskForm);

  function handleChange(event) {
    const { name, value } = event.target;

    // One change handler keeps the form code shorter and easier to follow.
    setTaskForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskForm.title.trim()) {
      return;
    }

    onAddTask({
      title: taskForm.title.trim(),
      subject: taskForm.subject.trim(),
      type: taskForm.type,
      dueDate: taskForm.dueDate,
      estimatedHours: taskForm.estimatedHours,
      difficulty: taskForm.difficulty,
    });

    setTaskForm(initialTaskForm);
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Add a Task</h2>
        <p>
          Tasks can represent assignments, exams, quizzes, or any other study
          item.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Task title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Example: Chapter 4 quiz"
            value={taskForm.title}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Example: Math"
            value={taskForm.subject}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="type">Task type</label>
          <select
            id="type"
            name="type"
            value={taskForm.type}
            onChange={handleChange}
          >
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="Quiz">Quiz</option>
            <option value="Project">Project</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={taskForm.dueDate}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="estimatedHours">Estimated study hours</label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            min="1"
            step="1"
            placeholder="Example: 4"
            value={taskForm.estimatedHours}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="difficulty">Difficulty (1 to 5)</label>
          <select
            id="difficulty"
            name="difficulty"
            value={taskForm.difficulty}
            onChange={handleChange}
          >
            <option value="1">1 - Very easy</option>
            <option value="2">2 - Easy</option>
            <option value="3">3 - Medium</option>
            <option value="4">4 - Hard</option>
            <option value="5">5 - Very hard</option>
          </select>
        </div>

        <button className="button" type="submit">
          Save Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
