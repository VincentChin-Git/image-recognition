import ParticlesBg from "particles-bg";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import axios from "axios";

import './assets/css/App.css';
import ImageDetect from "./components/ImageDetect";
import ImageLink from "./components/ImageLink";
import Logo from "./components/Logo";
import Ranking from "./components/Ranking";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import SignInStatus from "./components/SignInStatus";
import { handleStateChange, toggleState } from "./utils/global_func";
import { serverPath } from "./utils/global_const";

const App = () => {

  const [state, setState] = useState({
    // user data
    user_id: '',
    name: "name",
    rank: 10,

    // image recognition
    imageLink: "",
    canDetect: false,
    faces: [],

    // control
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
        if (Object.keys(result.outputs[0].data).length > 0) {
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
        }
        else {
          alert('No face detected.')
        }

        axios.post(serverPath + 'image', {
          id: state.user_id,
          image_link: state.imageLink
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      })
      .catch(error => console.log('error', error));

  }

  const signIn = (signInData) => {
    axios.post(serverPath + 'signin', {
      email: signInData.email,
      password: signInData.password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.data.status == 'info') { alert('Invalid email or password.'); }
      else if (res.data.status == 'error') { alert('Sign in fail.') }
      else if (res.data.status == 'success') {
        console.log(res.data)
        setState(prev => { return { ...prev, ...res.data.data, route: 'home' } })
      }
    })
  }

  const register = (registerData) => {
    axios.post(serverPath + 'register', {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.data.status == 'error') { alert('Register fail.'); }
      else if (res.data.status == 'success') {
        alert('Register success.');
        setState(prev => { return { ...prev, route: 'signin' } })
      }
    })
  }

  const signOut = () => {
    setState(prev => {
      return {
        ...prev,
        user_id: '',
        name: "",
        rank: 100,
        route: 'signin',
        imageLink: "",
        canDetect: false,
      }
    })
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
          clickRegister={register}
        />
      }

      {state.route === 'signin' &&
        <SignIn
          clickSignIn={signIn}
          clickRegister={() => handleStateChange(setState, { route: "register" })}
        />
      }

      {state.route === 'home' &&
        <>
          <div className="d-flex mt-2">
            <Logo />
            <SignInStatus
              signOut={signOut}
            />
          </div>

          <Container >

            <Ranking name={state.name} rank={state.rank} />
            <ImageLink
              changeLink={e => handleInputChange('imageLink', e.target.value)}
              detectFace={detectFace}
              canDetect={state.canDetect}
            />
            <ImageDetect
              src={state.imageLink}
              faces={state.faces}
              toggleDetect={() => toggleState(setState, 'canDetect')}
            />
          </Container>
        </>
      }
    </div>
  );
}

export default App;
