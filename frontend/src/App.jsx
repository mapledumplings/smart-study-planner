import "./App.css";

function App() {
  const plannedFeatures = [
    "Add courses",
    "Add assignments and exams",
    "Set available study hours per day",
    "Generate a study schedule",
  ];

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Starter Project</p>
        <h1>Smart Study Planner</h1>
        <p className="description">
          This is the beginner-friendly starting point for a study planning app.
          The interface is intentionally simple so it is easy to grow step by
          step.
        </p>
      </section>

      <section className="card">
        <h2>Planned Features</h2>
        <ul>
          {plannedFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Current Status</h2>
        <p>
          The frontend and backend starter files are ready. No advanced planner
          features have been added yet.
        </p>
      </section>
    </main>
  );
}

export default App;

