import { useState } from "react";
import axios from "axios";
import { TUserForm } from "../types/User";

export const Register = () => {
  const [user, setUser] = useState<TUserForm>({
    email: "",
    password: "",
    initial_budget: 1,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

     // Validar si el valor ingresado es un número válido
     const isValidNumber = !Number.isNaN(parseFloat(value));

    setUser({
      ...user,
      //cambiar el tipo de dato de los formularios de string a number
      [name]: isValidNumber ? parseFloat(value) : value,
    });
  };

  async function handleSubmit() {
    try {
      const res = await axios.post<TUserForm>(
        "http://localhost:8080/auth/register",
        user
      );
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Register your account</h2>
        <span className="text-sm">
          or{" "}
          <a href="/" className="text-blue-500">
            login to your account
          </a>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="email"
                id="email"
                onChange={handleChange}
                value={user.email}
                name="email"
                required
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                id="password"
                onChange={handleChange}
                value={user.password}
                name="password"
                required
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="initial_budget"
              >
                Initial budget
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="number"
                id="initial_budget"
                onChange={handleChange}
                value={user.initial_budget}
                name="initial_budget"
                required
              />
            </div>

            <div className="w-full md:w-full px-3 mb-6">
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                type="button"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
