import {useEffect, useState} from "react";

export const Clock = (props: any) => {
    const [time, setTime] = useState(props.time);

    useEffect(() => {
        if (props.stop) return;
        if (time <= 0) {
            props.handleTimeOut(true);
            props.handleError(true);
            return;
        }
        const timer = setInterval(() => setTime(time - 1), 1000);
        return () => clearInterval(timer);
    }, [time, props.stop]);

    useEffect(() => {
        setTime(props.time);
    }, [props.stop]);

    return (
        <h1 key={props.stop}>
            Time Left: {time}
        </h1>
    );
}
