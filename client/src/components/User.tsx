import React from "react";
import { TUser } from "../types/User";

export const User: React.FC<
  Omit<TUser, "password" | "incomes" | "outcomes">
> = ({ email, initial_budget, total_outcomes, total_incomes, balance }) => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-7 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">My profile</h3>
            <span className="text-base font-normal text-gray-500">
              This is your personal information
            </span>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Initial budget
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total outcomes
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total incomes
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        {email}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                        {initial_budget}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {total_outcomes}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {total_incomes}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {balance}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
