import { useState } from "react";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3000/api/auth/login"
      : "http://localhost:3000/api/auth/register";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login/Register failed"); // 🔥 NEW
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data); // 🔥 triggers re-render immediately
      })
      .catch((err) => {
        alert(err.message); // 🔥 prevent blank screen
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-950 p-6 rounded-xl border border-yellow-400 w-80"
      >
        <h2 className="text-2xl mb-4 text-yellow-400 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <input
            className="w-full p-2 mb-2 bg-blue-800 border border-yellow-400 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="w-full p-2 mb-2 bg-blue-800 border border-yellow-400 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-2 bg-blue-800 border border-yellow-400 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-yellow-400 text-black py-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="mt-3 text-center cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create account" : "Already have an account?"}
        </p>
      </form>
    </div>
  );
}

export default Auth;
