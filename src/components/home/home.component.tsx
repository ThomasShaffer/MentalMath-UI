import React from "react";
import Navbar from "../shared/nav-bar/navbar.component";
import ErrorBoundary from "../shared/error/error-boundary.component";
import About from "../about/about.component";

const Homepage = (props: any) => {
    return (
            <ErrorBoundary>
                <Navbar/>
                <About/>
            </ErrorBoundary>
    )
}

export default Homepage