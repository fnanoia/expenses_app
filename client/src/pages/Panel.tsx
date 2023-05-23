import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TUser } from "../types/User";
import { User } from "../components/User";
import { Incomes } from "../components/Incomes/Incomes";
import { Outcomes } from "../components/Outcomes/Outcomes";
import { UserState } from "../states/User_state";
import { NavBar } from "../components/NavBar";

export const Panel = () => {
  //id for axios
  const params = useParams();

  //states
  const [user, setUser] = useState<TUser>(UserState);

  //test toggle
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
  };

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
      <div>
        <NavBar />

        <div className="flex overflow-hidden bg-white pt-16">
          <aside
            id="sidebar"
            className="fixed  z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 hidden"
            aria-label="Sidebar"
          >
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span
                          className={
                            selectedCategory === "profile"
                              ? "active ml-3 flex-1 whitespace-nowrap"
                              : ""
                          }
                          onClick={() => handleCategoryChange("profile")}
                        >
                          My Profile
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                        </svg>
                        <span
                          className={
                            selectedCategory === "incomes"
                              ? "active ml-3 flex-1 whitespace-nowrap"
                              : ""
                          }
                          onClick={() => handleCategoryChange("incomes")}
                        >
                          Incomes
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                        </svg>
                        <span
                          className={
                            selectedCategory === "outcomes"
                              ? "active ml-3 flex-1 whitespace-nowrap"
                              : ""
                          }
                          onClick={() => handleCategoryChange("outcomes")}
                        >
                          Outcomes
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Balance
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                      >
                        <svg
                          className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Graphics
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
         

          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          >
            <main>
              <div className="pt-6 px-4">
                <div className="w-full  xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                  
                  {selectedCategory === "profile" && (
                    <User
                      email={user.email}
                      initial_budget={user.initial_budget}
                      total_outcomes={user.total_outcomes}
                      total_incomes={user.total_incomes}
                      balance={user.balance}
                    />
                  )}

                  {selectedCategory === "incomes" && (
                    <div>
                      <Incomes user_incomes={user.incomes} />
                    </div>
                  )}

                  {selectedCategory === "outcomes" && (
                    <div>
                      <Outcomes user_outcomes={user.outcomes} />
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
