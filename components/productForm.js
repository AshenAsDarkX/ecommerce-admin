import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: exsistingTitle,
  description: ExsistingDescription,
  price: existingPrice,
  images,
}) {
  const [title, setTitle] = useState(exsistingTitle || "");
  const [description, setDescription] = useState(ExsistingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProduct, setGoToProduct] = useState(false);
  const router = useRouter();

  if (goToProduct) {
    router.push("/products");
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photos</label>
      <div>
        {!images?.length && (
          <div className="mb-2">
            <label className="w-24 h-24 border text-center flex flex-col items-center justify-center text-gray-400 rounded-md bg-slate-200 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
              <input type="file" className="hidden" onChange={uploadImages} />
            </label>
            No photos in this product
          </div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <label>Price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price };

    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProduct(true);
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files.length > 0) {
      const data = new FormData();
      for(const file of files){
        data.append('file', file)
      }
      const res = await fetch('/api/upload', {
          method: 'POST',
          body: data,
      })
      console.log(res);
    }
  }
}
