import { useState } from "react";

function CourseForm({ onAddCourse }) {
  const [courseName, setCourseName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!courseName.trim()) {
      return;
    }

    onAddCourse(courseName.trim());
    setCourseName("");
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Add a Course</h2>
        <p>Enter one course at a time so the planner can organize your work.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="courseName">Course name</label>
          <input
            id="courseName"
            type="text"
            placeholder="Example: Biology 101"
            value={courseName}
            required
            onChange={(event) => setCourseName(event.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Save Course
        </button>
      </form>
    </section>
  );
}

export default CourseForm;
