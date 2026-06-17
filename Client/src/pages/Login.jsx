import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [username,
  setUsername] =
  useState("");

  const [password,
  setPassword] =
  useState("");

  const [error,
  setError] =
  useState("");

  const navigate =
  useNavigate();

  const handleLogin =
  async (e) => {

    e.preventDefault();

    try {

      const response =
      await API.post(

        "/auth/login",

        {
          username,
          password,
        }

      );

      localStorage.setItem(

        "token",

        response.data.token

      );

      localStorage.setItem(

        "role",

        response.data.role

      );

      localStorage.setItem(

        "username",

        response.data.username

      );

      if (
        response.data.role ===
        "Admin"
      ) {

        navigate("/admin-orders");

      }

      else if (
          response.data.role ===
          "Kitchen"
        ) {

          navigate(
            "/kitchen-orders"
          );

        }

      else if (
        response.data.role ===
        "RoomService"
      ) {

        navigate(
          "/room-service"
        );

      }

      else if (
        response.data.role ===
        "Manager"
      ) {

        navigate("/menu-management");

      }

    } catch (error) {

      setError(

        error.response?.data
        ?.message ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="

    min-h-screen

    flex

    items-center

    justify-center

    bg-gray-100

    ">

      <div className="

      bg-white

      p-8

      rounded-3xl

      shadow-lg

      w-full

      max-w-md

      ">

        <h1 className="

        text-3xl

        font-bold

        text-center

        mb-6

        ">

          Downtown Login

        </h1>

        {error && (

          <p className="

          text-red-500

          mb-4

          text-center

          ">

            {error}

          </p>

        )}

        <form
        onSubmit={
          handleLogin
        }>

          <input

            type="text"

            placeholder="Username"

            value={username}

            onChange={(e) =>

              setUsername(
                e.target.value
              )

            }

            className="

            w-full

            border

            p-3

            rounded-xl

            mb-4

            "

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>

              setPassword(
                e.target.value
              )

            }

            className="

            w-full

            border

            p-3

            rounded-xl

            mb-4

            "

          />

          <button

            type="submit"

            className="

            w-full

            bg-green-600

            hover:bg-green-700

            text-white

            p-3

            rounded-xl

            font-semibold

            "

          >

            Login

          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;