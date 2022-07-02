import './App.css';
import {Link} from "react-router-dom";

import {Outlet} from "react-router-dom";

function App() {
    return (
        <div>
            <h1>Power plant navigation</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                    width: "50%",
                    margin: "0 auto"
                }}
                className={"columns"}
            >
                <Link to="/information"
                      className={'button industrialButton is-rounded'}>
                    Information</Link>
                <Link to="/reception"
                      className={'button industrialButton is-rounded'}>Reception</Link>
                <Link to="/controlroom"
                      className={'button industrialButton is-rounded'}><span>Control<br/>Room</span></Link>
                <Link to="/resetprogress"
                      className={'button industrialButton is-rounded'}><span>Reset<br/>Progress</span></Link>
            </nav>
            <Outlet/>
        </div>

    );
}

export default App;
