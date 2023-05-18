import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TUser } from "../types/User";
import { User } from "../components/User";
import { Incomes } from "../components/Incomes";
import { Outcomes } from "../components/Outcomes";
import { UserState } from "../states/User_state";

export const Dashboard = () => {
  //id for axios
  const params = useParams();

  //states
  const [user, setUser] = useState<TUser>(UserState);

  //effects
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `http://localhost:8080/user/${params.id}`
      );
      setUser(response.data);
    };

    getUser();
  }, []);

  return (
    <>
      <h2>My Expenses</h2>
      <User
        email={user.email}
        initial_budget={user.initial_budget}
        total_outcomes={user.total_outcomes}
        total_incomes={user.total_incomes}
        balance={user.balance}
      />
      <h2>Incomes</h2>
      <div>
        <Incomes user_incomes={user.incomes} />
      </div>

      <h2>Outcomes</h2>
      <div>
        <Outcomes user_outcomes={user.outcomes}/>
      </div>
    </>
  );
};
