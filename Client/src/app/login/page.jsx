"use client";
import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Facebook } from "lucide-react";
import { AuthContext } from "@/context/Auth.context";

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, state } = useContext(AuthContext);

  useEffect(() => {
    if (state.isLoggedIn && state.user) {
      const roles = state.user.roles || [];
      const userRole = roles.includes('admin') ? 'admin' : 'user';
      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [state.isLoggedIn, state.user, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.username, data.password);
    } catch (error) {
      setError("username", { type: "manual", message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
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
              {...register("username", { required: "กรุณากรอกชื่อผู้ใช้" })}
              className="w-80 p-3 border rounded-full"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            <input
              type="password"
              placeholder="PASSWORD"
              {...register("password", { required: "กรุณากรอกรหัสผ่าน" })}
              className="w-80 p-3 border rounded-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-80 bg-[#2D776E] text-white p-3 rounded-full"
            >
              {loading ? "กำลังเข้าสู่ระบบ..." : "LOGIN"}
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