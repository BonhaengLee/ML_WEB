import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import bg from "./pastel-oil-painting-canvas-background_53876-93729.jpg";

const Spinner = styled.div`
  position: absolute;
  top: 45%;
  left: 47%;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: 3px solid ${"palevioletred"};
  border-top-color: ${"pick"};
  animation: anim 0.7s infinite linear;

  @keyframes anim {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Home = lazy(() => import("./pages/home"));
const Result = lazy(() => import("./pages/result"));

function App() {
  return (
    <Container>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/result" component={Result} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  font-family: "Chosunilbo_myungjo";
  background-image: url(${bg});
  background-size: cover;
`;

export default App;
