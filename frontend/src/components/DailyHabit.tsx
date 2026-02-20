import { useState, useMemo, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import "./DailyHabit.css";
import { API_URL } from "../config";

// Register Line chart components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

interface Habit {
  _id: string;
  name: string;
  startDate: string;
  days: string[];
}

const DailyHabit = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    fetch(`${API_URL}/api/habits`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch habits");
        }
        return res.json();
      })
      .then((data: Habit[]) => setHabits(data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  const [newHabitName, setNewHabitName] = useState("");

  const today = new Date();
  // const todayStr = [
  //   today.getFullYear(),
  //   String(today.getMonth() + 1).padStart(2, "0"),
  //   String(today.getDate()).padStart(2, "0"),
  // ].join("-");

  const currentDay = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - currentDay);

  const weekDates = Array.from({ length: 21 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);

    const dateStr = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0"),
    ].join("-");

    return {
      dateStr,
      day: date.getDate(),
      dayShort: date.toLocaleString("default", { weekday: "short" }),
    };
  });

  const handleCheckChange = async (
    dateStr: string,
    habitId: string,
    habitIndex: number,
  ) => {
    const token = localStorage.getItem("token"); // Get JWT token

    try {
      const res = await fetch(`${API_URL}/api/habits/${habitId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT
        },
        body: JSON.stringify({ date: dateStr }),
      });

      if (!res.ok) {
        console.error("Error updating habit:", res.status, res.statusText);
        return;
      }
      const updatedHabits = [...habits];

      if (!updatedHabits[habitIndex].days.includes(dateStr)) {
        updatedHabits[habitIndex].days.push(dateStr);
      } else {
        updatedHabits[habitIndex].days = updatedHabits[habitIndex].days.filter(
          (d: string) => d !== dateStr,
        );
      }

      setHabits(updatedHabits);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
    console.log("Toggling habit:", habitId, "for date:", dateStr);
  };

  const handleAddHabit = async () => {
    if (newHabitName.trim() === "") {
      alert("Please enter habit name");
      return;
    }

    // const startDate = new Date();
    // const startDateStr = [
    //   startDate.getFullYear(),
    //   String(startDate.getMonth() + 1).padStart(2, "0"),
    //   String(startDate.getDate()).padStart(2, "0"),
    // ].join("-");

    const token = localStorage.getItem("token"); // Get JWT token
    console.log(token);

    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send JWT
        },
        body: JSON.stringify({
          name: newHabitName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add habit");
        return;
      }

      // Update local state with the new habit returned from backend
      setHabits([...habits, data]);
      setNewHabitName("");
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Server error while adding habit");
    }
  };

  // LINE GRAPH DATA
  const lineData = useMemo(() => {
    return {
      labels: weekDates.map((d) => d.dayShort),
      datasets: [
        {
          label: "Habits Completed",
          data: weekDates.map((date) =>
            habits.reduce(
              (count, habit) =>
                habit.days.includes(date.dateStr) ? count + 1 : count,
              0,
            ),
          ),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };
  }, [habits, weekDates]);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };
  const dailyCompletion = weekDates.map((date) => {
    const totalHabits = habits.length;

    const completedCount = habits.reduce(
      (count, habit) => (habit.days.includes(date.dateStr) ? count + 1 : count),
      0,
    );

    const percentage =
      totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100);

    return {
      dateStr: date.dateStr,
      dayShort: date.dayShort,
      percentage,
      completedCount,
      notDone: totalHabits - completedCount,
    };
  });

  return (
    <>
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-6">
            <h1>
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="mb-3 p-3 border rounded">
          <h5>Add New Habit</h5>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Habit name"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={handleAddHabit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center h1" rowSpan={3}>
                    Habit
                  </th>
                  <th colSpan={7} className="text-center text-muted">
                    Week 1
                  </th>
                  <th colSpan={7} className="text-center text-muted">
                    Week 2
                  </th>
                  <th colSpan={7} className="text-center text-muted">
                    Week 3
                  </th>
                  <th
                    rowSpan={3}
                    style={{ minWidth: "200px" }}
                    className="text-center h1"
                  >
                    Progress
                  </th>
                </tr>
                <tr>
                  {weekDates.map((date, index) => (
                    <th
                      key={index}
                      className="text-center p-0 text-muted dailytask-td"
                    >
                      {date.dayShort}
                    </th>
                  ))}
                </tr>
                <tr>
                  {weekDates.map((date, index) => (
                    <th key={index} className="text-center p-0 dailytask-td">
                      {date.day}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {habits.map((habit, habitIndex) => {
                  const completed = habit.days.length;
                  const percentage = (completed / weekDates.length) * 100;

                  return (
                    <tr key={habitIndex}>
                      <td
                        className="text-break"
                        style={{ minWidth: "250px", maxWidth: "320px" }}
                      >
                        {habit.name}
                      </td>

                      {weekDates.map((date, index) => (
                        <td
                          key={index}
                          className="text-center p-0 align-middle dailytask-td"
                        >
                          <input
                            className="input p-0 dailytask-ticker"
                            type="checkbox"
                            checked={habit.days.includes(date.dateStr)}
                            disabled={habit.startDate > date.dateStr}
                            onChange={() =>
                              handleCheckChange(
                                date.dateStr,
                                habit._id,
                                habitIndex,
                              )
                            }
                          />
                        </td>
                      ))}

                      <td>
                        <div className="progress" style={{ height: "15px" }}>
                          <div
                            className={`progress-bar ${
                              percentage === 100
                                ? "bg-success"
                                : percentage >= 50
                                  ? "bg-primary"
                                  : "bg-danger"
                            }`}
                            style={{ width: `${percentage}%` }}
                          >
                            {completed}/{weekDates.length}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ border: "0px" }}>
                  <td colSpan={23} style={{ border: "0px" }}></td>
                </tr>
                <tr>
                  <th>Progress</th>
                  {dailyCompletion.map((day, index) => (
                    <th
                      className="text-center"
                      key={index}
                      style={{ border: "0px" }}
                    >
                      <span className="text-primary fw-bold">
                        {day.percentage}%
                      </span>
                    </th>
                  ))}
                  <th rowSpan={3}></th>
                </tr>
                <tr>
                  <th>Done</th>
                  {dailyCompletion.map((day, index) => (
                    <td
                      key={index}
                      className="text-center text-success fw-bold"
                      style={{ border: "0px" }}
                    >
                      {day.completedCount}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th>Not Done</th>
                  {dailyCompletion.map((day, index) => (
                    <td
                      key={index}
                      className="text-center text-danger fw-bold"
                      style={{ border: "0px" }}
                    >
                      {day.notDone}
                    </td>
                  ))}
                </tr>
                <tr style={{ border: "0px" }}>
                  <td colSpan={23} style={{ border: "0px" }}></td>
                </tr>
                <tr style={{ border: "0px" }}>
                  <td style={{ border: "0px" }}></td>
                  <td colSpan={21} style={{ border: "0px", padding: "0px" }}>
                    <Line
                      data={lineData}
                      options={lineOptions}
                      style={{ maxHeight: "200px", padding: "0px" }}
                    />
                  </td>
                  <td style={{ border: "0px" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-12">
              <h4 className="text-center">Habit Progress Overview</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyHabit;
