"use client";
import { PokemonStructure } from "@/lib/pokemonJSON";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { geist } from "@/fonts";
import { useGlobalContext } from "../../contexts/globalContext";
import { useEffect , useState} from "react";
import { toast } from "sonner";

export default function Pokemon({data , id} : { data : PokemonStructure , id : string}) {
  
  const { addFavorites , favorites } = useGlobalContext();
  const [pokemonId , setPokemonId] = useState<number>(1);
  const [ isFavorite , setIsFavorite] = useState<boolean>(false);

  useEffect(()=>{
    if(!pokemonId || !favorites) return;
    setPokemonId(Number(id));
    setIsFavorite(favorites.includes(pokemonId.toString()));
  } ,[favorites,pokemonId])
  
  

  const handleClick = () =>{
    if(isFavorite){
      toast.info(`Pokemon ${data?.name} ya esta en tus favoritos`);
      return;
    }
    addFavorites(pokemonId.toString());
    toast.success(`Pokemon ${data?.name} agregado a favoritos`);
  }
  

  return (
    <div className={`bg-black w-full justify-center relative flex justify-center ${geist.className}`}>
  <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20 gap-y-10 w-full   max-w-[1500px] py-20 px-5 md:px-10  items-start">
    <div className="flex flex-col sm:col-span-1 min-w-[300px] w-full">
      <div className="max-h-[400px] sm:max-h-[450px] w-full rounded-2xl bg-secondary flex justify-center items-center">
        <Image src={data?.sprites.other?.dream_world?.front_default} width="100%" height={500} alt={`${data?.name} Image`} />
      </div>
    </div>
    <div className="flex  rounded-2xl bg-secondary flex-col   sm:col-span-2  py-5 px-10 gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 content-center">
        <h1 className={`lg:text-[60px] text-[50px] capitalize font-semibold ${geist.className} sm:justify-self-start justify-self-center`}>{data?.name}</h1>
        <Button variant="ghost" className={`my-auto max-w-[200px] text-[18px] font-semibold  sm:ml-auto sm:justify-self-start justify-self-center ${isFavorite ? 'border-4 border-emerald-600' : ''}`} onClick={()=>handleClick()}>
          { isFavorite ? 'Favorito' : 'Agregar a Favoritos'}
        </Button>
      </div>
      <div className="flex flex-col w-full gap-y-5">
        <h1 className={`text-[32px] font-semibold `}> Sprites: </h1>
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-5 w-full flex-wrap items-between mx-auto content-center justify-items-center">
          <Image src={data?.sprites.front_default}   alt={`${data?.name} Front Image`} />
          <Image src={data?.sprites.back_default}  alt={`${data?.name} Back Image`} />
          <Image src={data?.sprites.front_shiny}  alt={`${data?.name} Shiny Image`} />
          <Image src={data?.sprites.back_shiny}   alt={`${data?.name} Back Shiny Image`} />
        </div>
      </div>
      
    </div>
  </div>
</div>
  )
}   