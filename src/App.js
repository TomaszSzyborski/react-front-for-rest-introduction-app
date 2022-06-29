import './App.css';
import { Link } from "react-router-dom";


import { Outlet } from "react-router-dom";

function App() {
  return (
          <div>
      <h1>Power plant navigation</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/information">Information</Link> |{" "}
        <Link to="/reception">Reception</Link> |{" "}
        <Link to="/controlroom">Control Room</Link> |{" "}
        <Link to="/resetprogress">Reset Progress</Link> |{" "}
      </nav>
              <Outlet />
        </div>

  );
}

export default App;
