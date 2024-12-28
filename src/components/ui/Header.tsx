"use client";
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { geist } from "../../fonts";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";

export const Header = () => {
    const [pokemonId, setPokemonId] = useState<number>(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setPokemonId(prev => {
                const newId = prev + 1;
                return newId > 151 ? 1 : newId;
            })
        }, 10000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <Navbar shouldHideOnScroll maxWidth="2xl" className={`h-[100px] ${geist.className}`} >
            <NavbarBrand>
                <Link href="/" className="flex items-center" >
                    <Image className="transition-all duration-300ms ease-in-out" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} alt="icono de pokemon" width={80} height={100} />
                    <h1 className="max-sm:text-[40px] text-[60px] font-bold text-red-600">P</h1>
                    <h2 className="max-sm:text-[22px]  text-[32px] font-semibold">okemon</h2>

                </Link>
            </NavbarBrand>

            <NavbarContent justify="end">
                <NavbarItem className="ml-auto">
                    <Link href="/favorites" className="flex ml-auto">
                        <h1 className=" max-sm:text-[22px] text-[32px] font-semibold">Favoritos</h1>
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>

    )
} 
