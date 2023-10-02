import Image from "next/image";
import searchIcon from "../../../public/searchIcon.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface SearchbarProps {
  filterTodo: Dispatch<SetStateAction<string | null>>;
  resetSearch: boolean;
}
const Searchbar = ({ filterTodo, resetSearch }: SearchbarProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (resetSearch === true) {
      setSelectedValue((prevState) => "");
      filterTodo(null);
    }
  }, [resetSearch]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue((prevState) => value);
    if (value === "") {
      filterTodo(null);
    } else {
      filterTodo(value);
    }
  };
  return (
    <div className="flex text-xs md:text-xl md:ms-10 shadow-2xl border border-gray-100">
      <select
        id="color-select"
        name="color"
        value={selectedValue}
        onChange={handleSelect}
      >
        <option value="" defaultValue="">
          Escolha uma cor para filtar
        </option>
        <option value="red">Vermelho</option>
        <option value="blue">Azul</option>
        <option value="MediumSpringGreen	">Verde</option>
        <option value="OliveDrab">Amarelo</option>trocar
        <option value="orange">Laranja</option>
        <option value="SlateBlue">Roxo</option>
        <option value="pink">Rosa</option>
        <option value="brown">Marrom</option>
        <option value="DarkGray">Cinza</option>
        <option value="grey31">Cinza Escuro</option> trocar
        <option value="gold">Dourado</option>
        <option value="silver">Prateado</option>
      </select>
      <Image className="md:hidden" src={searchIcon} width={15} height={15} alt="Search icon" />
      <Image className="hidden md:block" src={searchIcon} width={20} height={20} alt="Search icon" />
    </div>
  );
};

export default Searchbar;
