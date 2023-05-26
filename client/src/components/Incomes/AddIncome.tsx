import React from "react";
import { useState } from "react";
import axios from "axios";
import { TIncomes } from "../../types/Incomes";
import { useParams } from "react-router-dom";

export const AddIncome: React.FC<any> = () => {
  //id for axios
  const params = useParams();

  const [income, setIncome] = useState<TIncomes>({
    description: "",
    amount: 1,
    income_type: "",
    income_method: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Validar si el valor ingresado es un número válido
    const isValidNumber = !Number.isNaN(parseFloat(value));

    setIncome({
      ...income,

      //cambiar el tipo de dato de los formularios de string a number
      [name]: isValidNumber ? parseFloat(value) : value,
    });
  };

  async function handleSubmit() {
    try {
      const res = await axios.post<TIncomes>(
        `http://localhost:8080/user/${params.id}/income`,
        income
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-7 sm:p-6 xl:p-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Add Income</h3>
            <span className="text-base font-normal text-gray-500">
              Here you can add your incomes
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <form className="min-w-full divide-y divide-gray-200">
                  {/*BELOW DIV FLEX-WRAP*/}
                  <div className="flex -mx-3 mb-6">
                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Description"
                      >
                        Description
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        id="description"
                        onChange={handleChange}
                        value={income.description}
                        name="description"
                        required
                      />
                    </div>

                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="amount"
                      >
                        Amount
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="number"
                        id="amount"
                        onChange={handleChange}
                        value={income.amount}
                        name="amount"
                        required
                      />
                    </div>

                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Income_type"
                      >
                        Income_type
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        id="income_type"
                        onChange={handleChange}
                        value={income.income_type}
                        name="income_type"
                        required
                      />
                    </div>

                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="Income_method"
                      >
                        Income_method
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        id="income_method"
                        onChange={handleChange}
                        value={income.income_method}
                        name="income_method"
                        required
                      />
                    </div>

                    <div className="w-full flex justify-center  md:px-3 mt-4  ">
                      <button
                        className=" appearance-none block w-full h-2/3 bg-gray-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tightleading-tight hover:bg-gray-500 focus:outline-none focus:bg-white focus:border-gray-500"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
