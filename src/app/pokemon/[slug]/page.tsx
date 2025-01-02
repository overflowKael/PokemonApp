import { PokemonStructure } from "@/lib/pokemonJSON";
import PokemonClient from "./pokemonClient";
import {  redirect } from "next/navigation";
import { Metadata } from "next";
import { ListPokemons , Pokemon} from "@/lib/pokemonJSON";

type Props = {
    params:  Promise<{slug : string}>;
};
export async function generateStaticParams() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data : ListPokemons = await response.json();
    const pokemons = data.results;
    return pokemons.map((pokemon : Pokemon , index : number)=>({
        slug: (index + 1).toString()
    }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

    if(!response.ok){
        return Promise.resolve({
            title: 'Redirecting...',
            description: `El pokemon no fue encontrado`,

        });
    }

    const data: PokemonStructure = await response.json();
    return Promise.resolve({
        title: data.name,
        description: `Descripcion del pokemon ${data.name}`,
        keywords: `pokemon, pokemon ${data.name}, pokemon ${data.name} descripcion, pokemon ${data.name} sprites, pokemons, pokedex`,
    });
}

export default async function PokemonPage({ params }: Props) {
    const { slug } = await params; // `params` no necesita ser `await` aquí, ya que es un objeto ya disponible

    if(isNaN(Number(slug))){
        slug.toLowerCase();
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

    if (!response.ok) {
        redirect('/');
        
    }

    const data: PokemonStructure = await response.json();

    const id = data.id.toString();

    return <PokemonClient data={data} id={id} />;
}