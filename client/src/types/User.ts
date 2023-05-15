import { TIncomes } from "./Incomes";
import { TOutcomes } from "./Outcomes";

export type TUserForm = {
  email: string;
  password: string;
  initial_budget: number;
};

export type TUser = TUserForm & {
  total_incomes: number;
  total_outcomes: number;
  balance: number;
  incomes: TIncomes[];
  outcomes: TOutcomes[];
};
