function PlannerOverview({ courses, tasks, availableHoursPerDay }) {
  const totalEstimatedHours = tasks.reduce(
    (total, task) => total + Number(task.estimatedHours || 0),
    0
  );

  return (
    <section className="card">
      <div className="card-header">
        <h2>Planner Snapshot</h2>
        <p>This sidebar updates as you build the planner.</p>
      </div>

      <div className="form-grid">
        <div className="summary-band">
          <div className="summary-chip">
            <strong>{courses.length}</strong>
            <span>courses</span>
          </div>
          <div className="summary-chip">
            <strong>{tasks.length}</strong>
            <span>tasks</span>
          </div>
          <div className="summary-chip">
            <strong>{totalEstimatedHours}</strong>
            <span>study hours</span>
          </div>
        </div>

        <div>
          <h3>Courses</h3>
          {courses.length === 0 ? (
            <p className="empty-state">No courses added yet.</p>
          ) : (
            <ul className="overview-list">
              {courses.map((course) => (
                <li className="overview-item" key={course.id}>
                  <strong>{course.name}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3>Tasks</h3>
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks added yet.</p>
          ) : (
            <ul className="overview-list">
              {tasks.map((task) => (
                <li className="overview-item" key={task.id}>
                  <strong>{task.title}</strong>
                  <span className="overview-label">{task.type}</span>
                  <p className="helper-text">Subject: {task.subject || "Not set"}</p>
                  <p className="helper-text">Due date: {task.dueDate || "Not set"}</p>
                  <p className="helper-text">
                    Study hours: {task.estimatedHours || "Not set"}
                  </p>
                  <p className="helper-text">Difficulty: {task.difficulty}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3>Available Hours Per Day</h3>
          <p className="overview-item">
            {availableHoursPerDay
              ? `${availableHoursPerDay} hours available each day`
              : "No daily study hours saved yet."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PlannerOverview;
