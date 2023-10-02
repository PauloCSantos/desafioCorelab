import Image from "next/image";
import eyedropper from "../../../public/eyeDropper.svg";
import pencil from "../../../public/pencil.svg";
import xMarker from "../../../public/xMarker.svg";
import { Dispatch, SetStateAction } from "react";

interface TodoFooterProps {
  id: string;
  refreshTodo: Dispatch<SetStateAction<boolean>>;
  updateTodo: Dispatch<SetStateAction<string | null>>;
}

export const TodoFooter = ({
  id,
  refreshTodo,
  updateTodo,
}: TodoFooterProps) => {
  const handleUpdate = (id: string) => {
    updateTodo(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    const apiUrl = "http://localhost:3003/todo";

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };
  return (
    <div className="flex items-center justify-between p-3">
      <button onClick={() => handleUpdate(id)}>
        <div className="flex items-center gap-2">
          <Image src={pencil} width={18} height={18} alt="pencil icon" />
          <Image
            src={eyedropper}
            width={18}
            height={18}
            alt="eye dropper icon"
          />
        </div>
      </button>
      <div>
        <button onClick={() => handleDelete(id)}>
          <Image src={xMarker} width={18} height={18} alt="x marker icon" />
        </button>
      </div>
    </div>
  );
};
