"use client";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import pencil from "../../../public/pencil.svg";
import eyedropper from "../../../public/eyeDropper.svg";
import Star from "../Star/Star";

interface FormTodoProps {
  refreshTodo: Dispatch<SetStateAction<boolean>>;
  updateTodo: string | null;
}
const FormTodo = ({ refreshTodo, updateTodo }: FormTodoProps) => {
  useEffect(() => {
    if (updateTodo) {
      const apiUrl = `http://localhost:3003/todo/${updateTodo}`;

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setFormData((prevState) => ({
            title: data.title,
            description: data.description === null ? "" : data.description,
          }));
          setShowColors((prevState) => false);
          setSelectedColor((prevState) => data.color);
          setFavorite((prevState) => data.favorite);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }, [updateTodo]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [favorite, setFavorite] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState("blue");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const todoData = {
      ...formData,
      favorite,
      color: selectedColor,
      id: updateTodo,
    };
    console.log("Vou dar update")
    console.log(todoData)
    if (updateTodo) {
      const apiUrl = "http://localhost:3003/todo";

      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          refreshTodo(true);
          clearForm();
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    } else {
      const apiUrl = "http://localhost:3003/todo";

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          refreshTodo(true);
          clearForm();
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  const clearForm = () => {
    setFormData((prevState) => ({
      title: "",
      description: "",
    }));
    setShowColors((prevState) => false);
    setSelectedColor((prevState) => "blue");
    setFavorite((prevState) => false);
  };
  const toggleFavorite = () => {
    setFavorite((prevState) => !prevState);
  };

  const toggleColors = () => {
    setShowColors((prevState) => !prevState);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowColors(false);
  };

  const colors = [
    "red",
    "blue",
    "MediumSpringGreen	",
    "OliveDrab",
    "orange",
    "SlateBlue",
    "pink",
    "brown",
    "DarkGray",
    "grey31",
    "gold",
    "silver",
  ];

  return (
    <form
      className="border p-3 my-4 w-full max-w-[390px] border-gray-100 text-sm bg-white rounded-2xl"
      onSubmit={handleSubmit}
    >
      <div className="mb-1 flex justify-between">
        <input
          className="placeholder:text-black placeholder:font-bold text-black font-bold w-full"
          type="text"
          id="title"
          name="title"
          placeholder="Titulo"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={toggleFavorite}>
          <Star kind={favorite} />
        </button>
      </div>
      <hr />
      <div className="my-2">
        <textarea
          className="w-full resize-none"
          id="description"
          name="description"
          placeholder="Criar nota..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
        ></textarea>
      </div>
      <div className="flex gap-2">
        <button type="submit">
          <Image src={pencil} width={18} height={18} alt="pencil icon" />
        </button>
        <div className="relative w-full">
          <button className="h-full" type="button" onClick={toggleColors}>
            <Image
              src={eyedropper}
              width={18}
              height={18}
              alt="eyedropper icon"
            />
          </button>
          {showColors && (
            <div className="absolute w-auto max-w-[312px] z-10 flex gap-3 flex-wrap bg-white px-1 py-2 shadow-xl">
              {colors.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className={`rounded-full w-9 h-9`}
                  onClick={() => handleColorSelect(color)}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormTodo;
