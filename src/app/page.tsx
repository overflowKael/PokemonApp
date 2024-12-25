import { List } from "postcss/lib/list";
import { ReactElement } from "react";
import Image from 'next/image';
import { geist } from '../fonts/index';
import { geist_Mono } from '../fonts/index';
interface ListPokemons {
  count : number , 
  next? : string, 
  previous? : string , 
  results : Pokemon[];
}

interface Pokemon {
  name : string; 
  url : string;
  id : number;
  image : string;
}

export default async function Home() {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data: ListPokemons = await res.json();
  const pokemons = data.results;

  pokemons.forEach((pokemon : Pokemon , index : number )=>{
    pokemons[index].id = index + 1;
    pokemons[index].image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${index+1}.svg`
  })
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-primary">Pokemon App</span>
      </h1>

      <ul className="flex flex-wrap w-[80%] gap-5 mt-5 justify-center">
        {
          pokemons.map((pokemon : Pokemon , index : number)=>{
            return (
              <li key={pokemon.name} className={`flex flex px-4 py-5 border-2 rounded-lg ${geist.className} items-center`}>
                <Image src={pokemon.image} alt={`${pokemon.name} image`} width={200} height={200} ></Image>
                <div id="pokemon-info" className=" flex flex-col h-full items-center px-4 ">
                <h1 className="text-2xl ">  Pokemon { index + 1 }</h1>
                <a  className="text-2xl font-bold self-center" href={pokemon.url} target="_blank" rel="noreferrer">
                  {pokemon.name}
                </a>
                </div>
                
              </li>
            )
          })
        }
      </ul>
      
    </main>
  );
}


