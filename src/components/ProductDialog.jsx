import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ProductDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}) {

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    category: "",
    stock: "",
  });

 //   console.log(initialData);

  useEffect(() => {
    if (initialData) {
      setProductData({
        title: initialData.title || "",
        price: initialData.price || "",
        category: initialData.category || "",
        stock: initialData.stock || "",
      });
    } else {
      setProductData({ title: "", price: "", category: "", stock: "" });
    }
  }, [initialData, open]);

  if (!open) {
    return null;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProductData((s) => ({ ...s, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();

    console.log(productData.title);
    console.log(productData.price);
    console.log(productData.category);
    console.log(productData.stock);

    const productData2 = {
      title: productData.title,
      price: productData.price,
      category: productData.category,
      stock: productData.stock,
      description: productData.description || "Added via Khalid demo",
    };

    onSubmit(productData2);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-black/50 inset-0 absolute flex items-center justify-center">
        <div className="bg-white rounded shadow z-10 w-full max-w-lg p-4">

          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-center">
              {initialData ? "Edit Product" : "Add Product"}
            </h3>
            <button onClick={onClose} className="text-slate-600 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>

          <form onSubmit={submitHandler} className="space-y-3">
            <div className="flex gap-2 flex-col">
              <label htmlFor="title" className="block text-sm font-normal">
                <sup className="text-red-400">*</sup> {" "}
                Title
              </label>
              <Input
                id="title"
                name="title"
                placeholder="Title of Product"
                value={productData.title}
                onChange={handleChange}
                type="text"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 flex gap-2 flex-col">
                <label htmlFor="price"> <sup className="text-red-400">*</sup> {" "} Price</label>
                <Input
                  id="price"
                  name="price"
                  value={productData.price}
                  placeholder="Product Price"
                  onChange={handleChange}
                  type="number"
                //   className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="stock"> <sup className="text-red-400">*</sup> {" "} Stock</label>
                <Input
                  id="stock"
                  name="stock"
                  value={productData.stock}
                  placeholder="Product Stock"
                  onChange={handleChange}
                  type="text"
                //   className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="category"><sup className="text-red-400">*</sup> {" "} Category</label>
              <Input
                id="category"
                name="category"
                type="text"
                placeholder = "Product Category"
                value={productData.category}
                onChange={handleChange}
                // className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="flex gap-10 justify-end mt-5">
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">{initialData ? "Save Changes" : "Create"}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
