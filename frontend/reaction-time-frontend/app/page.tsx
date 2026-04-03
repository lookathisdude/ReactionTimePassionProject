"use client";

//Hooks
import { useRouter } from "next/navigation";

export default function Home() {
  // Initialize the router
  const router = useRouter();

  // Function to handle the button click and navigate to the reaction time test page
  const handleStartTest = () => {
    router.push("/reaction-time");
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to the Reaction Time Test!
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        Click the button below to start the test and measure your reaction time.
      </p>
      <button
        onClick={handleStartTest}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Start Test
      </button>
    </div>
  );
}
