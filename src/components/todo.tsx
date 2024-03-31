import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import avatar from "../assets/avatar.png";
import trophy from "../assets/trophy.png";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}

interface TodoProps {
  tasks: Task[];
  inputValue: string;
  handleAddTask: () => void;
  handleToggleComplete: (id: string) => void;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleStartEditing: (task: Task) => void;
}

const Todo: React.FC<TodoProps> = ({
  tasks,
  inputValue,
  handleAddTask,
  handleStartEditing,
  handleToggleComplete,
  setInputValue,
}) => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);

  const toggleAddTask = () => {
    setIsAddTaskVisible((prev) => !prev);
  };

  return (
    <div className="custom-shadow bg-[#F3F3F3] w-[414px] z-20">
      <header className="custom-shadow bg-[#3556AB] flex gap-5 pl-5 py-3 h-[123px]">
        <img src={avatar} alt="avatar" className="w-[50px] h-[50px]" />
        <div className="text-white">
          <h1 className="text-base">Hello, John</h1>
          <p className="italic text-[25px]">
            What are your plans <br /> for today?
          </p>
        </div>
      </header>

      <div className="relative flex items-center bg-[#CDE53D] pl-5 p-4 h-[116px] gap-5">
        <img src={trophy} alt="trophy icon" />
        <span className="text-[18px] text-[#071D55] font-bold">
          Go Pro Upgrade Now
        </span>
        <div className="absolute right-10 top-0 bg-[#071D55] w-[66.11px] h-[71px] text-[#F2C94C] text-lg font-medium flex items-center justify-center">
          $1
        </div>
      </div>

      {isAddTaskVisible && (
        <div className="flex my-4 px-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add new task..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            onClick={handleAddTask}
            className="bg-[#3556AB]  text-white p-2 rounded-r"
          >
            Add
          </button>
        </div>
      )}

      <ul className="list-none pt-4 flex flex-col items-center px-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center mb-2 w-full h-[91px] bg-white rounded-md px-4"
          >
            <label className="flex items-center cursor-pointer mr-auto">
              <div className="relative">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <div className="toggle-checkbox w-8 h-8 rounded-full border-2 border-gray-300 transition-all duration-300 ease-in-out flex items-center justify-center">
                  {task.completed && (
                    <span className="text-gray-600 bg-green-600 w-full h-full rounded-full items-center flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
              <span
                className={`ml-4 text-base font-medium ${
                  task.completed ? "text-[#8D8D8D]" : "text-[#071D55]"
                }`}
              >
                {task.text}
              </span>
            </label>

            <button
              onClick={() => handleStartEditing(task)}
              className="justify-end ml-auto text-[#071D55] text-base font-medium w-[51px] h-[45px] border border-[[#071D55]"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      <button
        className="rounded-full bg-[#3556AB] w-[60px] h-[60px] flex items-center justify-center ml-auto mr-3 my-4"
        onClick={toggleAddTask}
      >
        {isAddTaskVisible ? (
          <RxCross1 className="text-[21px] text-white" />
        ) : (
          <IoMdAdd className="text-[21px] text-white" />
        )}
      </button>
    </div>
  );
};

export default Todo;
