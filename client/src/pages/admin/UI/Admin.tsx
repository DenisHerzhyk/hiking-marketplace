import React, { useEffect, useState } from "react";
import api from "../../../axios";
import toast from "react-hot-toast";
import ProductInterface from "../../../shared/components/product-card/interface/ProductInterface";

const topSizes = ["XS", "S", "M", "L", "XL"];
const bottomSizes = [30, 32, 34, 36];
const bootsSize = [8, 9, 10, 11, 12];

const AdminPage = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>(
    {},
  );

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => setProducts(res.data.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddSize = (productId: number) => {
    const size = selectedSizes[productId];
    if (!size) {
      toast.error("Select a size first");
      return;
    }

    api
      .put(`/api/admin/add/${productId}`, { size })
      .then((res) => {
        const updatedStock = res.data.stock;
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stock: updatedStock } : p,
          ),
        );
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });
  };

  const handleDecreaseSize = (productId: number) => {
    const size = selectedSizes[productId];
    if (!size) {
      toast.error("Select a size first");
      return;
    }

    api
      .put(`/api/admin/decrease/${productId}`, { size })
      .then((res) => {
        const updatedStock = res.data.stock;
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stock: updatedStock } : p,
          ),
        );
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });
  };

  const handleRemoveSize = (productId: number) => {
    const size = selectedSizes[productId];
    if (!size) {
      toast.error("Select a size first");
      return;
    }

    api
      .delete(`/api/admin/remove/${productId}/${size}`)
      .then((res) => {
        const updatedStock = res.data.stock;
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, stock: updatedStock } : p,
          ),
        );
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      });
  };

  //sizes

  const getFullSizeList = (stock: Record<string, number>) => {
    const existingKeys = Object.keys(stock);

    let sizePool: (string | number)[] = topSizes;
    if (existingKeys.some((k) => bottomSizes.includes(Number(k)))) {
      sizePool = bottomSizes;
    } else if (existingKeys.some((k) => bootsSize.includes(Number(k)))) {
      sizePool = bootsSize;
    }

    const merged: Record<string, number> = {};
    sizePool.forEach((size) => {
      merged[size] = stock[size] ?? 0;
    });

    return merged;
  };
  return (
    <>
      <div className="Trails px-[var(--mobile-x-padding)] laptop:px-[var(--desktop-x-padding)] tablet:mt-[120px] pb-[80px]">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-800 mb-1">
            Manage stock
          </h1>
          <p className="text-sm text-stone-400">
            Increase, decrease or remove products from your inventory
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-stone-200 bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-stone-200 bg-stone-50 px-5 py-4 text-sm font-medium text-stone-500">
            <span>Product</span>
            <span>Available stock</span>
            <span>Actions</span>
          </div>

          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-6 border-b border-stone-100 px-5 py-4 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-stone-800">{product.title}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {Object.entries(getFullSizeList(product.stock)).map(
                    ([size, count]) => {
                      const isSelected = selectedSizes[product.id] === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`ml-2 flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                            isSelected
                              ? "border-blue-400 bg-blue-50 text-blue-600"
                              : "border-blue-200 text-blue-500 hover:bg-blue-50"
                          }`}
                        >
                          <span>{size}</span>
                          <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-xs text-blue-600">
                            {count}
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    key={product.id}
                    type="button"
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-lg font-medium text-stone-600 transition hover:bg-stone-100`}
                    onClick={() => handleAddSize(product.id)}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-lg font-medium text-stone-600 transition hover:bg-stone-100"
                    onClick={() => handleDecreaseSize(product.id)}
                  >
                    −
                  </button>

                  <button
                    type="button"
                    className="ml-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    onClick={() => handleRemoveSize(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
