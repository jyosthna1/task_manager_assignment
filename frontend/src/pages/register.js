import { useState,useEffect } from "react";
import API from "../../services/api";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  useEffect(() => {
          const token = localStorage.getItem("token");
          if(token) {
              router.push("/dashboard");
          }
      },[]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      setForm({
        name: "",
        email: "",
        password: "",
      });
      alert("Registered Successfully");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-10 rounded-lg w-full md:w-1/2 shadow-md flex flex-col space-y-4">
      <input
        placeholder="Name"
        className="border p-2"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="border p-2"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="bg-blue-600 text-white px-4 py-2">
        Register
      </button>
    </form>
    </div>
  );
}