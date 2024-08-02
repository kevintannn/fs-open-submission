/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoteIndex, setMostVoteIndex] = useState(0);

  // set random seed to get random anecdote
  const setRandomSeed = () => {
    let seed = selected;

    do {
      seed = Math.floor(Math.random() * (anecdotes.length - 1));
    } while (seed === selected);

    setSelected(seed);
  };

  // track most vote index
  const trackMostVoteIndex = () => {
    let max = votes[mostVoteIndex];
    let _mostVoteIndex = mostVoteIndex;

    for (let i = 0; i < anecdotes.length; i++) {
      if (max < votes[i]) {
        max = votes[i];
        _mostVoteIndex = i;
      }
    }

    setMostVoteIndex(_mostVoteIndex);
  };

  // handle vote
  const handleVote = () => {
    const temp = [...votes];
    temp[selected] += 1;

    setVotes(temp);
  };

  useEffect(() => {
    if (votes.some((vote) => vote > 0)) {
      trackMostVoteIndex();
    }
  }, [votes]);

  return (
    <div
      style={{
        padding: 20,
        fontSize: 30,
      }}
    >
      <Anecdotes anecdotes={anecdotes} selected={selected} votes={votes} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginTop: 10,
        }}
      >
        <Button onClick={handleVote} label={"Vote"} />
        <Button onClick={setRandomSeed} label={"Next Anecdote"} />
      </div>

      <MostVoteAnecdote
        anecdote={anecdotes[mostVoteIndex]}
        vote={votes[mostVoteIndex]}
      />
    </div>
  );
};

export default App;

const Anecdotes = ({ anecdotes, selected, votes }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>

      <p
        style={{
          height: 100,
        }}
      >
        {anecdotes[selected]}
      </p>

      <p
        style={{
          fontWeight: "bold",
        }}
      >
        Has {votes[selected]} votes
      </p>
    </>
  );
};

const MostVoteAnecdote = ({ anecdote, vote }) => {
  return (
    <>
      <h1
        style={{
          marginTop: 20,
        }}
      >
        Anecdote with the most votes
      </h1>

      <p>{anecdote}</p>
      <p
        style={{
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Has {vote} votes
      </p>
    </>
  );
};

const Button = ({ onClick, label }) => {
  return (
    <button
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
