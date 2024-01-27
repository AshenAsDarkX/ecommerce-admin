import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1>Do you realy want to delete "{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={DeleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );

  function goBack() {
    router.push("/products");
  }

  async function DeleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
}
