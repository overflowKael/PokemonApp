import { PokemonStructure } from "@/lib/pokemonJSON";
import PokemonClient from "./pokemonClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params:  Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    const data: PokemonStructure = await response.json();
    return Promise.resolve({
        title: data.name,
        description: `Descripcion del pokemon ${data.name}`,
        keywords: `pokemon, pokemon ${data.name}, pokemon ${data.name} descripcion, pokemon ${data.name} sprites, pokemons, pokedex`,
    });
}

export default async function Pokemon({ params }: Props) {
    const { slug } = await params; // `params` no necesita ser `await` aquí, ya que es un objeto ya disponible

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

    if (response.status !== 200) {
        notFound();
    }

    const data: PokemonStructure = await response.json();

    if (data.id < 1 || data.id > 151) {
        notFound();
    }

    const id = data.id.toString();

    return <PokemonClient data={data} id={id} />;
}