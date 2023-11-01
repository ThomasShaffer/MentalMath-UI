import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";

export const ErrorInput = (props: any) => {

    return (
        <>
            <Modal show={props.showError} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Looks like youre inputting ugly requirements, please fix.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseError}>
                        Fasho
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
