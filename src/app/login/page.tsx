"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const router = useRouter();

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    router.push("product-registration");
  }

  return (
    <main className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-[900px] h-auto flex justify-center items-center bg-slate-800 p-8 rounded-lg shadow-lg">
        <div className="mr-12 flex-1">
          <h1 className="text-slate-100 text-4xl font-bold uppercase mb-4 relative">
            Control Service
            <span className="block w-20 h-[3px] bg-indigo-600 mt-2"></span>
          </h1>
          <form className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg text-slate-200 mb-2" htmlFor="login">
                Login
              </label>
              <input
                type="text"
                id="login"
                className="p-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg text-slate-200 mb-2" htmlFor="password">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="p-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full mt-4 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
        <div>
          <Image src="/image-login.svg" width={400} height={500} alt="" />
        </div>
      </div>
    </main>
  );
}
