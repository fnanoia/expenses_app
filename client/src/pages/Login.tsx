import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TUserForm } from "../types/User";

export const Login = () => {
  const [user, setUser] = useState<TUserForm>({
    email: "",
    password: "",
    initial_budget: 0,
  });

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  async function handleSubmit() {
    try {
      const res = await axios.post<TUserForm>(
        "http://localhost:8080/auth/login",
        user
      );
      const userData = res.data;

      //guardar el id y token
      const userId = userData.user.id;

      navigate(`/dashboard/${userId}`);
      //return res;
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Login to your account</h2>
        <span className="text-sm">
          or{" "}
          <a href="/register" className="text-blue-500">
            register a new account
          </a>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Email"
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
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500"
                type="button"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
