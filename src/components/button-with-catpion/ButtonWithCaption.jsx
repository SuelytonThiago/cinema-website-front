import React, { useState } from "react";
import { Btn, Container, P } from "./styles";

const ButtonWithCaption = ({ message, children }) => {
  const [showCaption, setShowCaption] = useState(false);

  return (
    <Container>
      <Btn
        onMouseEnter={() => setShowCaption(true)}
        onMouseLeave={() => setShowCaption(false)}
      >
        {children}
      </Btn>
      {showCaption && (<P>{message}</P>)}
    </Container>
  );
};

export default ButtonWithCaption;
