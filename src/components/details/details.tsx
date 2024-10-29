import female from "../../assets/test.png"
import male from "../../assets/male.png"
import laod from "../../assets/loading.gif"
import { Radar } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, CategoryScale, LinearScale, BarElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


interface Pro {
one : any
}
interface Stat {
  base_stat: number;
  stat: { name: string };
}
const Details:React.FC<Pro> = ({ one }) => {
  const colors=(x:string)=> {
    if (x === "grass") {
      return "#78C850"; 
    } else if (x === "fire") {
      return "#F08030"; 
    } else if (x === "water") {
      return "#6890F0"; 
    } else if (x === "bug") {
      return "#A8B820"; 
    } else if (x === "dark") {
      return "#705848"; 
    } else if (x === "dragon") {
      return "#7038F8"; 
    } else if (x === "fairy") {
      return "#F0B6BC"; 
    } else if (x === "fighting") {
      return "#C03028"; 
    } else if (x === "flying") {
      return "#A890F0";
    } else if (x === "ghost") {
      return "#705898";
    } else if (x === "ground") {
      return "#E0C068";
    } else if (x === "poison") {
      return "#A040B0";
    } else if (x === "psychic") {
      return "#F85888";
    } else if (x === "rock") {
      return "#B8A038"; 
    } else if (x === "steel") {
      return "#B8B8D0"; 
    } else {
      return "#FFFFFF"; 
    }
  }
  const formatStatName = (name: string) => {
    switch (name) {
      case 'hp': return '#FF5C5C';
      case 'attack': return '#FFAA00';
      case 'defense': return '#FFD700';
      case 'special-attack': return '#7ABFFF';
      case 'special-defense': return '#8CD17D';
      case 'speed': return '#FF88AA';
      case 'total': return '#6D72C3';
      default: return name.toUpperCase();
    }
  };
 
  




    return (
      
  <div className="flex flex-col gap-10 p-6  w-full max-w-md mx-auto rounded-lg min-h-[100%] ">
    {one && <> <div className="relative">
    <img  src={Object.keys(one).length>1 ? one.sprites.other.dream_world.front_default : laod} className="w-[150px] mt-[-60px] ml-32 self-center h-[150px] rounded-lg " />
    
  </div>

  
  <ul className="space-y-10 text-gray-800">
    <li className="text-lg font-semibold text-gray-500">
      #{Object.keys(one).length>1 ? one.order : "###"}
    </li>
    <li className="text-lg font-extrabold capitalize  text-gray-500">
      <h1>{Object.keys(one).length>1 ? one.name : "......"}</h1>
    </li>

    <li className="flex gap-2 justify-center">
        <span style={{backgroundColor:colors(one.stats && one.types[0].type.name)}}  className=" text-green-800 px-2 py-1 rounded-md text-sm">
        {Object.keys(one).length>1  ? one.types[0].type.name : "###"}
        </span>
        {Object.keys(one).length>1 && one.types.length>1 ?  <span style={{backgroundColor:colors(one.types[one.types.length-1].type.name)}}  className=" text-green-800 px-2 py-1 rounded-md text-sm">
          {one.types[one.types.length-1].type.name}
        </span> : ""}
    </li>

    <li className="justify-items-center">
      <h3 className="font-semibold">Base Experience</h3>
      
      <p style={{ padding:5,width:"20%",borderRadius:25 ,marginTop:10,backgroundColor:"transparent",color:"black",boxShadow:"0px 1px 1px 2px rgba(0,0,0,0.4)"}} >{one.base_experience}XP</p>
    </li>
<li><h3 className="font-semibold">Abilities</h3>
</li>
    <li className="flex gap-2 justify-center">
        <span style={{boxShadow:"0px 1px 1px 2px rgba(0,0,0,0.6)"}}  className="bg-transparent text-grey px-2 py-1 rounded-xl text-sm font-semibold">
          {Object.keys(one).length>1  ? one.abilities[0].ability.name : ""}
        </span>
        {Object.keys(one).length>1&& one.abilities.length>1 ?  <span style={{boxShadow:"0px 1px 1px 2px rgba(0,0,0,0.6)"}} className="bg-transparent text-grey px-2 py-1 rounded-xl border-red-500  text-sm font-semibold">
        {one.abilities[1].ability.name} 

        </span>: ""}
    </li>

    <li>      
    </li>

    <li className="flex gap-2 justify-center">
     
        <span  className=" px-2 py-1 rounded-md text-sm font-semibold">
        <h3 className="font-semibold">Weight</h3>
        </span>
        <span  className=" px-2 py-1 rounded-md text-sm font-semibold">
        <h3 className="font-semibold">Height</h3>
        </span>
        
    
    </li>
    <li className="flex gap-2 justify-center">
       
        <span  style={{backgroundColor:"transparent",color:"black",boxShadow:"0px 1px 1px 2px rgba(0,0,0,0.6)"}}  className=" px-2 py-1 rounded-md text-sm font-semibold">
        {one.weight} KG
        </span>
        <span style={{backgroundColor:"transparent",color:"black",boxShadow:"0px 1px 1px 2px rgba(0,0,0,0.6)"}}  className=" px-2 py-1 rounded-md text-white text-sm font-semibold">
       {Object.keys(one).length>1 && String(one.height)[1] ? `${String(one.height)[0]},${String(one.height)[1]} M `: `0,${String(one.height)[0]}M` } 
        </span>
        
       
    </li>
    <li>
      <h3 className="font-semibold">Stats:</h3>

      
    
    </li>
    <li> <div className="flex flex-col items-center space-y-6 mt-4">
      <div className="flex space-x-4 justify-center">
        {one.stats && one.stats.map((stat:any, index:number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-16 h-16 rounded-full text-white shadow-md"
            style={{
              backgroundColor: formatStatName(stat.stat.name),
            }}
          >
            <p className="font-bold text-xs text-gray-600">{stat.stat.name}</p>
            <p className="text-lg">{stat.base_stat}P</p>
          </div>
        ))}
        
      </div>

      
    </div>
    </li>
  </ul> </>}
  
</div>
    )
  };

  export default Details