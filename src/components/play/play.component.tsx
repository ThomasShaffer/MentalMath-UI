import React, {MouseEventHandler, ReactEventHandler, SyntheticEvent, useState} from "react";
import Header from "../shared/header/header.component";
import Navbar from "../shared/nav-bar/navbar.component";
import {Accordion, Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, InputGroup, Row} from "react-bootstrap";
import AccordionItem from "react-bootstrap/AccordionItem";
import DropdownItem from "react-bootstrap/DropdownItem";
import {useNavigate, useNavigation} from "react-router-dom";

const Play = (props: any) => {

    const navigate = useNavigate();
    type GameMode = "practice" | "compete";
    interface NumberDigits {
        type: "first" | "second",
        min: number,
        max: number
    }

    const [gameMode, setGameMode] = useState<GameMode>("compete");
    const [firstNumberDigits, setFirstNumberDigits] = useState<NumberDigits>({type: "first", min: 0, max: 0});
    const [secondNumberDigits, setSecondNumberDigits] = useState<NumberDigits>({type: "second", min: 0, max: 0});
    const [maxTime, setMaxTime] = useState(0);

    const methodMapper = {
        "first" : setFirstNumberDigits,
        "second" : setSecondNumberDigits
    }

    const renderDigitDropdown = (stateNumber: NumberDigits, limit: string) => {
        const numbers = [1,2,3,4];
        const dynamicallySetDigits = (e: any, stateNumber: NumberDigits, limit: string) => {
            e.preventDefault();
            //@ts-ignore
            methodMapper[stateNumber.type]((stateNumber: NumberDigits) => {
                return {
                    type: stateNumber.type,
                    min: limit === "min" ? e.currentTarget.value : stateNumber.min,
                    max: limit === "max" ? e.currentTarget.value : stateNumber.max,
                }
            })
        }
        return numbers.map ((number: number) => {
                return (
                    <DropdownItem as="button"
                                  //@ts-ignore
                                  onClick={(event: any) => dynamicallySetDigits(event, stateNumber, limit)}
                                  value={number}
                                  key={stateNumber.type + limit}> {number}
                    </DropdownItem>
                )
            }
        )
    }

    const renderTimeDropdown = () => {
        const times = [10, 15, 30];
        const handleTimeChange = (e: React.SyntheticEvent) => {
            console.log(e.currentTarget);
            e.preventDefault();
            setMaxTime((e.currentTarget as any).value);
        }
        return times.map((time: number) => {
            return (
                <DropdownItem as="button"
                              onClick={handleTimeChange}
                              value={time + " seconds"}
                              key={time}> {time + " seconds"}
                </DropdownItem>
            )
        })
    }

    return (
        <div>
            <Navbar/>
            <Accordion defaultActiveKey={gameMode}>
                <AccordionItem eventKey="compete">
                    <Accordion.Header> COMPETE </Accordion.Header>
                    <Accordion.Body>
                       <Form id="compete" onSubmit={() => {navigate("/play/hell")}}>
                           <Form.Group className="mb-3" controlId="Competitive">
                               <Form.Label> Randomized Digit Constraints </Form.Label>
                               <Row>
                                   <ButtonGroup>
                                       <DropdownButton
                                           variant="outline-primary"
                                           title={firstNumberDigits.min === 0 ? "Min digits for first" : firstNumberDigits.min}
                                           id="input-group-dropdown-1"
                                           children={renderDigitDropdown(firstNumberDigits, "min")}
                                       />
                                       <DropdownButton
                                           variant="outline-primary"
                                           title={firstNumberDigits.max === 0 ? "Max digits for first" : firstNumberDigits.max}
                                           id="input-group-dropdown-2"
                                           children={renderDigitDropdown(firstNumberDigits, "max")}/>
                                   </ButtonGroup>
                               </Row>
                               <Row>
                                   <ButtonGroup>
                                       <DropdownButton
                                           variant="outline-primary"
                                           title={secondNumberDigits.min === 0 ? "Min digits for second" : secondNumberDigits.min}
                                           id="input-group-dropdown-1"
                                           children={renderDigitDropdown(secondNumberDigits, "min")}
                                       />
                                       <DropdownButton
                                           variant="outline-primary"
                                           title={secondNumberDigits.max === 0 ? "Max digits for second" : secondNumberDigits.max}
                                           id="input-group-dropdown-1"
                                           children={renderDigitDropdown(secondNumberDigits, "max")}
                                       />
                                   </ButtonGroup>
                               </Row>
                               <Form.Label> Time Constraint </Form.Label>
                               <DropdownButton
                                   variant="outline-primary"
                                   title={maxTime === 0 ? "Select Max Time" : maxTime}
                                   id={"input-group-dropdown-2"}
                                   children={renderTimeDropdown()}
                               />
                           </Form.Group>
                           <Button type="submit"> PLAY </Button>
                       </Form>
                    </Accordion.Body>
                </AccordionItem>
                <AccordionItem eventKey="practice">
                    <Accordion.Header> PRACTICE </Accordion.Header>
                    <Accordion.Body>
                        <Form id="practice">
                            <label className="form-label" htmlFor="compete"> 1st param </label>
                            <input className="form-control" value="something" onChange={() => {console.log("yeah dat")}}/>
                        </Form>
                    </Accordion.Body>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Play;