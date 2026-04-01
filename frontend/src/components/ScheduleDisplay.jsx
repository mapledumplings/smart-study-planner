function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ScheduleDisplay({
  schedule,
  unscheduledTasks,
  isGeneratingSchedule,
  scheduleError,
  onGenerateSchedule,
}) {
  const studyDays = schedule.filter((day) => day.tasks.length > 0);
  const totalScheduledHours = studyDays.reduce(
    (total, day) => total + Number(day.totalHours || 0),
    0
  );

  return (
    <section className="card">
      <div className="card-header">
        <h2>Study Schedule</h2>
        <p>Generate a simple day-by-day plan from the tasks you have entered.</p>
      </div>

      <div className="schedule-toolbar">
        <button
          className="button"
          type="button"
          disabled={isGeneratingSchedule}
          onClick={onGenerateSchedule}
        >
          {isGeneratingSchedule ? "Generating..." : "Generate Schedule"}
        </button>
        <p className="helper-text">
          The planner will spread work across days and prioritize urgent, harder
          tasks first.
        </p>
      </div>

      {scheduleError ? <p className="error-message">{scheduleError}</p> : null}

      {studyDays.length === 0 ? (
        <div className="schedule-empty">
          <p className="empty-state">
            No schedule yet. Add tasks, save your daily study hours, and
            generate a plan.
          </p>
        </div>
      ) : (
        <>
          <div className="schedule-summary">
            <div className="summary-chip">
              <strong>{studyDays.length}</strong>
              <span>study days</span>
            </div>
            <div className="summary-chip">
              <strong>{totalScheduledHours}</strong>
              <span>hours scheduled</span>
            </div>
            <div className="summary-chip">
              <strong>{unscheduledTasks.length}</strong>
              <span>items still short on time</span>
            </div>
          </div>

          <div className="schedule-list">
            {studyDays.map((day) => (
              <article className="day-plan" key={day.date}>
                <div className="day-plan-header">
                  <h3>{formatDate(day.date)}</h3>
                  <span className="hours-badge">{day.totalHours} hours</span>
                </div>

                <div className="schedule-rows">
                  {day.tasks.map((task) => (
                    <div
                      className="schedule-row"
                      key={`${day.date}-${task.subject}-${task.title}`}
                    >
                      <div className="schedule-main">
                        <p className="schedule-subject">{task.subject}</p>
                        <p className="schedule-title">{task.title}</p>
                      </div>
                      <p className="schedule-hours">{task.hours} hrs</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {unscheduledTasks.length > 0 ? (
        <div className="warning-box">
          <h3>Needs More Time</h3>
          <ul className="overview-list">
            {unscheduledTasks.map((task) => (
              <li className="overview-item" key={`${task.subject}-${task.title}`}>
                <strong>{task.title}</strong>
                <p className="helper-text">Subject: {task.subject}</p>
                <p className="helper-text">
                  Hours still needed: {task.hoursRemaining}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default ScheduleDisplay;
