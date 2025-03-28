import React, { useState } from "react";
import { Btn, Container, P } from "./styles";

const ButtonWithCaption = ({ message }) => {
  const [showCaption, setShowCaption] = useState(false);

  return (
    <Container >
      <Btn
        onMouseEnter={() => setShowCaption(true)}
        onMouseLeave={() => setShowCaption(false)}
      >
        Clique Aqui
      </Btn>
      {showCaption && (
        <P>{message}</P>
      )}
    </Container>
  );
};

export default ButtonWithCaption;
