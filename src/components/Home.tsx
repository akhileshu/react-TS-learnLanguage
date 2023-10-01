import { Button, Container, Stack, Typography } from "@mui/material";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLangCode } from "../features/translate/translateSlice";
const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h3" p={"2rem"} textAlign={"center"}>
          welcome to LearnLanguage
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={"2rem"}
        >
          {languages.map((lang, index) => {
            return (
              <Button
                onClick={() => {
                  dispatch(setLangCode(lang.code as LangCodeType));
                  navigate(`./learn?language=${lang.code}`);
                }} // alogn with query parameter
                variant="contained"
                color="secondary"
                key={index}
              >
                {lang.name}
              </Button>
            );
          })}
        </Stack>
        <Typography p={"2rem"} textAlign={"center"}>
          choose a language
        </Typography>
      </Container>
    </div>
  );
}

export default Home;
