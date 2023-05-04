import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  //const idRef = useRef(1);
  
  //console.log(idRef)

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:8080/user");
      setUsers(response.data);
      //console.log(users.map((user)=>(user.id)))
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <h1>Users</h1>
        {users.map((user, i) => (
          <table>
            <thead>
              <tr>
                <td>UserId</td>
                <td>Username </td>
                <td>Initial Budget</td>
                <td>Outcomes</td>
                <td>Incomes</td>
                <td>Balance</td>
              </tr>
            </thead>
            <thead>
              <tr key={i}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.initial_budget}</td>
                <td>{user.total_outcomes}</td>
                <td>{user.total_incomes}</td>

                <td>{user.balance}</td>
              
              </tr>
            </thead>
          </table>
        ))}
      </div>
    </>
  );
}

export default App;
