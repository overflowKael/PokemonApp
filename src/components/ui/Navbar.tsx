import Image from "next/image"
export const Navbar = () => {
  return ( 
    <div className="flex w-full items-center justify-start py-0 px-4 bg-secondary h-[100px]">
        <div className="flex items-center">
            <h1 className="text-4xl font-bold">P</h1>
            <h2 className="text-2xl font-bold">okemon</h2>
            <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="icono de pokemon" width={70} height={70}/>
        </div>
        <div className="flex ml-auto">
            <h1 className="text-2xl font-bold">Favoritos</h1>
        </div>
    </div>
)} 
