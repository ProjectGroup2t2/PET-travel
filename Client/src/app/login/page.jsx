"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Facebook } from "lucide-react";

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors }, } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.username,
          password: data.password,
        }),
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error.message);
      }
  
      const userRole = result.user.roles || "User"; 
  
      localStorage.setItem("jwt", result.jwt);
      localStorage.setItem("user", JSON.stringify(result.user));
  
      if (userRole.toLowerCase() === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("username", { type: "manual", message: error.message });
    }
    setLoading(false);
  };
  
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/login-pic.png"
          alt="Scenic Travel Destination"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center flex flex-col items-center">
          <Image src="/logo.svg" width={300} height={300} alt="PET SEA TRAVEL" />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-[0px] space-y-4">
            <input
              type="text"
              placeholder="USERNAME"
              {...register("username", { required: "Username is required" })}
              className="w-80 p-3 border rounded-full"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            <input
              type="password"
              placeholder="PASSWORD"
              {...register("password", { required: "Password is required" })}
              className="w-80 p-3 border rounded-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <button type="submit" disabled={loading} className="w-80 bg-[#2D776E] text-white p-3 rounded-full">
              {loading ? "Logging in..." : "LOGIN"}
            </button>
          </form>
          <div className="w-full flex items-center justify-center my-4">
            <div className="flex-1 border-t-2 border-gray-300"></div>
            <p className="text-sm mx-4 text-gray-500">OR CONTINUE WITH</p>
            <div className="flex-1 border-t-2 border-gray-300"></div>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="text-xl">Google</button>
            <button className="text-xl flex items-center gap-2">
              <Facebook size={20} /> Facebook
            </button>
          </div>
          <p className="mt-4 text-base">
            NOT A MEMBER?{" "}
            <a href="/register" className="text-[#2D776E] font-semibold">
              REGISTER NOW
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
