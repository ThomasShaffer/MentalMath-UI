import {Button, ButtonGroup, Dropdown, DropdownButton, Modal, Stack} from "react-bootstrap";
import {SyntheticEvent, useReducer} from "react";
import {useNavigate} from "react-router-dom";
import '../../../index.css';
import DropdownItem from "react-bootstrap/DropdownItem";

export const FinishedDialog = (props: any) => {

    const message = props.correct ? "not bad" : "you suck";
    const navigate = useNavigate();
    const handleRestart = (e: SyntheticEvent) => {
        props.handleShow(false);
        props.handleRender(true);
        console.log("modal restart");
    }

    const handleRetry = (e: SyntheticEvent) => {
        e.preventDefault();
        props.handleShow(false);
        props.handleRetry(true);
    }

    return (
        <Modal show={props.show} animation={true} style={{alignSelf: 'center'}} size="lg" centered>
            <br/>
            <Modal.Title style={{alignSelf: 'center'}} id="contained-modal-title-vcenter"> {message} you answered : {props.answer} </Modal.Title>
            <Modal.Body style={{alignSelf: 'center'}}>
                <Button className="btn btn-lg m-1" autoFocus={true} type="submit" onClick={handleRestart}> next </Button>
                <Button className="btn btn-lg m-1" onClick={handleRetry}> again </Button>
                <Button className="btn btn-lg m-1" onClick={() => navigate('/')}> home </Button>
            </Modal.Body>
            <Modal.Footer id="contained-modal-title-vcenter">
                <Stack>
                    <Button onClick={props.handleAlgorithms}> algorithms </Button>
                </Stack>
            </Modal.Footer>
        </Modal>
    );
}
