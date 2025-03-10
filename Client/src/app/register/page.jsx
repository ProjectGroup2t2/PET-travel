"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Facebook } from "lucide-react";
import { useState } from "react";

const Register = () => {
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );

      console.log("Register Success:", response.data);
      router.push("/"); 
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
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
          <Image
            src="/logo.svg"
            width={300}
            height={300}
            alt="PET SEA TRAVEL"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full mt-[0px] space-y-4"
          >
            <input
              {...register("username")}
              type="text"
              placeholder="USERNAME"
              className="w-80 p-3 border rounded-full"
              required
            />
            <input
              {...register("email")}
              type="email"
              placeholder="EMAIL"
              className="w-80 p-3 border rounded-full"
              required
            />
            <input
              {...register("password")}
              type="password"
              placeholder="PASSWORD"
              className="w-80 p-3 border rounded-full"
              required
            />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="CONFIRM PASSWORD"
              className="w-80 p-3 border rounded-full"
              required
            />

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <button
              type="submit"
              className="w-80 bg-[#2D776E] text-white p-3 rounded-full"
            >
              REGISTER
            </button>
          </form>

          <div className="mt-6">
            <div className="w-full flex items-center justify-center">
              <div className="flex-1 border-t-2 border-gray-300"></div>
              <p className="text-sm mx-4 text-gray-500">OR CONTINUE WITH</p>
              <div className="flex-1 border-t-2 border-gray-300"></div>
            </div>

            <div className="flex justify-center items-center gap-6 mt-2">
              <button className="text-xl">Google</button>
              <button className="text-xl flex items-center gap-2">
                <Facebook size={20} /> Facebook
              </button>
            </div>
          </div>

          <p className="mt-4 text-base">
            LET'S GO!{" "}
            <a href="/login" className="text-[#2D776E] font-semibold">
              LOGIN
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
