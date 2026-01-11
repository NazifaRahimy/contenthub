// "use client"
// import { useForm } from "react-hook-form";
// import Navbar from "@/components/NavBar";
// import { useState } from "react";
// interface TContectProp {
//   name: string,
//   email: string,
//   message: string,
// }

// export default function ContactPage() {
//     const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
  
//   // const {register, handleSubmit, formState: {cerror}} = useForm()
//    const { register, handleSubmit, formState: { errors } , reset} = useForm<TContectProp>();

//      const onSubmit= async (data: TContectProp)=> {
//         try {
//             const res = await fetch("/api/contact",{
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(data)
//             })
//              if (res.ok) {
//         setSuccess("Sent message successfully!");
//         reset();
     
//       } else {
//         setError("Failed to send message");
//       }
            
//         }catch(errors){
//             setError("Network or server error");
//         }
//      }
//   return (
//     <>
//     <Navbar />
//     <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
//         <h1 className="text-2xl font-bold text-center mb-4">📩 Contact Us</h1>
//          {error && <p className="text-red-600 mb-2">{error}</p>}
//             {success && <p className="text-green-600 mb-2">{success}</p>}
//         <div>
//           <input
//           type="text"
//           placeholder="Your Name"
        
//           className="w-full p-2 border rounded"
//          {...register("name", {required: "وارد کردن نام الزامی است"})}
         
//         />
//            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//         </div>
//         <div>
//            <input
//           type="email"
//           placeholder="Your Email"
//              {...register("email", { 
//             required: "وارد کردن ایمیل الزامی است", 
//             pattern: {
//               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//               message: "ایمیل معتبر نیست"
//             }
//           })}
//           className="w-full p-2 border rounded"
        
//         />
        
//         {errors.email && <p className="text-red-500">{errors.email.message}</p>}
//         </div>
//         <textarea
//           placeholder="Your Message"
//           {...register("message", {required: "پر کردن پیام الزامی است."})}
//           className="w-full p-2 border rounded h-32"
      
//         ></textarea>
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
//           Send Message
//         </button>
//       </form>
//     </div></>
//   );
// }


"use client"
import { useForm } from "react-hook-form";
import Navbar from "@/components/NavBar";
import { useState } from "react";

interface TContactProp {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export default function ContactPage() {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TContactProp>();
    const onSubmit = async (data: TContactProp) => {
    try {
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            setSuccess("پیام شما با موفقیت ارسال شد!");
            setError("");
            reset();
        } else {
            setError("ارسال پیام موفق نبود.");
            setSuccess("");
        }
    } catch {
        setError("خطا در شبکه یا سرور");
        setSuccess("");
    }
    };

    return (
    <>
      <Navbar />
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4">
            <h1 className="text-2xl font-bold text-center mb-4">📩 Contact Us</h1>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && <p className="text-green-600 mb-2">{success}</p>}
            <div>
                <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" {...register("name", { required: "وارد کردن نام الزامی است" })}/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
                <input type="email" placeholder="Your Email" className="w-full p-2 border rounded mb-2"
                    {...register("email", {
                        required: "وارد کردن ایمیل الزامی است",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "ایمیل معتبر نیست"
                        }
                    })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                <input type="text" placeholder="Your Phone Number" className="w-full p-2 border rounded"
                    {...register("phone", {
                        pattern: {
                            value: /^[0-9+\-() ]{7,20}$/,
                            message: "شماره تلفن معتبر نیست"
                        }
                    })}
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <textarea placeholder="Your Message"{...register("message", { required: "پر کردن پیام الزامی است." })} className="w-full p-2 border rounded h-32" ></textarea>
            <button type="submit"className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" >Send Message</button>
        </form>
      </div>
    </>
  );
}
