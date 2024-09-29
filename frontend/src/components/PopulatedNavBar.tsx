/**
 * ENSE701 2024 S02
 * Written by Anushka Ransinghe
 * Editied by Ramona Matautia & Vishal Nirmalan
 * NavBar Code,
 * This is code for creating site wide menu,
 * This code created on as componenet
 */

//Important Libs 
import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

//Create NavBar
const PopulatedNavBar = () => {
    //Create Return
    return (
        //Start NavBar
        <NavBar>
            <NavItem>SPEED</NavItem>
            <NavItem route="/" end>Home</NavItem>
            <NavItem dropdown route="/articles">Articles <IoMdArrowDropdown />
                <NavDropdown>
                        <NavItem route="/articles">View articles</NavItem>
                        <NavItem route="/articles/new">Submit new</NavItem>
                </NavDropdown>
            </NavItem>
        </NavBar>
    );
};
//Export NavBar
export default PopulatedNavBar;