import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { AppDispatch } from "../store"; // Adjust the path to your Redux store configuration

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  selectRootState,
  translateWordsAsync,
} from "../features/translate/translateSlice";
import Header from "./Header";
import { fetchAudio } from "../utils";

function Learning() {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef(null);
  const langCode = useSearchParams()[0].get("language") as LangCodeType;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { words, error, loading } = useSelector(selectRootState);

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc("");
  };
  const audioHandler = async () => {
    const player: HTMLAudioElement = audioRef.current!;
    if (player) player.play();
    else {
      const data = await fetchAudio(words[count].word, langCode);
      setAudioSrc(data);
    }
  };
  useEffect(() => {
    dispatch(translateWordsAsync(langCode));
  }, [dispatch, langCode]);
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading</h1>;
  return (
    <>
      <Header />
      {words.length !== 0 && (
        <Container maxWidth={"sm"}>
          {audioSrc && <audio autoPlay src={audioSrc} ref={audioRef}></audio>}
          <Button
            onClick={
              count === 0
                ? () => navigate("/")
                : () => setCount((prev) => prev - 1)
            }
          >
            <ArrowBack></ArrowBack>
          </Button>
          <Typography>learning made easy</Typography>
          <Stack direction={"row"} spacing={"1rem"}>
            <Typography variant="h4">
              {count + 1} - {words[count].word}
            </Typography>

            <Typography variant="h4" color={"blue"}>
              : {words[count].meaning}
            </Typography>
            <Button onClick={audioHandler}>
              <VolumeUp />
            </Button>
          </Stack>
          <Button
            onClick={
              count === words.length - 1
                ? () => navigate("/quiz")
                : () => nextHandler()
            }
            variant="contained"
            color="secondary"
          >
            {count === words.length - 1 ? "Quiz" : "next"}
          </Button>
        </Container>
      )}
    </>
  );
}

export default Learning;
