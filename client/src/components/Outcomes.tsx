import React from "react";
import { TOutcomes } from "../types/Outcomes";

export const Outcomes: React.FC<TOutcomes> = ({
  description,
  amount,
  outcome_method,
  outcome_type,
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
            <td>{outcome_method}</td>
            <td>{outcome_type}</td>
          </tr>
        </thead>
      </table>
    </>
  );
};
