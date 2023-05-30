import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOutcomes } from "../../types/Outcomes";
import { useParams } from "react-router-dom";
import { UserContext } from "../../conext/UserContext";
import { TUserContextType } from "../../types/User";

export const AddOutcome: React.FC<any> = () => {
  //id for axios
  const params = useParams();

  //context calls
  const { userToken } = useContext(UserContext) as TUserContextType;

  //state handler
  const [outcome, setOutcome] = useState<TOutcomes>({
    description: "",
    amount: 1,
    outcome_type: "",
    outcome_method: "",
  });

  //reset form after submit
  const resetForm = () => {
    setOutcome({
      description: "",
      amount: 1,
      outcome_type: "",
      outcome_method: "",
    });
  };

  //handle data to submit
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Validar si el valor ingresado es un número válido
    const isValidNumber = !Number.isNaN(parseFloat(value));

    setOutcome({
      ...outcome,

      //cambiar el tipo de dato de los formularios de string a number
      [name]: isValidNumber ? parseFloat(value) : value,
    });
  };

  //submitting data to DB
  async function handleSubmit() {
    try {
      const res = await axios.post<TOutcomes>(
        `http://localhost:8080/user/${params.id}/outcome`,
        outcome,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      resetForm();
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Add Outcome
            </h3>
            <span className="text-base font-normal text-gray-500">
              Here you can add your outcomes
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
                        value={outcome.description}
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
                        value={outcome.amount}
                        name="amount"
                        required
                      />
                    </div>

                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="outcome_type"
                      >
                        Outcome_type
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        id="outcome_type"
                        onChange={handleChange}
                        value={outcome.outcome_type}
                        name="outcome_type"
                        required
                      />
                    </div>

                    <div className="w-full md:w-full px-3 mb-6">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="outcome_method"
                      >
                        Outcome_method
                      </label>
                      <input
                        className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                        type="text"
                        id="outcome_method"
                        onChange={handleChange}
                        value={outcome.outcome_method}
                        name="outcome_method"
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
