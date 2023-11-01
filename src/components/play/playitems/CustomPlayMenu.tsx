import AccordionItem from "react-bootstrap/AccordionItem";
import {Accordion, Button, Form, Modal, Stack} from "react-bootstrap";
import {CustomNumberRange} from "../helpers/CustomNumberRange";
import {CustomTimeConstraint} from "../helpers/CustomTimeConstraints";
import React, {useState} from "react";

export const CustomPlayMenu = (props: any) => {


    const validate = (e: React.SyntheticEvent) => {
        if  (props.firstNumberDigits.min === 0 ||
            (props.firstNumberDigits.max === 0) ||
            (props.firstNumberDigits.max < props.firstNumberDigits.min) ||
            (props.secondNumberDigits.min === 0) ||
            (props.secondNumberDigits.max === 0) ||
            (props.secondNumberDigits.max < props.secondNumberDigits.min) ||
            (props.maxTime === 0)) {

            props.handleShowError(true);
            return;
        }
        if (!props.showError) {
            props.onSubmit(e);
            return;
        }
    }

    return (
        <AccordionItem eventKey="custom">
            <Accordion.Header> CUSTOM </Accordion.Header>
            <Accordion.Body>
                <Form id="custom">
                    <Form.Group className="mb-3" controlId="Custom">
                        <Stack gap={2}>
                            <Form.Label> Randomized Digit Constraints </Form.Label>
                            <Stack gap={2}>
                                <CustomNumberRange ordinalType={props.firstNumberDigits} handleChange={props.handleFirstNumberDigits}/>
                                <CustomNumberRange ordinalType={props.secondNumberDigits} handleChange={props.handleSecondNumberDigits}/>
                            </Stack>
                            <Form.Label> Time Constraint </Form.Label>
                            <CustomTimeConstraint maxTime={props.maxTime} handleChange={props.handleMaxTime}/>
                        </Stack>
                    </Form.Group>
                    <Stack gap={2} className="ms-auto">
                        <Button variant="outline-secondary" onClick={validate}> PLAY </Button>
                        <Button variant="outline-secondary" onClick={validate}> PRACTICE </Button>
                        <Button variant="outline-secondary" onClick={props.flushState}> CLEAR </Button>
                    </Stack>
                </Form>
            </Accordion.Body>
        </AccordionItem>
    )
}
