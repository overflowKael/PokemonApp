"use client";

import {Image} from "@nextui-org/image";
import NextImage from "next/image";
import { geist } from '../../fonts/index';
import { Divider} from "@nextui-org/divider";
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import { useRouter } from "next/navigation";
interface Pokemon {
    name : string; 
    url : string;
    id : number;
    image : string;
}
  


export const PokemonCard = ( {pokemon} : {pokemon : Pokemon}) =>{
  const router = useRouter();
  const handleClick = () =>{
    router.push(`/pokemon/${pokemon.id}`)
 }  
  return (
        <Card key={pokemon.id} isPressable={true} className='flex-grow max-sm:max-w-[300px] md:min-w-[300px]  max-w-[500px] rounded-lg bg-background flex-grow-1' shadow='md' onClick={handleClick}>
          <CardBody className='flex justify-center items-center'>
            <Image src={pokemon.image} alt={`${pokemon.name} Image`} isZoomed width={250} height={150 } as={NextImage} 
              className='rounded-lg w-full object-cover'
            />

          </CardBody>
          <Divider className="w-full" />
          <CardFooter className="flex px-4">
            <a  className={`text-2xl font-bold self-center capitalize ${geist.className}`} href={pokemon.url} target="_blank" rel="noreferrer">
              {pokemon.name}
            </a>  
            <p className="ml-auto text-xl font-bold"> # {pokemon.id}</p>
          </CardFooter>
        </Card>
      )
}