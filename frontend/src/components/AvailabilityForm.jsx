import { useState } from "react";

function AvailabilityForm({ availableHoursPerDay, onSaveAvailability }) {
  const [hoursPerDay, setHoursPerDay] = useState(availableHoursPerDay);

  function handleSubmit(event) {
    event.preventDefault();
    onSaveAvailability(hoursPerDay);
  }

  return (
    <section className="card">
      <div className="card-header">
        <h2>Daily Study Hours</h2>
        <p>Set how many hours are usually available for studying each day.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="hoursPerDay">Available hours per day</label>
          <input
            id="hoursPerDay"
            type="number"
            min="0.5"
            step="0.5"
            placeholder="Example: 2"
            value={hoursPerDay}
            required
            onChange={(event) => setHoursPerDay(event.target.value)}
          />
          <p className="helper-text">
            Use the amount of time you can usually commit on a normal day.
          </p>
        </div>

        <button className="button" type="submit">
          Save Availability
        </button>
      </form>
    </section>
  );
}

export default AvailabilityForm;
