import { Container } from "@sberdevices/plasma-ui/components/Grid";
import { Timer } from "./Timer";
import { useState, useEffect } from "react";
import { Row, Col } from "@sberdevices/plasma-ui";
import useSound from "use-sound";

import {
  Card,
  CardBody,
  CardContent,
  CardMedia,
  CardHeadline1,
  Button,
  TextBox,
  cover,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
  TextBoxBigTitle,
  TextField,
  CardParagraph1,
  Headline4,
} from "@sberdevices/plasma-ui";
import { IconVolumeAlt2 } from "@sberdevices/plasma-icons";

const Game = ({
  mode,
  playOrPractice,
  answer,
  setAnswer,
  generateNewAnimal,
  processCard,
  picture,
  text,
  sound,
}) => {
  const status = ["success", "error", ""];

  const [play, { stop, isPlaying }] = useSound(sound, { volume: 0.75 });
  const [playButtonText, setPlayButtonText] = useState("Прослушать");
  useEffect(() => {
    generateNewAnimal();
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setPlayButtonText("Прослушать");
    }
  }, [isPlaying]);

  const renderMode = (param) => {
    switch (param) {
      case 0:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{ width: "30rem", marginTop: "0.7rem" }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                <CardMedia style={{ maxHeight: "22rem" }} src={picture} />
                <CardContent cover={cover}>
                  <TextBox>
                    <TextBoxBigTitle>{"Какое это животное?"}</TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={answer}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAnswer(v.target.value)}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );
      case 1:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{ width: "40rem", marginTop: "4rem" }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                {/* <CardMedia style={{ width: "30rem" }} src={picture} /> */}
                <CardContent cover={cover}>
                  <TextBox>
                    <CardParagraph1 style={{ marginTop: "0.75rem" }} lines={6}>
                      <Headline4>
                        <em>{text}</em>
                      </Headline4>
                    </CardParagraph1>

                    <TextBoxBigTitle style={{ marginTop: "2rem" }}>
                      {"Какое это животное?"}
                    </TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={answer}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAnswer(v.target.value)}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{ width: "30rem", marginTop: "4rem" }}
              tabIndex={-1}
              outlined={false}
              scaleOnFocus={false}
            >
              <CardBody>
                <CardContent cover={cover}>
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      if (isPlaying) {
                        stop();
                      } else {
                        play();
                        setPlayButtonText("Остановить");
                      }
                    }}
                    text={playButtonText}
                    view={"primary"}
                    contentLeft={<IconVolumeAlt2 />}
                  />
                  <TextBox>
                    <TextBoxBigTitle style={{ marginTop: "1rem" }}>
                      {"Какое животное издает этот звук?"}
                    </TextBoxBigTitle>
                  </TextBox>
                  <TextField
                    style={{ marginTop: "1rem" }}
                    value={answer}
                    label={"Ответ"}
                    //   helperText={"Helper text"}
                    disabled={false}
                    status={status !== "" ? status : undefined}
                    onChange={(v) => setAnswer(v.target.value)}
                  />
                  <Button
                    style={{ marginTop: "1rem" }}
                    onClick={() => {
                      processCard();
                    }}
                  >
                    Ответить
                  </Button>
                </CardContent>
              </CardBody>
            </Card>
          </div>
        );
    }
  };

  return (
    <Container style={{ marginBottom: "10rem" }}>
      {playOrPractice == 0 ? <></> : <Timer style={{ textAlign: "right" }} />}
      <div>{renderMode(mode)}</div>
    </Container>
  );
};

export default Game;
