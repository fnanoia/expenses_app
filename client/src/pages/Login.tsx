import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TUserForm } from "../types/User";

export const Login = () => {
  const [user, setUser] = useState<TUserForm>({
    email: "",
    password: "",
    initial_budget: 0
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
      <div>
        <h1>Log in</h1>
        <form
          onSubmit={() => {
            return false;
          }}
        >
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="email"
              onChange={handleChange}
              value={user.email}
              name="email"
            />

            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              value={user.password}
              name="password"
            />

            <button type="button" onClick={handleSubmit}>
              Log in
            </button>
          </div>
        </form>

        <p>
          <a href="/register">Sign up</a>
        </p>
        <p>
          <a href="/">Back home</a>
        </p>
      </div>
    </>
  );
};
