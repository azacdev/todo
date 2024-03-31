import { useEffect, useState } from "react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  isEditing?: boolean;
}

interface EditTaskProps {
  editingTask: Task | null;
  handleDeleteTask: (id: string) => void;
  handleSaveTask: (newText: string) => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  editingTask,
  handleDeleteTask,
  handleSaveTask,
}) => {
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    if (editingTask) {
      setEditText(editingTask.text);
    }
  }, [editingTask]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
    if (editText.trim() !== "") {
      handleSaveTask(editText);
      setEditText("");
    }
  };

  return (
    <div className="w-[635px] bg-[#F3F3F3] relative">
      <header className="bg-[#3556AB] text-white font-medium flex gap-5 p-3 flex-col justify-between items-center h-[123px]">
        <h1 className="text-2xl">Edit Task</h1>
      </header>

      <div className="px-4 pt-4">
        <h3 className="text-base">Task Name</h3>

        <div className="mt-4">
          <input
            type="text"
            value={editText}
            onChange={handleChange}
            className="w-full p-2 mt-2 border rounded text-[#0D2972]"
          />
        </div>
      </div>

      <div className="absolute bottom-3 flex gap-4 w-full text-white px-4 pt-4">
        <button
          onClick={() => handleDeleteTask(editingTask?.id || "")}
          className="bg-[#AB3535] text-lg h-[61px] w-[121px] font-medium rounded-md"
        >
          Delete
        </button>
        <button
          onClick={handleSave}
          className="h-[61px] w-full text-lg bg-[#3556AB] rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTask;
