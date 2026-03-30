import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import TaskSearch from "./serachBar"

export default function Dashboard() {
    const router =useRouter();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
            return;
        }
        fetchTasks();
    },[]);

    const fetchTasks = async() => {
        const res = await API.get("/tasks");
        console.log(res.data)
        setTasks(res.data);
    };

    const createTask = async() =>{
        if (!title.trim()) return;
        await API.post("/tasks", {title});
        setTitle("");
        fetchTasks();
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
    };

    const updateTask = async (id) => {
  await API.put(`/tasks/${id}`, {
    title: editTitle,
  });

  setEditingId(null);
  setEditTitle("");
  fetchTasks();
};

    const deleteTask = async(id) => {
        await API.delete(`/tasks/${id}`);
        fetchTasks();
    };

    return(
        <div>
            <Navbar/>

            <div className="p-10">
                <h1 className="text-2xl mb-4">Dashboard</h1>
                <input
                    className="border p-2 mr-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    onClick={createTask}
                    className="bg-blue-400 text-white px-4 py-2 cursor-pointer">Add Task
                </button>
                <TaskSearch/>

                {tasks?.map((task) => (
  <div
    key={task._id}
    className="border p-2 mt-2 flex justify-between items-center"
  >
    {editingId === task._id ? (
      <>
        <input
          className="border p-1"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <button
          onClick={() => updateTask(task._id)}
          className="text-green-600 ml-2"
        >
          Save
        </button>
      </>
    ) : (
      <>
        <span>{task.title}</span>

        <div className="space-x-3">
          <button
            onClick={() => startEdit(task)}
            className="text-blue-500"
          >
            Edit
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      </>
    )}
  </div>
))}
            </div>
        </div>
    );
}