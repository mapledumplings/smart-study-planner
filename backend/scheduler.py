from __future__ import annotations

from copy import deepcopy
from dataclasses import dataclass
from datetime import date, datetime, timedelta


@dataclass
class StudyTask:
    title: str
    subject: str
    due_date: date
    estimated_hours: float
    difficulty: int
    remaining_hours: float


def parse_date(value: str) -> date:
    """Convert a YYYY-MM-DD string into a date object."""
    return datetime.strptime(value, "%Y-%m-%d").date()


def normalize_tasks(tasks: list[dict]) -> list[StudyTask]:
    normalized_tasks = []

    for task in tasks:
        estimated_hours = float(task["estimatedHours"])
        difficulty = int(task["difficulty"])

        normalized_tasks.append(
            StudyTask(
                title=task["title"].strip(),
                subject=task["subject"].strip(),
                due_date=parse_date(task["dueDate"]),
                estimated_hours=estimated_hours,
                difficulty=difficulty,
                remaining_hours=estimated_hours,
            )
        )

    return normalized_tasks


def round_hours(hours: float) -> float:
    """Keep hour values easy to read in the final schedule."""
    return round(hours, 2)


def create_day_entry(current_day: date) -> dict:
    return {
        "date": current_day.isoformat(),
        "tasks": [],
        "totalHours": 0,
    }


def sort_tasks_for_day(tasks: list[StudyTask], current_day: date) -> list[StudyTask]:
    """Sort by urgency first, then difficulty, then total size."""
    return sorted(
        tasks,
        key=lambda task: (
            (task.due_date - current_day).days,
            -task.difficulty,
            -task.remaining_hours,
        ),
    )


def add_hours_to_day(day_plan: dict, task: StudyTask, hours: float) -> float:
    scheduled_hours = round_hours(min(hours, task.remaining_hours))

    if scheduled_hours <= 0:
        return 0

    existing_task = next(
        (
            item
            for item in day_plan["tasks"]
            if item["title"] == task.title and item["subject"] == task.subject
        ),
        None,
    )

    if existing_task:
        existing_task["hours"] = round_hours(existing_task["hours"] + scheduled_hours)
    else:
        day_plan["tasks"].append(
            {
                "title": task.title,
                "subject": task.subject,
                "hours": scheduled_hours,
                "difficulty": task.difficulty,
                "dueDate": task.due_date.isoformat(),
            }
        )

    day_plan["totalHours"] = round_hours(day_plan["totalHours"] + scheduled_hours)
    task.remaining_hours = round_hours(task.remaining_hours - scheduled_hours)
    return scheduled_hours


def distribute_fair_share(
    active_tasks: list[StudyTask], current_day: date, remaining_day_hours: float, day_plan: dict
) -> float:
    """
    Give each active task a fair chunk of time based on hours left and days left.

    This first pass is what naturally splits larger tasks across multiple days.
    """
    for task in active_tasks:
        if remaining_day_hours <= 0:
            break

        days_left = max(1, (task.due_date - current_day).days + 1)
        suggested_hours = task.remaining_hours / days_left
        hours_scheduled = add_hours_to_day(
            day_plan, task, min(suggested_hours, remaining_day_hours)
        )
        remaining_day_hours = round_hours(remaining_day_hours - hours_scheduled)

    return remaining_day_hours


def use_extra_time(
    active_tasks: list[StudyTask], remaining_day_hours: float, day_plan: dict
) -> float:
    """
    If a day still has open hours, spend them on the highest-priority tasks first.
    """
    for task in active_tasks:
        if remaining_day_hours <= 0:
            break

        if task.remaining_hours <= 0:
            continue

        hours_scheduled = add_hours_to_day(day_plan, task, remaining_day_hours)
        remaining_day_hours = round_hours(remaining_day_hours - hours_scheduled)

    return remaining_day_hours


def generate_study_schedule(
    tasks: list[dict], available_hours_per_day: float, start_date: str | None = None
) -> dict:
    """
    Build a day-by-day study plan.

    Strategy:
    1. Sort active tasks by urgency and difficulty for each day.
    2. Give each active task a fair daily share so large tasks get split up.
    3. Use any remaining daily time on the most urgent and difficult tasks.
    """
    if not tasks:
        return {"schedule": [], "unscheduledTasks": []}

    if available_hours_per_day <= 0:
        raise ValueError("Available study hours per day must be greater than 0.")

    normalized_tasks = normalize_tasks(deepcopy(tasks))
    current_day = parse_date(start_date) if start_date else date.today()
    final_due_date = max(task.due_date for task in normalized_tasks)
    schedule = []

    while current_day <= final_due_date:
        day_plan = create_day_entry(current_day)
        active_tasks = [
            task
            for task in normalized_tasks
            if task.remaining_hours > 0 and task.due_date >= current_day
        ]

        if active_tasks:
            sorted_tasks = sort_tasks_for_day(active_tasks, current_day)
            remaining_day_hours = round_hours(float(available_hours_per_day))
            remaining_day_hours = distribute_fair_share(
                sorted_tasks, current_day, remaining_day_hours, day_plan
            )
            use_extra_time(sorted_tasks, remaining_day_hours, day_plan)

        schedule.append(day_plan)
        current_day += timedelta(days=1)

    unscheduled_tasks = [
        {
            "title": task.title,
            "subject": task.subject,
            "hoursRemaining": round_hours(task.remaining_hours),
            "dueDate": task.due_date.isoformat(),
        }
        for task in normalized_tasks
        if task.remaining_hours > 0
    ]

    return {
        "schedule": schedule,
        "unscheduledTasks": unscheduled_tasks,
    }
