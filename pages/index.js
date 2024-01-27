import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <Layout>
      <div className="text-gray-800 flex justify-between">
        <h2>Hello, {session?.user.name}</h2>

        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img src={session?.user.image} className="w-6 h-6 "></img>
        <span className="px-2">{session?.user.name}</span>
        </div>
      </div>
    </Layout>
  );
}
