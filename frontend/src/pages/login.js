import { useState ,useEffect} from "react";
import API from "../../services/api";
import { useReducer } from "react";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            router.push("/dashboard");
        }
    },[]);

    const[form, setForm] = useState({
        email: "",
        password: "",
    });

    const onChangeEmail = e => {
        setForm({...form, email: e.target.value});
    }

    const onChangePassword = e => {
        setForm({...form, password: e.target.value});
    }

    const submit = async(e) => {
        e.preventDefault();
        try{
            const res= await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            
            router.push("/dashboard");
        }catch {
            alert("Login failed")
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center">
            <form className="bg-white p-10 rounded-lg w-full md:w-1/2 shadow-md flex flex-col space-y-4" onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <input
            id="email"
            placeholder="Email"
            className="border p-2"
            onChange={onChangeEmail}
            />
            <label htmlFor="password">Password</label>
            <input
            id="password"
            placeholder="Password"
            className="border p-2"
            onChange={onChangePassword}
            />
            <div>
                <button 
                    type="submit" 
                    className="py-1 px-4 rounded-xl bg-blue-600 text-amber-50 cursor-pointer hover:bg-gray-400">
                        Login</button>
            </div>
            </form>
            </div>
        
    )
}