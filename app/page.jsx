"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold">Welcome, {user.displayName || user.email}!</h1>
      {user.photoURL && (
        <Image
          src={user.photoURL}
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full mt-4"
        />
      )}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-600 px-6 py-2 rounded text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
