/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // increment feedback
  const handleIncrementFeedback = (feedbackType) => {
    switch (feedbackType) {
      case "good":
        setGood(good + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 20,
      }}
    >
      <h1>Give Feedback</h1>

      <Buttons handleIncrementFeedback={handleIncrementFeedback} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

const Buttons = ({ handleIncrementFeedback }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <button
        onClick={() => handleIncrementFeedback("good")}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        Good
      </button>
      <button
        onClick={() => handleIncrementFeedback("neutral")}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        Neutral
      </button>
      <button
        onClick={() => handleIncrementFeedback("bad")}
        style={{
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        Bad
      </button>
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  useEffect(() => {
    const goodScore = 1;
    const neutralScore = 0;
    const badScore = -1;

    const all = good + neutral + bad;
    const average =
      (good * goodScore + neutral * neutralScore + bad * badScore) / all;
    const positive = (good / all) * 100;

    setAll(all);

    if (all !== 0) {
      setAverage(average);
      setPositive(positive + "%");
    }
  }, [good, neutral, bad]);

  return (
    <>
      <h1>Statistics</h1>

      {all > 0 ? (
        <table
          style={{
            width: "fit-content",
          }}
        >
          <tbody>
            <StatisticLine text={"Good"} value={good} />
            <StatisticLine text={"Neutral"} value={neutral} />
            <StatisticLine text={"Bad"} value={bad} />
            <StatisticLine text={"All"} value={all} />
            <StatisticLine text={"Average"} value={average} />
            <StatisticLine text={"Positive"} value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};
