import React from "react";
import Navbar from "../shared/nav-bar/navbar.component";

const Leaderboard = (props: any) => {
        return (
            <div>
                <Navbar/>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username</th>
                        <th scope="col">streak</th>
                        <th scope="col">category</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>jijioo</td>
                        <td>69</td>
                        <td>3x2</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
}

export default Leaderboard;