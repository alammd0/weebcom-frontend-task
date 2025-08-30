import { addProduct, updateProduct, deleteProduct, fetchProducts } from "../api/products";
import { keepPreviousData, QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ProductTable() {
  const queryClient = new QueryClient();

  const [pageNumber, setPageNumber] = useState(0);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editProduct, SetEditProduct] = useState(null);

  const queryKey = ["products", { pageNumber, limit, search}];

  const { data, isPending, isError, error } = useQuery({
    queryKey,
    queryFn: () => fetchProducts({ limit, skip: pageNumber * 10, q: search }),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    staleTime: 5000 * 60,
  });

  const onAddProduct = useMutation({
    mutationFn: (newProduct) => addProduct(newProduct),
    onSuccess: (data) => {
      console.log("Product Added", data);
      queryClient.setQueryData([
        queryKey,
        (prev) => {
          if (!prev) return [data];
          return [...prev, data]; 
        },
      ]);
    },
  });

  const onUpdateProduct = useMutation({
    mutationFn: ({ id, updatedProduct }) => updateProduct(id, updatedProduct),
    onSuccess: (id, data) => {
      console.log(id, data);
      queryClient.getQueryData([
        queryKey,
        (prev) => {
          return prev?.filter((product) => product.id !== id);
        },
      ]);
    },
  });

  const onDelete = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (data, variable) => {
      queryClient.setQueryData(queryKey, (curElem) => {
        return curElem?.filter((product) => product.id !== variable);
      });
    },
  });

  const products = data?.products || [];
  const total = data?.total;
  const totalPage = Math.ceil(total / limit);
  
  function onOpenAdd() {
    SetEditProduct(null);
    setOpenCreateDialog(true);
  }

  function onOpenEdit(p) {
    SetEditProduct(p);
    setOpenCreateDialog(true);
  }

  async function onSubmit(productData) {
    try {
      if (editProduct?.id) {
        await onUpdateProduct.mutateAsync({
          id: editProduct.id,
          ...productData,
        });
      } else {
        await onAddProduct.mutateAsync(productData);
      }
      setOpenCreateDialog(false);
    } catch (error) {
      alert("Save Failed...");
      setOpenCreateDialog(false);
    }
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex flex-col gap-4">
       <div className="flex">
         <div className="flex flex-col gap-4 w-full">
          <Input
                type="text"
                className="w-9/12 px-2 py-6 border-1c"
                value={search}
                placeholder="Search by Product Name"
                onChange={(e) => {
                setSearch(e.target.value), setPageNumber(0);
                }}
          /> 
          <p className="text-[17px] font-normal font-sans">
            {total > 0 ? `${total} Items` : ''}
          </p>
        </div>

        <div className="w-[180px] pt-4">
          <Button variant="secondary" className="cursor-pointer">Add Product</Button>
        </div>
       </div>

        <hr />

        <div className="">
             {isPending ? (
          <div>loading...</div>
        ) : isError ? (
          <div className="flex items-center justify-center h-screen text-red-400">Error Loading Product; {error.message}</div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center text-2xl font-bold">No Product Found</div>
        ) : (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="p-2 text-[16px] font-bold">Title</TableHead>
                  <TableHead className="p-2 text-[16px] font-bold">Price</TableHead>
                  <TableHead className="p-2 text-[16px] font-bold">Category</TableHead>
                  <TableHead className="p-2 text-[16px] font-bold">Stock</TableHead>
                  <TableHead className="p-2 text-[16px] font-bold flex justify-end mr-32">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="p-2">{product.title}</TableCell>
                    <TableCell className="p-2">₹{product.price}</TableCell>
                    <TableCell className="p-2">{product.category}</TableCell>
                    <TableCell className="p-2">{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex gap-10 items-end justify-end">
                         <Button variant="outline" className="cursor-pointer">Edit Product</Button>
                         <Button variant="destructive" className="cursor-pointer">Delete Product</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <hr />

            <div className="flex pt-7 items-end justify-end">
              <div className="flex gap-3">
                <Button
                  disabled={pageNumber === 0}
                  onClick={() => setPageNumber((prev) => prev - 1)}
                >
                  Prev
                </Button>
                <div>
                  {pageNumber + 1} of {totalPage}
                </div>
                <Button
                  disabled={pageNumber + 1 >= totalPage}
                  onClick={() => setPageNumber((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
