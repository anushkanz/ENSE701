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
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

//Create NavBar
const PopulatedNavBar = () => {
    //Create Return
    //Check token
    const token = Cookies.get('token');
    const [isActive, setIsActive] = useState('');
   
    useEffect(()=>{
        console.log(token)
            if(token){
                setIsActive(token);
            }
    },[token])
        
    return (
        //Start NavBar
        <NavBar>
            <NavItem>SPEED</NavItem>
            <NavItem route="/login" end>Login</NavItem>
        </NavBar>        
    );
};
//Export NavBar
export default PopulatedNavBar;