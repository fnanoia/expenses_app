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
    setUser({
      ...user,
      [name]: value,
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
    <div>
      <h1>Register</h1>
      <form
        onSubmit={() => {
          return false;
        }}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            //onChange={(e) => setEmail(e.target.value)}
            onChange={handleChange}
            value={user.email}
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            //onChange={(e) => setPassword(e.target.value)}
            onChange={handleChange}
            value={user.password}
            name="password"
          />
          <label htmlFor="initial_budget">Initial budget</label>
          <input
            type="number"
            id="initial_budget"
            //onChange={(e) => setUsername(e.target.value)}
            onChange={handleChange}
            value={user.initial_budget}
            name="initial_budget"
          />

          <button type="button" onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
      <p>
        <a href="/">Back home</a>
      </p>
      <p>
        <a href="/login">Sign in</a>
      </p>
    </div>
  );
};
