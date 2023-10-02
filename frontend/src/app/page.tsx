"use client";
import FormTodo from "@/components/FormTodo/FormTodo";
import { Todo } from "@/components/Todo";
import Navbar from "@/components/navbar/Navbar";
import React, { useEffect, useState } from "react";

export default function Home() {
  interface todoProps {
    id: string;
    title: string;
    description: string | null;
    color: string;
    favorite: boolean;
  }
  const [data, setData] = useState<todoProps[]>([]);
  const [favorites, setFavorites] = useState<todoProps[] | null>();
  const [originalData, setOriginalData] = useState<todoProps[]>([]);
  const [refreshTodos, setRefreshTodos] = useState(false);
  const [updateTodo, setUpdateTodo] = useState<string | null>(null);
  const [filterByColor, setFilterByColor] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = "http://localhost:3003/todos";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setOriginalData((prevState) => []);
          setData((prevState) => []);
          setFavorites((prevState) => null);
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        setOriginalData((prevState) => data.todos);
        const favoritesTodos = data.todos.filter((todo: todoProps) => {
          return todo.favorite === true;
        });
        if (favoritesTodos.length >= 1) {
          setFavorites((prevState) => favoritesTodos);
        } else {
          setFavorites((prevState) => null);
        }
        const todos = data.todos.filter((todo: todoProps) => {
          return todo.favorite !== true;
        });
        if (todos.length >= 1) {
          setData((prevState) => todos);
        } else {
          setData((prevState) => []);
        }
        setData((prevState) => todos);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, []);

  useEffect(() => {
    if (refreshTodos) {
      const apiUrl = "http://localhost:3003/todos";

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(apiUrl, requestOptions)
        .then((response) => {
          if (!response.ok) {
            setOriginalData((prevState) => []);
            setData((prevState) => []);
            setFavorites((prevState) => null);
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then((data) => {
          setOriginalData((prevState) => data.todos);
          const favoritesTodos = data.todos.filter((todo: todoProps) => {
            return todo.favorite === true;
          });
          if (favoritesTodos.length >= 1) {
            setFavorites((prevState) => favoritesTodos);
          } else {
            setFavorites((prevState) => null);
          }
          const todos = data.todos.filter((todo: todoProps) => {
            return todo.favorite !== true;
          });
          if (todos.length >= 1) {
            setData((prevState) => todos);
          } else {
            setData((prevState) => []);
          }
          setData((prevState) => todos);
          setRefreshTodos((prevState) => false);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }, [refreshTodos]);

  useEffect(() => {
    if (filterByColor === null) {
      const todos = originalData.filter((todo: todoProps) => {
        return todo.favorite !== true;
      });
      setData((prevState) => todos);
    } else {
      const filteredData = originalData.filter((todo: todoProps) => {
        return todo.color === filterByColor && todo.favorite === false;
      });
      setData((prevState) => filteredData);
    }
  }, [filterByColor]);

  return (
    <React.Fragment>
      <Navbar filterTodo={setFilterByColor} />
      <main className="max-w-sm md:max-w-7xl mx-auto flex flex-col flex-1 items-center px-3 w-full">
        <>
          <FormTodo refreshTodo={setRefreshTodos} updateTodo={updateTodo} />
        </>
        <section className="w-full">
          {favorites && <p>Favoritos</p>}
          <div className="flex flex-wrap justify-start gap-2">
            {favorites !== null &&
              favorites?.map((todo) => (
                <Todo.Root key={todo.id} color={todo.color}>
                  <Todo.Header
                    title={todo.title}
                    favoriteStatus={todo.favorite}
                  />
                  <Todo.Content description={todo.description} />
                  <Todo.Footer
                    id={todo.id}
                    refreshTodo={setRefreshTodos}
                    updateTodo={setUpdateTodo}
                  />
                </Todo.Root>
              ))}
          </div>
        </section>
        <section className="w-full">
          {data.length > 0 && <p>Outros</p>}
          <div className="flex flex-wrap justify-start gap-2">
            {data.length > 0 &&
              data.map((todo) => (
                <Todo.Root key={todo.id} color={todo.color}>
                  <Todo.Header
                    title={todo.title}
                    favoriteStatus={todo.favorite}
                  />
                  <Todo.Content description={todo.description} />
                  <Todo.Footer
                    id={todo.id}
                    refreshTodo={setRefreshTodos}
                    updateTodo={setUpdateTodo}
                  />
                </Todo.Root>
              ))}
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
