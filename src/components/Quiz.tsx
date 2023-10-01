import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectRootState,
  updateResult,
} from "../features/translate/translateSlice";
import { AppDispatch } from "../store";
import Header from "./Header";

function Quiz() {
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { words, error, loading } = useSelector(selectRootState);
  const wordItem = words[count];

  if (error) return <h1>{error}</h1>;

  if (loading) return <h1>Loading</h1>;

  const nextHandler = (): void => {
    console.log(ans, wordItem.meaning);

    setResult((prev) => [...prev, ans]);

    setCount((prev) => prev + 1);
    setAns("");
  };
  const showResult = (): void => {
    dispatch(updateResult([...result, ans]));
    setResult((prev) => [...prev, ans]);
    setAns("");
    navigate("/result");
  };

  return (
    <>
      <Header />
      <Container maxWidth={"sm"}>
        <Typography>Quiz</Typography>

        <Typography variant="h4">
          {count + 1} - {wordItem.word}
        </Typography>

        {wordItem.options.map((option, index) => (
          <div key={index}>
            <input
              onChange={() => {
                setAns(option);
              }}
              type="radio"
              name="opt"
              id={`opt${index}`}
              checked={ans === option} // Set the checked state based on ans
            />
            <label htmlFor={`opt${index}`}>{option}</label>
          </div>
        ))}

        <Button
          disabled={!ans}
          onClick={count === words.length - 1 ? showResult : nextHandler}
          variant="contained"
          color="secondary"
        >
          {count === words.length - 1 ? "View result" : "next"}
        </Button>
      </Container>
    </>
  );
}

export default Quiz;
