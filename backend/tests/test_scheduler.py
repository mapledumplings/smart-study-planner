import unittest

from scheduler import generate_study_schedule


class SchedulerTests(unittest.TestCase):
    def test_schedule_prioritizes_urgent_and_difficult_tasks(self):
        tasks = [
            {
                "title": "Math Exam Review",
                "subject": "Math",
                "dueDate": "2026-04-03",
                "estimatedHours": 4,
                "difficulty": 5,
            },
            {
                "title": "History Essay",
                "subject": "History",
                "dueDate": "2026-04-05",
                "estimatedHours": 3,
                "difficulty": 2,
            },
        ]

        result = generate_study_schedule(
            tasks=tasks,
            available_hours_per_day=2,
            start_date="2026-04-01",
        )

        first_day_tasks = result["schedule"][0]["tasks"]

        self.assertEqual(first_day_tasks[0]["title"], "Math Exam Review")
        self.assertGreater(first_day_tasks[0]["hours"], 0)

    def test_large_tasks_are_split_across_multiple_days(self):
        tasks = [
            {
                "title": "Biology Final",
                "subject": "Biology",
                "dueDate": "2026-04-04",
                "estimatedHours": 6,
                "difficulty": 4,
            }
        ]

        result = generate_study_schedule(
            tasks=tasks,
            available_hours_per_day=2,
            start_date="2026-04-01",
        )

        days_with_work = [day for day in result["schedule"] if day["tasks"]]

        self.assertGreaterEqual(len(days_with_work), 3)
        self.assertEqual(result["unscheduledTasks"], [])

    def test_unscheduled_tasks_are_reported_when_time_runs_out(self):
        tasks = [
            {
                "title": "Chemistry Exam",
                "subject": "Chemistry",
                "dueDate": "2026-04-02",
                "estimatedHours": 10,
                "difficulty": 5,
            }
        ]

        result = generate_study_schedule(
            tasks=tasks,
            available_hours_per_day=2,
            start_date="2026-04-01",
        )

        self.assertEqual(len(result["unscheduledTasks"]), 1)
        self.assertEqual(result["unscheduledTasks"][0]["title"], "Chemistry Exam")


if __name__ == "__main__":
    unittest.main()
