import { PokemonCard } from "../components/pokemons-components/pokemon-card";
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
    <main className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold">
        Welcome to <span className="text-primary">Pokemon App</span>
      </h1>

      <ul className="flex flex-wrap w-[90%] gap-10 mt-5 justify-center">
        {
          pokemons.map((pokemon : Pokemon , index : number)=>(
            <PokemonCard pokemon={pokemon} key={index}/>
          ))
        }
      </ul>
      
    </main>
  );
}


