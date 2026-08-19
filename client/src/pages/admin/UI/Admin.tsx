import React from "react";

const AdminPage = () => {
    const products = [
        { id: 1, name: "Product One", stock: 24 },
        { id: 2, name: "Product Two", stock: 12 },
        { id: 3, name: "Product Three", stock: 7 },
        { id: 4, name: "Product Four", stock: 0 },
    ];

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
                                    <p className="font-medium text-stone-800">
                                        {product.name}
                                    </p>
                                </div>

                                <div>
                                    <span
                                        className={`text-sm font-medium ${
                                            product.stock === 0
                                                ? "text-red-500"
                                                : "text-stone-600"
                                        }`}
                                    >
                                        {product.stock}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-lg font-medium text-stone-600 transition hover:bg-stone-100"
                                    >
                                        +
                                    </button>

                                    <button
                                        type="button"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-lg font-medium text-stone-600 transition hover:bg-stone-100"
                                    >
                                        −
                                    </button>

                                    <button
                                        type="button"
                                        className="ml-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
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