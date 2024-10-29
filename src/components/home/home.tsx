import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card/card";
import load from "../../assets/loading.gif";
import Details from "../details/details";
import { LeftOutlined, ReloadOutlined, RightOutlined } from "@ant-design/icons";
import Navbar from "../nav/navbar";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PokemonType {
  type: {
    name: string;
  };
}

interface Pokemon {
  url: string;
  name: string;
  types: PokemonType[];
  stats: any;
  weight: number;
}

const Home: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [hov, sethov] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultPokemonList, setDefaultPokemonList] = useState<Pokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [one, setOne] = useState<Pokemon | null>(null);
  const [lim, setLim] = useState(9);
  const [offset, setOffset] = useState(0); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [weightFilter, setWeightFilter] = useState<string | null>(null);
  const [attackFilter, setAttackFilter] = useState<string | null>(null);
  const [defenseFilter, setDefenseFilter] = useState<string | null>(null);

  const typeOptions = [
    "grass", "fire", "water", "bug", "dark", "dragon", "fairy", "fighting",
    "flying", "ghost", "ground", "poison", "psychic", "rock", "steel",
  ];
  const statOptions = ["0-29", "20-59", "60-89", "90-100"];
  const weightOptions = ["0-50", "51-100", "101-150", "151-200"];

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${screen.width > 1800 ? lim : 5}&offset=${offset}`)
      .then(async (response: any) => {
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon: Pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              ...pokemon,
              types: details.data.types,
              stats: details.data.stats,
              weight: details.data.weight,
            };
          })
        );
        setPokemonList(pokemonData);
        setDefaultPokemonList(pokemonData); 
        setFilteredPokemonList(pokemonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [lim,offset]);

  const fetchTypes = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const types = response.data.results.map((type: { name: string }) => type.name);
      setPokemonTypes(types);
    } catch (error) {
      console.error("Error fetching Pokémon types:", error);
    }
  };
 
 const handleNextPage = () => {
   setOffset(offset+9)
   setCurrentPage(currentPage+1)
  };

  const handlePreviousPage = () => {
    if (offset === 0) {
      setOffset(0);
      setCurrentPage(1);
    }
    else {
        setOffset(offset-9)
        setCurrentPage(currentPage-1)
    }
  };
  const applyFilters = () => {
    let filteredList = [...defaultPokemonList];

    if (searchQuery) {
      if (searchQuery.startsWith(">")) {
        const hpThreshold = parseInt(searchQuery.substring(1), 10);
        filteredList = filteredList.filter((pokemon) =>
          pokemon.stats.some((stat: any) => stat.stat.name === "hp" && stat.base_stat > hpThreshold)
        );
      } else {
        filteredList = filteredList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    if (typeFilter) {
      filteredList = filteredList.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === typeFilter)
      );
    }

    if (weightFilter) {
      const [min, max] = weightFilter.split("-").map(Number);
      filteredList = filteredList.filter(
        (pokemon) => pokemon.weight >= min && pokemon.weight <= max
      );
    }

    if (attackFilter) {
      const [min, max] = attackFilter.split("-").map(Number);
      filteredList = filteredList.filter((pokemon) =>
        pokemon.stats.some(
          (stat: any) =>
            stat.stat.name === "attack" && stat.base_stat >= min && stat.base_stat <= max
        )
      );
    }

    if (defenseFilter) {
      const [min, max] = defenseFilter.split("-").map(Number);
      filteredList = filteredList.filter((pokemon) =>
        pokemon.stats.some(
          (stat: any) =>
            stat.stat.name === "defense" && stat.base_stat >= min && stat.base_stat <= max
        )
      );
    }

    
    setFilteredPokemonList(filteredList);
  };

  const resetFilters = () => {
    setTypeFilter(null);
    setWeightFilter(null);
    setAttackFilter(null);
    setDefenseFilter(null);
    setSearchQuery("");
    setFilteredPokemonList(defaultPokemonList); 
  };

  useEffect(() => {
    applyFilters();
  }, [typeFilter, weightFilter, attackFilter, defenseFilter, searchQuery]);

  const sortPokemon = (property: string) => {
    const sortedList = [...pokemonList];
    sortedList.sort((a, b) => {
      if (property === "name") return a.name.localeCompare(b.name);
      if (property === "namereverse") return b.name.localeCompare(a.name);
      return 0;
    });
    setFilteredPokemonList(sortedList);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newOffset = (page - 1) * 9; 
    setOffset(newOffset);
  
    
  };
  return (
    <>
      <div style={{ width: screen.width - 100, marginLeft: screen.width > 1800 ? "-20%" : "0", backgroundColor: "#F5F7F8" }} className="w-full h-full flex mt-48">
     <Navbar  srch={setSearchQuery} />

        <div className="w-full mx-auto p-6 h-full" style={{ backgroundColor: "#F5F7F8" }}>
          <div className="flex flex-wrap justify-between items-center bg-transparent p-4 rounded-lg space-y-2 sm:space-y-0 h-full mb-20" style={{ width: "70%" }}>
                        <select onChange={(e) => sortPokemon(e.target.value)} className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto" style={{ width: "12%", borderRadius: 10 }}>
              <option value="">&#x2699; Sort</option>
              <option value="name">Sort by Name (A-Z)</option>
              <option value="namereverse">Sort by Name (Z-A)</option>
            </select>
            <select value={typeFilter || ""} onChange={(e) => setTypeFilter(e.target.value || null)} className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto" style={{ width: "12%", borderRadius: 10 }}>
                            <option value="">&#x2699; Types</option>
                            {typeOptions.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                        <select
              value={weightFilter || ""}
              onChange={(e) => setWeightFilter(e.target.value || null)}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto"
              style={{ width: "12%", borderRadius: 10 }}
            >
              <option value="">&#x2696; Weight</option>
              {weightOptions.map((weight, index) => (
                <option key={index} value={weight}>{weight}</option>
              ))}
            </select>

                        <select value={attackFilter || ""} onChange={(e) => setAttackFilter(e.target.value || null)} className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto" style={{ width: "12%", borderRadius: 10 }}>
                            <option value="">&#x2694; Attack</option>
                            {statOptions.map((stat, index) => (
                                <option key={index} value={stat}>{stat}</option>
                            ))}
                        </select>

                        <select value={defenseFilter || ""} onChange={(e) => setDefenseFilter(e.target.value || null)} className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto" style={{ width: "12%", borderRadius: 10 }}>
                            <option value="">&#x2237; Defense</option>
                            {statOptions.map((stat, index) => (
                                <option key={index} value={stat}>{stat}</option>
                            ))}
                        </select>

                        <button onClick={resetFilters} className="p-2 border border-gray-300 rounded-lg w-full sm:w-auto bg-transparent" style={{ width: "12%", borderRadius: 10 }}>
                            <div id="reset" onMouseEnter={() => sethov(true)} onMouseLeave={() => sethov(false)} className={hov ? "flex justify-center items-center text-gray-400" : "flex justify-center items-center text-gray-400 text-2xl"}>
                                {hov ? "Reset Filter!" : <ReloadOutlined />}
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
                        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8" style={{ rowGap: "12%" }}>
                            {filteredPokemonList.map((pok) => (
                                <Card get={setOne} url={pok.url} key={pok.name} />
                            ))}
                        </div>
                        {window.screen.width > 1800 ? (
                            <div className="lg:col-span-3 bg-white p-6 shadow-lg text-black rounded-3xl h-[87%] fixed top-32 right-64">
                                <Details one={one} /> 
                          </div>
                        ) : (
                            <><img src="../../"></img></>
                        )}
                        
                    </div>
                  
                         <Pagination
  onChange={(_, page) => handlePageChange(page)} 
  className="flex gap-[30%] mt-64 ml-[-25%] justify-center"
  count={100} 
  page={currentPage} 
  showFirstButton
  
  showLastButton
  size="large"
/>
                    
                </div>
               
      </div>
      
    </>
  );
};

export default Home;
