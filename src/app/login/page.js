"use client";
import React, { useState } from "react";
import signIn, { signOut } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("crendentials", {
      email: email,
      password: password,
    });
  };
  const handleSignOut = async () => {
    signOut({redirect: true, callbackUrl: "/"})
  }
  return (
    <>
      <div className="login">
        <input
          type="email"
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export default Login;
