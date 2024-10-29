import axios from 'axios';
import React, { useEffect, useState } from 'react';
import load from "../../assets/loading.gif"
interface PokemonCardProps {
  url: string;
  get:any
}

interface Sta {
  base_stat: number;
  stat: any;
}

interface Typs {
  type: Typ;
}

interface Typ {
  name: string;
}

interface One {
  name: string;
  id: number;
  abilities: any;
  height: number;
  order: number;
  stats: Sta[];
  types: Typs[];
  weight: number;
}

const Card: React.FC<PokemonCardProps> = ({ url,get }) => {
  const [one, setOne] = useState<One | null>(null);
  const colors=(x:string)=> {
    if (x === "grass") {
      return "#78C850"; 
    } else if (x === "fire") {
      return "#F08030"; 
    }else if (x === "electric") {
        return "darkyellow"; 
      }else if (x === "nomal") {
        return "lightgrey"; 
      }else if (x === "fire") {
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
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setOne(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [url]);

  if (!one) {
    return <div><img width={"30%"} src={load} /></div>;
  }

  return (
    <div>
      <div   style={{ 
    boxShadow: "4px 12px 5px 2px lightgrey",
    transition: "transform 0.2s ease, box-shadow 0.2s ease" 
  }}
  className="text-black bg-white w-[100%] p-4 rounded-3xl shadow-md justify-items-center min-h-[100%] max-h-[100%]"
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "6px 14px 8px 3px gray";
    e.currentTarget.style.transform = "scale(1.05)"; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "4px 12px 5px 2px lightgrey";
    e.currentTarget.style.transform = "scale(1)"; 
  }}
  onClick={() => get(one)}>
        <img
style={{width: 100,
    marginTop: -74}}          src={`https://play.pokemonshowdown.com/sprites/xyani/${one.name.toLowerCase()}.gif`}
          alt={one.name}
          className={`w-[500px]  h-[120px] object-contain `}
        />
        <h3 className='text-gray-400 font-extrabold mt-7'>#{one.order}</h3>
                <h2 className="mt-2 text-center font-bold capitalize" >{one.name}</h2>

       
        <ul className={`flex flex-wrap mb-14 ${screen.width > 1800 ? "gap-6" : "gap-1"}`}><li style={{backgroundColor:colors(one.types[0].type.name)}} className={`rounded-lg p-2 w-20 `}>{one.types[0].type.name}</li>
        {one.types.length>1 ?<li style={{backgroundColor:colors(one.types[one.types.length-1].type.name)}} className={`rounded-lg p-1 w-20`}>  {one.types[one.types.length-1].type.name}</li>  : "" }
      </ul>
      </div>
    </div>
  );
};

export default Card;
