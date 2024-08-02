import { useState } from "react";

/* eslint-disable react/prop-types */
const App = () => {
  const [counter, setCounter] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  const [top, setTop] = useState(40);
  const [left, setLeft] = useState(40);

  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const handleClick = () => {
    setCounter(counter + 1);
    setTop(Math.floor(Math.random() * (500 - 40 + 1) + 40));
    setLeft(Math.floor(Math.random() * (1000 - 40 + 1) + 40));
  };

  const handleLeftClick = () => {
    handleClick();
    setAllClicks(allClicks.concat("L"));
  };

  const handleRightClick = () => {
    handleClick();
    setAllClicks(allClicks.concat("R"));
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <button
        onClick={handleClick}
        style={{
          position: "absolute",
          top: top,
          left: left,
        }}
      >
        Click Me {counter}
      </button>

      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>

      <button onClick={() => setCounter(0)}>Zero</button>

      <p
        style={{
          textWrap: "wrap",
        }}
      >
        {allClicks.join("")}
      </p>

      <Header course={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  );
};

export default App;

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ partName, partExercise }) => {
  return (
    <p>
      {partName} {partExercise}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((item) => (
        <Part
          key={item.name}
          partName={item.name}
          partExercise={item.exercises}
        />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const sum = parts.reduce((total, val) => total + val.exercises, 0);

  return (
    <p
      style={{
        fontWeight: "bold",
      }}
    >
      Number of exercises {sum}
    </p>
  );
};
