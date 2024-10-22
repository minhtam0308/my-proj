import "./Admin.scss"

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink } from 'react-icons/fa';
import sidebarBg from '../../asset/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaReact } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <div className="admin-slidebar">
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',


                        }}
                    >
                        <FaReact color={"blue"} size={"3em"} />
                        <NavLink to="/" style={{ textDecoration: "none" }}>Tamhacker</NavLink>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            <Link to="/admin" />
                            dashboard
                        </MenuItem>
                        <MenuItem icon={<FaGem />}>component</MenuItem>
                    </Menu>

                    <Menu iconShape="circle">
                        <SubMenu
                            title={"Features"}
                            icon={<FaRegLaughWink />}
                        >

                            <MenuItem>
                                Quản lý Users
                                <Link to="/admin/manage-users" />
                            </MenuItem>
                            <MenuItem>Quản lý bài Quiz</MenuItem>
                            <MenuItem>Quản lý câu hỏi</MenuItem>
                        </SubMenu>

                    </Menu>


                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />

                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Tamhackers
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </div>

    )
}
export default SideBar;