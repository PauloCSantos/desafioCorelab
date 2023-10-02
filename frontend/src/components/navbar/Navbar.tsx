import Image from "next/image";
import logo from "../../../public/coreNotesIcon.png";
import xMarker from "../../../public/xMarker.svg";
import Searchbar from "../Searchbar/Searchbar";
import { Dispatch, SetStateAction, useState } from "react";

interface NavbarProps {
  filterTodo: Dispatch<SetStateAction<string | null>>;
}

const Navbar = ({ filterTodo }: NavbarProps) => {
  const [resetSearch, setResetSearch] = useState(false);

  const handlerReset = () => {
    console.log("Resetando search")
    setResetSearch((prevState) => true);
    setTimeout(() => {
      setResetSearch((prevState) => false);
    }, 2000);
  };
  return (
    <nav className="flex w-full justify-between items-center bg-white p-3">
      <div className="flex items-center gap-2 md:hidden">
        <Image src={logo} width={18} height={18} alt="Logo icon"  />
        <p className="text-xs">CoreNotes</p>
        <Searchbar filterTodo={filterTodo} resetSearch={resetSearch} />
      </div>
      <button onClick={handlerReset} className="md:hidden">
        <Image src={xMarker} width={18} height={18} alt="Logo icon" />
      </button>



      <div className="hidden md:flex items-center gap-7">
        <Image src={logo} width={40} height={40} alt="Logo icon"  />
        <p className="text-3xl">CoreNotes</p>
        <Searchbar filterTodo={filterTodo} resetSearch={resetSearch} />
      </div>
      <button onClick={handlerReset} className="hidden md:flex">
        <Image src={xMarker} width={40} height={40} alt="Logo icon" />
      </button>
    </nav>
  );
};

export default Navbar;
