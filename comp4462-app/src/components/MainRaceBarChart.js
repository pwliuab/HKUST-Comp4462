import React, { useState } from "react";
import RacingBarChart from "./RacingBarChart";
import useInterval from "./useInterval";
import "./RaceBC.css";

const getRandomIndex = array => {
  return Math.floor(array.length * Math.random());
};

// import React, { useState } from "react";
// import RacingBarChart from "./RacingBarChart";
// import useInterval from "./useInterval";
// import "./App.css";
//
// const getRandomIndex = array => {
//   return Math.floor(array.length * Math.random());
// };

function MainRaceBarChart() {
  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: "alpha",
      value: 10,
      color: "#f4efd3"
    },
    {
      name: "beta",
      value: 15,
      color: "#cccccc"
    },
    {
      name: "charlie",
      value: 20,
      color: "#c2b0c9"
    },
    {
      name: "delta",
      value: 25,
      color: "#9656a1"
    },
    {
      name: "echo",
      value: 30,
      color: "#fa697c"
    },
    {
      name: "foxtrot",
      value: 35,
      color: "#fcc169"
    }
  ]);
  console.log(data);
  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10
              }
            : entry
        )
      );
      setIteration(iteration + 1);
    }
  }, 500);

  return (
    <React.Fragment>
    <RacingBarChart data={data} />
      <h1>Racing Bar Chart</h1>
      <button onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race!"}
      </button>
      <p>Iteration: {iteration}</p>
    </React.Fragment>
  );
}
export default MainRaceBarChart;
