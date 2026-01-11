import Navbar from "@/components/NavBar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description: "Learn more about ContentHub and its mission.",
};

export default async function AboutPage() {

  return (
    <>
    <Navbar />
    <div className="min-h-screen justify-center bg-gray-50 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">About ContentHub</h1>
        <p className="max-w-2xl text-center text-gray-700">
        ContentHub is a CMS dashboard project that allows authors and admins
        to manage blog posts efficiently. Users can browse published posts
        and contact us directly via the contact page. This project is built
        using Next.js, Tailwind CSS, and React.
        </p>
        <p className="mt-4 text-gray-700">Our goal is to provide a clean and modern interface for content management.</p>
    </div>
    </>
  );
}
