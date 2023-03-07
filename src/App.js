import ParticlesBg from "particles-bg";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import './assets/css/App.css';
import ImageDetect from "./components/ImageDetect";
import ImageLink from "./components/ImageLink";
import Logo from "./components/Logo";
import Ranking from "./components/Ranking";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignInStatus from "./components/SignInStatus";
import { handleStateChange } from "./utils/global_func";

const App = () => {

  const [state, setState] = useState({
    isSignedIn: false,
    imageLink: "",

    username: "username",
    rank: 1,
    email: "",
    password: "",

    faces: [],
    route: "signin",
  })

  const handleInputChange = (statename, value) => {
    setState(prev => { return { ...prev, [statename]: value } })
  }

  const detectFace = () => {

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "clarifai",
        "app_id": "main"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": state.imageLink
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 121c615219a5498e971c4fabcf855ee8'
      },
      body: raw
    };

    fetch(`https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`, requestOptions)
      .then(response => response.json())
      .then(result => {
        let boxes = [];
        const image = document.getElementById('imageDetect');
        const width = parseFloat(image.width);
        const height = parseFloat(image.height);
        result.outputs[0].data.regions.forEach(region => {
          let box = region.region_info.bounding_box;
          let style = {
            height: ((box.bottom_row - box.top_row) * height) + 'px',
            width: ((box.right_col - box.left_col) * width) + 'px',
            top: (height * box.top_row) + 'px',
            left: (width * box.left_col) + 'px',
          }
          boxes = [...boxes, style];
        });
        setState(prev => { return { ...prev, faces: boxes } })
      })
      .catch(error => console.log('error', error));

  }

  const clickSignIn = () => {
    if (state.route === 'signin') {
      setState(prev => { return { ...prev, route: "home" } })
    }
    else if (state.route === 'home') {
      setState(prev => { return { ...prev, route: "signin" } })
    }
  }

  const clickRegister = () => {

  }

  useEffect(() => {
    setState(prev => { return { ...prev, faces: [] } })
  }, [state.imageLink])

  return (
    <div className="App mx-2">
      <ParticlesBg type="cobweb" bg={true} />

      {state.route === 'register' &&
        <Register
          clickSignIn={() => handleStateChange(setState, { route: "signin" })}
          clickRegister={clickRegister}
        />
      }

      {state.route === 'signin' &&
        <SignIn
          clickSignIn={clickSignIn}
          clickRegister={() => handleStateChange(setState, { route: "register" })}
        />
      }

      {state.route === 'home' &&
        <>
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

            <ImageDetect
              src={state.imageLink}
              faces={state.faces}
            />
          </Container>
        </>
      }
    </div>
  );
}

export default App;
