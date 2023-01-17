import React, {MouseEventHandler, ReactEventHandler, SyntheticEvent, useState} from "react";
import Header from "../shared/header/header.component";
import Navbar from "../shared/nav-bar/navbar.component";
import {
    Accordion,
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup,
    Row,
    Stack
} from "react-bootstrap";
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

    const flushState = () => {
        setFirstNumberDigits({type: "first", min: 0, max: 0});
        setSecondNumberDigits({type: "second", min: 0, max: 0});
        setMaxTime(0);
    }

    const typeMethodMapper = {
        "first" : setFirstNumberDigits,
        "second" : setSecondNumberDigits
    }

    const renderDigitDropdown = (stateNumber: NumberDigits, limit: string) => {
        const numbers = [1,2,3,4];
        const dynamicallySetDigits = (e: any, stateNumber: NumberDigits, limit: string) => {
            e.preventDefault();
            //@ts-ignore
            typeMethodMapper[stateNumber.type]((stateNumber: NumberDigits) => {
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
            <Accordion defaultActiveKey={gameMode} onSelect={flushState}>
                <AccordionItem eventKey="compete">
                    <Accordion.Header> COMPETE </Accordion.Header>
                    <Accordion.Body>
                       <Form id="compete" onSubmit={() => {navigate("/play/hell")}}>
                           <Form.Group className="mb-3" controlId="Competitive">
                               <Stack gap={2}>
                               <Form.Label> Randomized Digit Constraints </Form.Label>
                               <Stack gap={2}>
                                   <ButtonGroup>
                                       <InputGroup>
                                           <InputGroup.Text>First Number</InputGroup.Text>
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
                                                   children={renderDigitDropdown(firstNumberDigits, "max")}
                                               />
                                       </InputGroup>
                                   </ButtonGroup>
                                   <ButtonGroup>
                                       <InputGroup>
                                           <InputGroup.Text> Second Number </InputGroup.Text>
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
                                       </InputGroup>
                                   </ButtonGroup>
                               </Stack>
                               <Form.Label> Time Constraint </Form.Label>
                                   <InputGroup>
                                       <InputGroup.Text> Max Time Alloted </InputGroup.Text>
                                       <DropdownButton
                                           variant="outline-primary"
                                           title={maxTime === 0 ? "Select Max Time" : maxTime}
                                           id={"input-group-dropdown-2"}
                                           children={renderTimeDropdown()}
                                       />
                                   </InputGroup>
                               </Stack>
                           </Form.Group>
                           <Stack gap={2} className="ms-auto">
                               <Button variant="secondary"> PLAY </Button>
                               <Button variant="outline-secondary" onClick={flushState}> CLEAR </Button>
                           </Stack>
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