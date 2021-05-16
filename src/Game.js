import { Container } from "@sberdevices/plasma-ui/components/Grid";
import { Timer } from "./Timer";
import { useState } from "react";
import { Row, Col } from "@sberdevices/plasma-ui";

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
} from "@sberdevices/plasma-ui";
const Game = ({ mode, playOrPractice }) => {
  const [value, setValue] = useState("");
  const status = ["success", "error", ""];
  return (
    <Container>
      {/* <h1>{mode}</h1> */}
      {playOrPractice == 0 ? (
        <h1>Режим тренировки</h1>
      ) : (
        <Timer style={{ textAlign: "right" }} />
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{ width: "40rem" }}
          tabIndex={-1}
          outlined={false}
          scaleOnFocus={false}
        >
          <CardBody>
            <CardMedia src="https://ic.pics.livejournal.com/masterok/50816465/7165160/7165160_original.jpg" />
            <CardContent cover={cover}>
              <TextBox>
                <TextBoxBigTitle>{"Это кто?"}</TextBoxBigTitle>
                {/* <TextBoxBiggerTitle>{"до 230 000 ₽"}</TextBoxBiggerTitle>
              <TextBoxSubTitle>{"На 18 месяцев, ставка 13,9%"}</TextBoxSubTitle> */}
              </TextBox>

              {/* <Row>
                <Col type={"rel"} size={6}>
                  <Button
                    text="Корова"
                    view="primary"
                    size="s"
                    scaleOnInteraction={true}
                    outlined={true}
                    stretch
                    style={{ marginTop: "1em" }}
                    tabIndex={-1}
                  />
                </Col>
                <Col type={"rel"} size={6}>
                  <Button
                    text="Собака"
                    view="primary"
                    size="s"
                    scaleOnInteraction={true}
                    outlined={true}
                    stretch
                    style={{ marginTop: "1em" }}
                    tabIndex={-1}
                  />
                </Col>
              </Row>
              <Row>
                <Col type={"rel"} size={6}>
                  <Button
                    text="Курица"
                    view="primary"
                    size="s"
                    scaleOnInteraction={true}
                    outlined={true}
                    stretch
                    style={{ marginTop: "1em" }}
                    tabIndex={-1}
                  />
                </Col>
                <Col type={"rel"} size={6}>
                  <Button
                    text="Лев"
                    view="primary"
                    size="s"
                    scaleOnInteraction={true}
                    outlined={true}
                    stretch
                    style={{ marginTop: "1em" }}
                    tabIndex={-1}
                  />
                </Col>
              </Row> */}
              <TextField
                style={{ marginTop: "1rem" }}
                value={value}
                label={"Ответ"}
                //   helperText={"Helper text"}
                disabled={false}
                status={status !== "" ? status : undefined}
                onChange={(v) => setValue(v.target.value)}
              />
              <Button style={{ marginTop: "1rem" }}>Ответить</Button>
            </CardContent>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default Game;
