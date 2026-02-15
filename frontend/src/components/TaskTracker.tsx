import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./TaskTracker.css";

const percentage = 66;

const TaskTracker = () => {
  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Sun</div>
                    <div>15.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Mon</div>
                    <div>16.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Tue</div>
                    <div>17.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Wed</div>
                    <div>18.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Thu</div>
                    <div>19.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Fri</div>
                    <div>19.02.2026</div>
                  </th>
                  <th className="task-header text-center">
                    <div className="h3 fw-bolder">Sat</div>
                    <div>20.02.2026</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td className="">
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td className="">
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                  <td className="">
                    <div className="">
                      <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={25}
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "5px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,

                          // Can specify path transition in more detail, or remove it entirely
                          // pathTransition: 'none',

                          // Colors
                          pathColor: `rgba(26, 165, 26, ${percentage / 100})`,
                          textColor: "#f88",
                          trailColor: "#d6d6d6",
                          backgroundColor: "#1aa51a",
                        })}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                  <td className="task-header text-center">Tasks</td>
                </tr>
                <tr>
                  <div className="task-lists p-0">
                    <div className="task-list">
                      <div className="task-name">Test Api Endpoint</div>
                      <div className="task-input">
                        <input type="checkbox" />
                      </div>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskTracker;
