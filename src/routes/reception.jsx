import axios from "axios";
import {useEffect, useRef, useState} from "react";
import React from "react";

// const registerPlantController = (setData, plantControllerName) => {
//     axios.post("http://0.0.0.0:9011/challenge/reactor/desk", {headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//     }})
//     .then(r =>
//         setData(r.data.message)
//     );
// }
// const eraseCall = (setData) => {
//     setData("")
// }


export default class Reception extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        //todo napierdalaj w resty
        event.preventDefault();
    }

    render() {
       return (
            <main style={{padding: "1rem 0"}}>
                <div>
                    Evening, Comrade!
                    <br/>
                    Let me fetch the keys, while you write your name in the workbook
                </div>
                <form>
                    <label>Registration at the desk</label>
                    <input type="text" name="Commander name"/>
                    <input type="submit" value="Register"/>
                </form>
            </main>
        );
    }
}
// export default function Reception() {
// return (
//     NameForm()
// )
// }