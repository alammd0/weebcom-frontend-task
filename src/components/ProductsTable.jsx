import {
  addProduct,
  updateProduct,
  deleteProduct,
  fetchProducts,
} from "../api/products";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import ProductDialog from "./ProductDialog";

export default function ProductTable() {
  const queryClient = useQueryClient();

  const [pageNumber, setPageNumber] = useState(0);
  const limit = 10;
  const [search, setSearch] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [editProduct, SetEditProduct] = useState(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", pageNumber, limit, search],
    queryFn: () => fetchProducts({ limit, skip: pageNumber * 10, q: search }),
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    staleTime: 5000 * 60,
  });

  // Done
  const onAddProduct = useMutation({
    mutationFn: (newProduct) => addProduct(newProduct),
    onSuccess: (data) => {
      // console.log("Product Added", data);
      queryClient.setQueryData(
        ["products", pageNumber, limit, search],
        (prev) => {
          // console.log(prev);
          if (!prev)
            return {
              products: [data],
              total: 1,
            };

          console.log(prev);
          return {
            ...prev,
            products: [...prev.products, data],
            total: prev.total + 1,
          };
        }
      );
      toast.success(`Product add Success`);
    },
  });

  const onUpdateProduct = useMutation({
    mutationFn: ({ id, updatedProduct }) => updateProduct(id, updatedProduct),
    onSuccess: (updatedData, variables) => {
      const updatedId = variables.id;
      // console.log(id, data);
      queryClient.getQueryData(
        ["products", pageNumber, limit, search],
        (prev) => {
          console.log(prev)
          return {
            ...prev,
            products: prev.products.map((p) =>
              p.id === updatedId ? updatedData : p
            ),
          };
        }
      );

      toast.success(`Update Post Success - ${updatedId}`)
    },
  });

  const onDeleteProduct = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["products", pageNumber, limit, search],
        (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            product: prev.products.filter((p) => p.id !== id),
            total: prev.total - 1,
          };
        }
      );
      toast.success(`Product Delete Success - ${id}`);
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
    // console.log(p);
    SetEditProduct(p);
    setOpenCreateDialog(true);
  }

  async function onSubmit(productData) {
    // console.log(editProduct);
    try {
      if (editProduct?.id) {
        await onUpdateProduct.mutateAsync({
          id: editProduct.id,
          ...productData,
        });
        // toast.success("Product Updated");
      } else {
        await onAddProduct.mutateAsync(productData);
        // toast.success("Product Added");
      }
      setOpenCreateDialog(false);
    } catch (error) {
      console.log(error);
      alert("Save Failed...");
      setOpenCreateDialog(false);
    }
  }

  return (
    <div className="bg-white rounded shadow p-4 md:ml-56 ml-0">
      <div className="">
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
              {total > 0 ? `${total} Items` : ""}
            </p>
          </div>

          <div className="w-[180px] pt-4">
            <Button
              variant="secondary"
              onClick={onOpenAdd}
              className="cursor-pointer"
            >
              Add Product
            </Button>
          </div>
        </div>

        <br />
        <hr />

        <div className="">
          {isPending ? (
            <div className="flex items-center justify-center">
               <span className="loader"></span>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-screen text-red-400">
              Error Loading Product; {error.message}
            </div>
          ) : products.length === 0 ? (
            <div className="flex items-center justify-center text-2xl font-bold">
              No Product Found
            </div>
          ) : (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="p-2 text-[16px] font-bold">
                      Title
                    </TableHead>
                    <TableHead className="p-2 text-[16px] font-bold">
                      Price
                    </TableHead>
                    <TableHead className="p-2 text-[16px] font-bold">
                      Category
                    </TableHead>
                    <TableHead className="p-2 text-[16px] font-bold">
                      Stock
                    </TableHead>
                    <TableHead className="p-2 text-[16px] font-bold flex justify-end mr-32">
                      Action
                    </TableHead>
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
                        <div className="flex gap-4 md:gap-4 flex-col md:flex-row items-end justify-between md:justify-end">
                          <Button
                            onClick={() => onOpenEdit(product)}
                            variant="outline"
                            className="cursor-pointer w-full md:w-fit"
                          >
                            Edit Product
                          </Button>
                          <Button
                            onClick={() => onDeleteProduct.mutate(product.id)}
                            variant="destructive"
                            className="cursor-pointer w-full md:w-fit"
                          >
                            Delete Product
                          </Button>
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

      <ProductDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onSubmit={onSubmit}
        initialData={editProduct}
      />
    </div>
  );
}
