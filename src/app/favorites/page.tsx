"use client";
import { useGlobalContext } from "../contexts/globalContext";
import { useState, useEffect } from "react";
import { PokemonStructure } from '../../lib/pokemonJSON';
import { geist } from "@/fonts";
import { PokemonCard } from "@/components/pokemons-components/PokemonCard";
import { Pokemon } from "@/lib/pokemonJSON";
export default function Favorites() {
    const { favorites } = useGlobalContext();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    console.log('pokemons', favorites);

    useEffect(() => {
        const fetchPokemons = async () => {

            const fetchedPokemons: Pokemon[] = [];
            for (let i = 0; i < favorites.length; i++) {
                const pokemonId = favorites[i];

                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data: PokemonStructure = await response.json();
                const thisPokemon: Pokemon = {
                    name: data.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
                    id: Number(pokemonId),
                    image: data.sprites.other?.dream_world?.front_default
                }
                fetchedPokemons.push(thisPokemon);
            }

            setPokemons(fetchedPokemons);
        }   
            
            if(favorites.length > 0){       
                fetchPokemons();
            }

        }, [favorites]);
    return (
        <section className={`flex flex-col items-center justify-center py-20 bg-black ${geist.className} `}>
            <h1 className="text-[40px] font-bold">Pokemons Favoritos</h1>
            <div className="flex flex-wrap w-[95%] gap-10 mt-5 justify-center">
                {
                    pokemons.map((pokemon: Pokemon, index: number) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))
                }
            </div>
        </section>

    )
}
