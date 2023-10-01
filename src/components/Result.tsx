import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectRootState } from "../features/translate/translateSlice";
import Header from "./Header";

function Result() {
  const { words, error, loading, result, langCode } =
    useSelector(selectRootState);

  const navigate = useNavigate();
  let points = 0;
  const correctInd: number[] = [];
  const wrongInd: number[] = [];
  words.forEach((word, ind) => {
    if (word.meaning === result[ind]) {
      points++;
      correctInd.push(ind);
    } else wrongInd.push(ind);
  });
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading</h1>;

  return (
    <>
      <Header />
      {result && words && (
        <div className="resultContainer">
          <div className="info">
            <div className="word">
              <h1>word</h1>
              {words.map((word, ind) => {
                return <div key={ind}>{word.word}</div>;
              })}
            </div>
            <div className="meaning">
              <h1>meaning</h1>
              {words.map((word, ind) => {
                return <div key={ind}>{word.meaning}</div>;
              })}
            </div>
            <div className="response">
              <h1>your ans</h1>
              {result.map((item, ind) => {
                const className = correctInd.includes(ind)
                  ? "correct"
                  : "wrong";
                return (
                  <div className={className} key={ind}>
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="result">
            <h1>
              result : {points}/{words.length}
            </h1>
            <Button
              variant="contained"
              onClick={() => navigate(`/learn?language=${langCode}`)}
            >
              Learn More
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Result;
