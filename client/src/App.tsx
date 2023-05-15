import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:id" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

/*
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
*/
