
"use client";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleCredentialsLogin = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");

  //   const res = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });

  //   if (res?.error) {
  //     setError("Email or password is incorrect");
  //   } else {
  //     router.push("/"); // بعد از لاگین
  //   }
  // };

  const handleCredentialsLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (res?.error) {
    setError("Email or password is incorrect");
  } else {
    router.refresh(); // ← این باعث میشه useSession آپدیت بشه
    router.push("/dashboard"); // بعد از لاگین
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-blue-300 relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl opacity-40" />
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/25 backdrop-blur-xl shadow-xl border border-white/30 pb-8">
            <h2 className="text-center text-xl bg-white w-full py-2 rounded-t-2xl font-bold text-red-500 mb-6"> Login to ContentHub</h2>
            {session ? (
                <div className="flex flex-col items-center gap-4 dark:bg-[#202020] dark:text-white">
                    <p className="text-gray-700 dark:text-white">Hi, {session.user?.email}</p>
                    <button onClick={() => signOut()} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors" > Logout</button>
                </div>
            ) : (
                <form onSubmit={handleCredentialsLogin} className="space-y-4 mt-5 px-20">
                    <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-white/40 px-4 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl bg-white/40 px-4 py-2"
                    />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div className="flex items-center gap-3 pt-2">
                        <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-500 text-white"> Login</button>
                        <button type="button"   onClick={() => signIn("google", { callbackUrl: "/" })} className="p-2 bg-white rounded-xl shadow hover:scale-105 transition"> <FaGoogle className="text-red-500 text-xl" /></button>
                        <button type="button"  
                         onClick={() =>
                            signIn("github", {
                            redirect: true,
                            callbackUrl: "/",
                        }) }className="p-2 bg-white rounded-xl shadow hover:scale-105 transition">
                            <FaGithub className="text-gray-800 text-xl" />
                        </button>
                    </div>
                </form>
             )}
        </div>
    </div>
  );
}

// "use client";

// import { signIn, signOut, useSession } from "next-auth/react";
// import { FaGoogle, FaGithub } from "react-icons/fa";

// export default function LoginPage() {
//   const { data: session } = useSession();

//   if (session) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center gap-4">
//         <p>Hi {session.user?.email}</p>
//         <button onClick={() => signOut()}>Logout</button>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex flex-col items-center justify-center gap-4">
//       <button
//         onClick={() => signIn("google")}
//         className="px-4 py-2 bg-red-500 text-white rounded"
//       >
//         Login with Google
//       </button>

//       <button
//         onClick={() => signIn("github")}
//         className="px-4 py-2 bg-gray-800 text-white rounded"
//       >
//         Login with GitHub
//       </button>
//     </div>
//   );
// }
