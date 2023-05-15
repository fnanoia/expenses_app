import React from "react";
import { TIncomes } from "../types/Incomes";

export const Incomes: React.FC<TIncomes> = ({
  description,
  amount,
  income_method,
  income_type,
}) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Description </td>
            <td>Amount</td>
            <td>Method</td>
            <td>Type</td>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>{description}</td>
            <td>{amount}</td>
            <td>{income_method}</td>
            <td>{income_type}</td>
          </tr>
        </thead>
      </table>
    </>
  );
};
