import Layout from "@/components/layout";
import Link from "next/link";

export default function Products() {
  return (
    <Layout>
      <Link
        className="bg-gray-700 text-white py-1 px-2 rounded-md"
        href={"/products/New"}
      >
        Add your products here
      </Link>
    </Layout>
  );
}
