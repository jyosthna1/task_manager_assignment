import Link from "next/link";

export default function Navbar() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return(
        <div className="bg-white text-black flex gap-5 p-5">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>

            <button type="button" onClick={logout}>Logout</button>
        </div>
    )
}