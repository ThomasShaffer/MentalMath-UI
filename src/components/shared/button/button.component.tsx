import React from "react";
import "./button.css";

const CustomButton = (props: any) => {
    return (
        <button type={props.type ? props.type : "button"}
                className="btn btn-primary btn-lg spaced"
                onClick={props.functionToUse}
                key={props.keyName}
        >
            {props.buttonName}
        </button>
    )
}

export default CustomButton;
