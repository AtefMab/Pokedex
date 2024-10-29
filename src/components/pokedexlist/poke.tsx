import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_POKEMON_STATS = gql`
  query GetPokemonStats {
    pokemons(first: 100) {
      id
      name
      stats {
        baseStat
        stat {
          name
        }
      }
    }
  }

`;
//didnt work 
const Pok: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POKEMON_STATS);

  if (loading) return <div>Loading Pokémon...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 text-black">
        hejdnqknqkld
      <h1 className="text-2xl font-bold mb-4 text-black">Pokémon Stats</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">HP</th>
            <th className="border border-gray-300 p-2">Attack</th>
            <th className="border border-gray-300 p-2">Defense</th>
            <th className="border border-gray-300 p-2">Speed</th>
          </tr>
        </thead>
        <tbody>
          {data.pokemons.map((pokemon: any) => {
            const stats = pokemon.stats.reduce((acc: any, stat: any) => {
              acc[stat.stat.name] = stat.baseStat;
              return acc;
            }, {});

            return (
              <tr key={pokemon.id}>
                <td className="border border-gray-300 p-2">{pokemon.name}</td>
                <td className="border border-gray-300 p-2">{stats.hp || 0}</td>
                <td className="border border-gray-300 p-2">{stats.attack || 0}</td>
                <td className="border border-gray-300 p-2">{stats.defense || 0}</td>
                <td className="border border-gray-300 p-2">{stats.speed || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Pok;
