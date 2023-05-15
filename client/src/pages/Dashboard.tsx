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
        {user.incomes.map((income, i) => (
          <Incomes
            description={income.description}
            amount={income.amount}
            income_method={income.income_method}
            income_type={income.income_type}
            key={i}
          />
        ))}
      </div>

      <h2>Outcomes</h2>
      <div>
        {user.outcomes.map((outcome, i) => (
          <Outcomes
            description={outcome.description}
            amount={outcome.amount}
            outcome_method={outcome.outcome_method}
            outcome_type={outcome.outcome_type}
            key={i}
          />
        ))}
      </div>
    </>
  );
};
