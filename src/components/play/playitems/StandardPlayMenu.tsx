import AccordionItem from "react-bootstrap/AccordionItem";
import {Accordion, Button, Form, Stack} from "react-bootstrap";
import {RenderDifficulty} from "../helpers/RenderDifficulty";
import React from "react";

export const StandardPlayMenu = (props: any) => {
    return (
        <AccordionItem eventKey="standard">
            <Accordion.Header> PLAY </Accordion.Header>
            <Accordion.Body>
                <Form id="standard" onSubmit={props.onSubmit}>
                    <Stack gap={2} className="ms-auto">
                        <RenderDifficulty gameDifficulty={props.gameDifficulty} handleChange={props.handleGameDifficulty}/>
                        <Button variant="outline-secondary" type="submit" value="standard" onClick={() => props.handleGameMode("standard")} disabled={props.gameDifficulty.difficulty === "null"}> PLAY </Button>
                        <Button variant="outline-secondary" type="submit" value="practice" onClick={() => props.handleGameMode("practice")} disabled={props.gameDifficulty.difficulty === "null"}> PRACTICE </Button>
                        <Button variant="outline-secondary" onClick={props.flushState}> CLEAR </Button>
                    </Stack>
                </Form>
            </Accordion.Body>
        </AccordionItem>
    )
}
