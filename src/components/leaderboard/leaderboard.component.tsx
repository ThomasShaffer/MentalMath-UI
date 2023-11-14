import React, {useEffect, useState} from "react";
import Navbar from "../shared/nav-bar/navbar.component";
import {type} from "os";

const Leaderboard = (props: any) => {


    type LeaderboardData = {
        data: Array<StreakData>;
    }

    type StreakData = {
        username: string,
        streak: number,
        category: string
    }


    const [filter, setFilter] = useState('');
    const [data, setData] = useState<LeaderboardData>({data: []});


    const handleData = (leaderBoardData : LeaderboardData) => {
        setData(leaderBoardData);
        const lbdata = leaderBoardData.data;
        for (let i = 0 ; i<lbdata.length ; i++) {
            console.log(lbdata[i]);
        }
    }

    useEffect(() => {
        const request = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        try {
            fetch('/leaderboard', request)
                .then(response => response.json())
                .then(data => handleData(data))
        } catch (error) {
            console.log(error);
        }

    },[]);


     const leaderboardRow = () => {
       return data.data.map( (entry: StreakData, key: number) => {
            return (
                <tr key={"row"+key+1}>
                    <th scope="row">{key+1}</th>
                    <td key={"username"+key+1}>{entry.username}</td>
                    <td key={"streak"+key+1}>{entry.streak}</td>
                    <td key={"category"+key+1}>{entry.category}</td>
                </tr>
            )
        });
    }

    // @ts-ignore
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
                {leaderboardRow()}
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboard;
