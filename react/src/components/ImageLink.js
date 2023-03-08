import React from "react";
import { Button, Input, InputGroup } from "reactstrap";
import '../assets/css/ImageLink.css'

const ImageLink = ({ changeLink, detectFace, canDetect }) => {
    return (
        <div className="text-center">
            <p className="">This Magic Brain will detect faces in your picture.</p>
            <InputGroup className="detect-link justify-content-center shadow rounded">
                <Input id="image-link" onChange={changeLink} type={'text'}></Input>
                <Button disabled={!canDetect} onClick={detectFace} className="grow d-inline-block" color="secondary">Detect</Button>
            </InputGroup>
        </div>
    )
}

export default ImageLink;