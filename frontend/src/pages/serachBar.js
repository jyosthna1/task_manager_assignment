import { useState } from "react";
import axios from "axios";

function TaskSearch() {
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!taskId) return setError("Please enter a Task ID");

    setLoading(true);
    setError("");
    setTask(null);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if protected
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        config
      );
      setTask(data);
    } catch (err) {
      setError(err.response?.data?.message || "Task not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Search Task
      </button>

      {loading && <p className="mt-2">Loading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {task && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
}

export default TaskSearch;