import React, { useState } from 'react';
import home from "../../assets/homeblack.png"
import homered from "../../assets/homered.png"
import Search from '../search/search';
import pokedex from "../../assets/pokedex.png"
import pokedexred from "../../assets/pokedexred.png"
import { useNavigate } from 'react-router-dom';

interface Pro{

    srch:any
}
const Navbar: React.FC<Pro> = ({srch}) => {
   const [homepage,sethome]=useState(true)
   const [pokedexpage,setpokedex]=useState(false)


const navigate =useNavigate()
   
return (
  <nav className="flex  justify-stretch p-4  bg-white fixed top-0 w-full left-0" style={{zIndex:999999}}>
    <ul className="flex -space-x-2 text-lg font-semibold text-gray-700 w-full ">
      <li className="hover:text-red-500 cursor-pointer flex-1"><div onClick={()=>{
       window.location.reload()
      }} style={{display:"flex",justifyItems:"center",alignItems:"center", marginLeft:20,color:homepage ? "red" : "",transition:".8s ease-in-out"}}><img style={{maxWidth:70,transition:"1s ease-in-out"}} src={homepage ? homered : home}  />Home</div></li>
      <li className="hover:text-red-500 cursor-pointer flex-1"><Search onSearch={srch}/></li>
      <li className="hover:text-red-500 cursor-pointer"><div onClick={()=>{
        sethome(false);
        setpokedex(true);
      }} style={{display:"flex",justifyItems:"center",alignItems:"center",marginRight:20,color:pokedexpage ? "red" : ""}}><img style={{maxWidth:70,transition:"1s ease-in-out"}} src={pokedexpage ? pokedexred : pokedex}  />List</div> </li>
    </ul>
  </nav>
)};

export default Navbar;