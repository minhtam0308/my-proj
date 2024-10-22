import { FaBars } from "react-icons/fa";
import "./Admin.scss"
import SideBar from "./sidebar";
import { useState } from "react";

import { Outlet } from "react-router-dom";





const Admin = (props) => {
    const [controlbar, setControlba] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-slidebar">
                <SideBar collapsed={controlbar} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => { return setControlba(!controlbar) }} />
                </div>
                <div className="admin-mid">

                    <Outlet />
                </div>


            </div>

        </div>
    )
}
export default Admin;
