import {ButtonGroup, DropdownButton, InputGroup} from "react-bootstrap";
import React from "react";
import * as gameSettings from "../../../types/GameTypes";
import DropdownItem from "react-bootstrap/DropdownItem";

export const CustomNumberRange = (props: any) => {
    return (
        <ButtonGroup>
            <InputGroup>
                <InputGroup.Text>{props.ordinalType.type} Number Range</InputGroup.Text>
                <DropdownButton
                    variant="outline-primary"
                    title={props.ordinalType.min === 0 ? "Min digits for first" : props.ordinalType.min}
                    id="input-group-dropdown-1-{ordinal}"
                    children={renderDigitDropdown(props.ordinalType, props.handleChange, "min")}
                />
                <DropdownButton
                    variant="outline-primary"
                    title={props.ordinalType.max === 0 ? "Max digits for first" : props.ordinalType.max}
                    id="input-group-dropdown-2-{ordinal}"
                    children={renderDigitDropdown(props.ordinalType, props.handleChange, "max")}
                />
            </InputGroup>
        </ButtonGroup>
    )
}

export const renderDigitDropdown = (stateNumber: gameSettings.NumberDigits, handleChange: any, limit: string) => {
    const numbers = [1,2,3,4];

    const dynamicallySetDigits = (e: any, stateNumber: gameSettings.NumberDigits, handleChange: any, limit: string) => {
        e.preventDefault();
        handleChange({
                type: stateNumber.type,
                min: limit === "min" ? e.currentTarget.value : stateNumber.min,
                max: limit === "max" ? e.currentTarget.value : stateNumber.max,
            }
        )
    }
    return numbers.map((number: number, index: number) => {
            return (
                <DropdownItem as="button"
                              onClick={(event: any) => dynamicallySetDigits(event, stateNumber, handleChange, limit)}
                              value={number}
                              key={stateNumber.type + limit + index}> {number}
                </DropdownItem>
            )
        }
    )
}
