import {DropdownButton, InputGroup} from "react-bootstrap";
import React from "react";
import DropdownItem from "react-bootstrap/DropdownItem";

export const CustomTimeConstraint = (props: any) => {
    return (
        <InputGroup>
            <InputGroup.Text> Max Time Allotted </InputGroup.Text>
            <DropdownButton
                variant="outline-primary"
                title={props.maxTime === 0 ? "Select Max Time" : props.maxTime}
                id={"input-group-dropdown-2"}
                children={renderTimeDropdown(props.handleChange)}
            />
        </InputGroup>
    )
}

export const renderTimeDropdown = (handleTimeChange: any) => {
    const times = [10, 15, 30];
    const handleChange = (e: React.SyntheticEvent) => {
        console.log(e.currentTarget);
        e.preventDefault();
        handleTimeChange((e.currentTarget as any).value);
    }
    return times.map((time: number, index: number) => {
        return (
            <DropdownItem as="button"
                          onClick={handleChange}
                          value={time}
                          key={time + index}> {time + " seconds"}
            </DropdownItem>
        )
    })
}
