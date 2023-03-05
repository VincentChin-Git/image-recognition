import ParticlesBg from "particles-bg";
import React, { useState } from "react";
import { Container } from "reactstrap";
import './assets/css/App.css';
import ImageLink from "./components/ImageLink";
import Logo from "./components/Logo";
import Ranking from "./components/Ranking";
import SignInStatus from "./components/SignInStatus";

const App = () => {

  const [state, setState] = useState({
    isSignedIn: false,
    imageLink: "",
    username: "username",
    rank: 1,
  })

  const handleInputChange = (statename, value) => {
    setState(prev => { return { ...prev, [statename]: value } })
  }

  const detectFace = () => {

  }

  const clickSignIn = () => {

  }

  return (
    <div className="App mx-2">
      <ParticlesBg type="cobweb" bg={true} />

      <div className="d-flex mt-2">
        <Logo />
        <SignInStatus
          isSignedIn={state.isSignedIn}
          clickButton={clickSignIn}
        />
      </div>
      <Container >

        <Ranking username={state.username} rank={state.rank} />
        <ImageLink
          changeLink={e => handleInputChange('imageLink', e.target.value)}
          detectFace={detectFace}
        />
      </Container>
    </div>
  );
}

export default App;
