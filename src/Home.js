import hear from "./hear.jpg";
import lion from "./lionpic.jpg";
import opisanie from "./opisanie.jpg";
import { IconRefresh } from "@sberdevices/plasma-icons";
import { IconTimerFill } from "@sberdevices/plasma-icons";
import { useHistory, withRouter } from "react-router-dom";

import { Container } from "@sberdevices/plasma-ui/components/Grid";
import { Button, P } from "@sberdevices/plasma-ui";
import { Display2 } from "@sberdevices/plasma-ui";
import { useState } from "react";
import {
  Card,
  Icon,
  CardBody,
  CardContent,
  CardMedia,
  Tabs,
  TabItem,
  TextBoxSubTitle,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBox,
} from "@sberdevices/plasma-ui";
const Home = ({ setMode, setPlayOrPractice, playOrPractice }) => {
  const icons = [<IconRefresh />, <IconTimerFill />];
  const outlined = false;
  const items = [0, 0];
  const texts = ["Режим тренировки", "Игровой режим"];
  const disabled = false;
  const history = useHistory();
  const linkToGame = () => {
    history.push("/game");
  };
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        <Display2>Угадай Животное</Display2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <Tabs
          size={"l"}
          view={"secondary"}
          scaleOnPress={true}
          outlined={!disabled && outlined}
          disabled={disabled}
        >
          {items.map((_, i) => (
            <TabItem
              key={`item:${i}`}
              isActive={i === playOrPractice}
              tabIndex={!disabled ? i : -1}
              contentLeft={icons[i]}
              onClick={() => !disabled && setPlayOrPractice(i)}
            >
              {texts[i]}
            </TabItem>
          ))}
        </Tabs>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          justifyContent: "space-around          ",
        }}
      >
        <Card style={{ width: "22.5rem" }}>
          <CardBody>
            <CardMedia src={lion} height={"15rem"} />
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Сложность легкая"}</TextBoxBigTitle>
                <TextBoxBiggerTitle>{"угадай по фото"}</TextBoxBiggerTitle>
                <TextBoxSubTitle>{"15 секунд на раздумье"}</TextBoxSubTitle>
              </TextBox>
              <Button
                text="Погнали"
                view="primary"
                size="s"
                scaleOnInteraction={true}
                outlined={true}
                stretch
                style={{ marginTop: "1em" }}
                tabIndex={-1}
                onClick={() => {
                  linkToGame();
                  setMode(0);
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
        <Card style={{ width: "22.5rem" }}>
          <CardBody>
            <CardMedia src={opisanie} height={"15rem"} />
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Сложность средняя"}</TextBoxBigTitle>
                <TextBoxBiggerTitle>{"угадай по описанию"}</TextBoxBiggerTitle>
                <TextBoxSubTitle>{"30 секунд на раздумье"}</TextBoxSubTitle>
              </TextBox>
              <Button
                text="Начинаем"
                view="primary"
                size="s"
                scaleOnInteraction={true}
                outlined={true}
                stretch
                style={{ marginTop: "1em" }}
                tabIndex={-1}
                onClick={() => {
                  linkToGame();
                  setMode(1);
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
        <Card style={{ width: "22.5rem" }}>
          <CardBody>
            <CardMedia src={hear} height={"15rem"} />
            <CardContent>
              <TextBox>
                <TextBoxBigTitle>{"Сложность высокая"}</TextBoxBigTitle>
                <TextBoxBiggerTitle>{"угадай по звуку"}</TextBoxBiggerTitle>
                <TextBoxSubTitle>{"40 секунд на раздумье"}</TextBoxSubTitle>
              </TextBox>
              <Button
                text="Начать"
                view="primary"
                size="s"
                scaleOnInteraction={true}
                outlined={true}
                stretch
                style={{ marginTop: "1em" }}
                tabIndex={-1}
                onClick={() => {
                  linkToGame();
                  setMode(2);
                }}
              />
            </CardContent>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Home;
