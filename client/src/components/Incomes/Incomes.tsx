import React from "react";
import { TIncomes } from "../../types/Incomes";
import { AddIncome } from "./AddIncome";

export const Incomes: React.FC<any> = ({ user_incomes }) => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-7 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Latest Incomes
            </h3>
            <span className="text-base font-normal text-gray-500">
              This is a list of latest incomes
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
                        Description
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Income Method
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Income Type
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {user_incomes.map((income: TIncomes) => (
                      <tr>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          {income.description}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {income.amount}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {income.income_method}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {income.income_type}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {income.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddIncome/>
    </>
  );
};
