import React, {ErrorInfo} from "react";

interface IProps {
    children: any;
}

interface IState {
   errorMessage: string;
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state =  {
            errorMessage: ""
        };
    }
    static getDerivedStateFromError(error: Error) {
        return {
            errorMessage: error.toString()
        };
    }

    componentDidCatch(error:Error, info:ErrorInfo) {
        this.logErrorToServices(error.toString(), info.componentStack);
    }

    // A fake logging service.
    logErrorToServices = console.log;

    render() {
        if (this.state.errorMessage) {
            return <p>{this.state.errorMessage}</p>;
        }
        return this.props.children;
    }
}
