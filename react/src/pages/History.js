import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverPath } from "../utils/global_const";
import '../assets/css/History.css'
import { alertObj } from "../utils/global_func";
import { Col } from "reactstrap";

const History = ({ user_id }) => {

    const [state, setState] = useState({
        imageLinks: [],
    })

    useEffect(() => {
        axios.get(serverPath + 'history/' + user_id)
            .then(res => {
                setState(prev => { return { ...prev, imageLinks: res.data } })
            })
    }, [])

    return (
        <div>
            <div className="d-flex flex-wrap">
                {state.imageLinks.map((image, index) => (
                    <Col className="p-2" key={index} lg="3" md="4" xs="6">
                        <img className="width_100" src={image} alt='' />
                    </Col>
                ))}
            </div>
        </div>
    )
}

export default History;