import {useEffect, useState} from "react";

export const Clock = (props: any) => {
    const [time, setTime] = useState(props.time);
    const [stop, setStop] = useState(props.stop);

    useEffect(() => {
        if (stop) return;
        if (time <= 0) return;
        const timer = setInterval(() => setTime(time - 1), 1000);
        return () => clearInterval(timer);
    }, [time]);

    return (
        <h1>
            Time Left: {time}
        </h1>
    );
}
