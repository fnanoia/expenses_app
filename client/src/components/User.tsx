import React from "react";
import { TUser } from "../types/User";

export const User: React.FC<
  Omit<TUser, "password" | "incomes" | "outcomes">
> = ({ email, initial_budget, total_outcomes, total_incomes, balance }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Username </td>
            <td>Initial Budget</td>
            <td>total_Outcomes</td>
            <td>total_Incomes</td>
            <td>Balance</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>{email}</td>
            <td>{initial_budget}</td>
            <td>{total_outcomes}</td>
            <td>{total_incomes}</td>
            <td>{balance}</td>
          </tr>
        </thead>
      </table>
    </>
  );
};
