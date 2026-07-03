import React, { useEffect, useState } from "react";
import Benefits from "../../../shared/benefits/UI/Benefits";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import api from "../../../axios.ts";
import { useParams } from "react-router-dom";
import ProductInterface from "../../../shared/components/product-card/interface/ProductInterface.ts";
import { Link } from "react-router-dom";
import { handleWishlistAdd } from "../../cart/components/saved_item/handlers/handleWishlistAdd";
import { handleCartItemAdd } from "../../cart/components/cart_item/handlers/handleCartItemAdd";
import { colorNames } from "../../cart/components/cart_item/components/color.ts";
import ProductPageSkeleton from "../../../shared/loading/ProductPageSkeleton.tsx";
import toast from "react-hot-toast";

type Section = "description" | "details" | "sizeGuide" | "delivery_return";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductInterface>();
  const [productLoading, setProductLoading] = useState(true);
  const [selSize, setSelSize] = useState<string | null>(null);
  const [selColor, setSelColor] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [openSections, setOpenSections] = useState<Record<Section, boolean>>({
    description: true,
    details: false,
    sizeGuide: false,
    delivery_return: false,
  });
  useEffect(() => {
    api
      .get(`/api/products/${id}`)
      .then((res) => {
        const data = res.data.data;
        setProduct({
          ...data,
          details:
            typeof data.details === "string"
              ? JSON.parse(data.details)
              : data.details,
          sizeGuide:
            typeof data.sizeGuide === "string"
              ? JSON.parse(data.sizeGuide)
              : data.sizeGuide,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setProductLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!selColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selSize) {
      toast.error("Please select a size");
      return;
    }
    if (!product?.id) return;

    handleCartItemAdd(product.id, product.stock[selSize], selSize, selColor);
    toast.success("Item added to cart!");
  };

  const handleAddToWishlist = () => {
    if (!selColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selSize) {
      toast.error("Please select a size");
      return;
    }
    if (!product?.id) return;

    handleWishlistAdd(product.id, product.stock[selSize], selSize, selColor);
    toast.success("Item added to wishlist");
  };

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  if (productLoading) {
    return (
      <>
        <ProductPageSkeleton />
        <Benefits />
      </>
    );
  }
  return (
    <>
      <div
        className="product-page flex flex-col 
   px-[20px] 
  mobile:px-[60px] 
  tablet:px-[80px] 
  laptop:px-[200px]"
      >
        {" "}
        <section className="product-main relative w-full mt-[0px]">
          <div className="flex flex-col tablet:flex-row gap-[40px] w-full">
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-[10px] tablet:w-[60%]">
              {product?.productImages.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden ${i !== 1 ? "hidden tablet:block" : ""}`}
                >
                  <img
                    key={i}
                    src={img}
                    alt="img"
                    className="w-full h-full tablet:h-full laptop:h-[400px] object-cover transition-transform duration-500 ease-in-out hover:scale-105 cursor-zoom-in"
                  />
                </div>
              ))}
            </div>
            <div className="product-content flex flex-col w-full tablet:w-[40%] tablet:sticky tablet:top-[120px] tablet:self-start">
              <nav className="category-nav flex items-center mb-[16px]">
                <ul className="flex flex-row gap-[5px] font-light text-xs text-gray-600">
                  <Link
                    className={product?.gender === "men" ? "font-bold" : ""}
                    to="/category/men"
                  >
                    MENS
                  </Link>
                  <p>/</p>
                  <Link
                    className={product?.gender === "women" ? "font-bold" : ""}
                    to="/category/women"
                  >
                    WOMEN
                  </Link>
                  <p>/</p>
                  <Link
                    className={product?.category === "shoes" ? "font-bold" : ""}
                    to="/category/shoes"
                  >
                    SHOES
                  </Link>
                </ul>
              </nav>

              <h1 className="text-xl mobile:text-2xl tablet:text-[28px] font-semibold mb-[8px]">
                {product?.title.toUpperCase()}
              </h1>
              <div
                className={`text-xl mb-[24px] ${product?.discount && "flex flex-row gap-2"}`}
              >
                <p
                  className={`${product?.discount && "line-through text-gray-600"}`}
                >
                  € {product?.price}
                </p>
                {product?.discount && (
                  <span className="text-red-700">
                    €
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(0)}
                  </span>
                )}
              </div>
              <div className="sizes">
                <h2 className="text-sm mb-[11px] text-gray-500">SIZE</h2>
                <div className="size-blocks grid grid-cols-4 gap-2 mb-[24px]">
                  {product?.availableSizes.map((item) => (
                    <div key={item} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelSize(item)}
                        className={`font-medium text-sm border flex items-center justify-center py-[10px] w-full transition-all duration-200 ${
                          selSize === item
                            ? "bg-stone-100 border-stone-400 text-stone-800 shadow-sm"
                            : "bg-gray-200 hover:bg-gray-300 border-gray-300 hover:border-stone-400"
                        }`}
                      >
                        {item}
                      </button>

                      {product.stock[item] <= 5 && (
                        <span className="text-[10px] text-red-700 mt-1">
                          {product.stock[item]} left
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="colors mb-[50px]">
                  <h2 className="text-sm mb-[11px] text-gray-500">
                    COLOR
                    <br />
                    <span className="text-black font-medium">
                      {product?.color && colorNames[product?.color]}
                    </span>
                  </h2>
                  <div className="flex flex-row flex-wrap gap-2">
                    <button
                      key={product?.color}
                      style={{ backgroundColor: product?.color }}
                      className="w-[36px] h-[36px] rounded-full border-2 border-transparent hover:border-stone-500 transition-all duration-200 cursor-pointer"
                      onClick={() =>
                        product?.color && setSelColor(product?.color)
                      }
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart()}
                  className="text-stone-800 uppercase bg-stone-50 border border-stone-400 w-full text-sm mobile:text-[18px] font-semibold px-[20px] py-[8px] mobile:px-[30px] mobile:py-[17px] mb-[10px] rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleAddToWishlist()}
                  className="text-sm border uppercase border-stone-300 w-full h-[44px] mb-[9px] hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 rounded-lg"
                >
                  Save to favorite{" "}
                </button>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm border border-stone-300 w-full h-[44px] mb-[9px] hover:bg-stone-50 hover:border-stone-400 transition-all duration-200 rounded-lg"
                >
                  SIZE GUIDE
                </button>
                {showSizeGuide && (
                  <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setShowSizeGuide(false)}
                  />
                )}
                <div
                  className={`${showSizeGuide ? "flex flex-col opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out z-50 gap-[24px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md
  w-[95%] max-w-[700px] 
  p-[20px] mobile:p-[30px] tablet:p-[40px]
  max-h-[85vh] overflow-y-auto`}
                >
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="font-semibold text-base mobile:text-lg">
                      SIZE GUIDE
                    </h2>
                    <button
                      onClick={() => setShowSizeGuide(false)}
                      className="text-gray-400 hover:text-black text-xl leading-none"
                    >
                      ✕
                    </button>
                  </div>
                  {product?.category !== "shoes" && (
                    <div>
                      <h3 className="font-semibold text-sm mb-[12px] uppercase tracking-wider">
                        Clothing
                      </h3>
                      <table className="w-full text-xs mobile:text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left">
                              Size
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              Chest (in)
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              Waist (in)
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              Hip (in)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              size: "XS",
                              chest: "32–34",
                              waist: "26–28",
                              hip: "35–37",
                            },
                            {
                              size: "S",
                              chest: "35–37",
                              waist: "29–31",
                              hip: "38–40",
                            },
                            {
                              size: "M",
                              chest: "38–40",
                              waist: "32–34",
                              hip: "41–43",
                            },
                            {
                              size: "L",
                              chest: "41–43",
                              waist: "35–37",
                              hip: "44–46",
                            },
                            {
                              size: "XL",
                              chest: "44–46",
                              waist: "38–40",
                              hip: "47–49",
                            },
                            {
                              size: "XXL",
                              chest: "47–49",
                              waist: "41–43",
                              hip: "50–52",
                            },
                          ].map((row) => (
                            <tr key={row.size} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2 font-medium">
                                {row.size}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.chest}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.waist}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.hip}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {product?.category === "shoes" && (
                    <div>
                      <h3 className="font-semibold text-sm mb-[12px] uppercase tracking-wider">
                        Footwear
                      </h3>
                      <table className="w-full text-xs mobile:text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left">
                              US
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              EU
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              UK
                            </th>
                            <th className="border border-gray-300 px-3 py-2">
                              CM
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { us: "7", eu: "40", uk: "6", cm: "25" },
                            { us: "8", eu: "41", uk: "7", cm: "26" },
                            { us: "9", eu: "42", uk: "8", cm: "27" },
                            { us: "10", eu: "43", uk: "9", cm: "28" },
                            { us: "11", eu: "44", uk: "10", cm: "29" },
                            { us: "12", eu: "45", uk: "11", cm: "30" },
                          ].map((row) => (
                            <tr key={row.us} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-3 py-2 font-medium">
                                {row.us}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.eu}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.uk}
                              </td>
                              <td className="border border-gray-300 px-3 py-2 text-center">
                                {row.cm}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-[16px]">
                    <p className="text-xs text-gray-500">
                      Model is {product?.sizeGuide?.modelHeightFeet} (
                      {product?.sizeGuide?.modelHeightCm}cm) and wears size{" "}
                      {product?.sizeGuide?.modelWears}.
                    </p>
                  </div>
                </div>

                <p className="text-[10px] text-center text-gray-500">
                  FAST AND SECURE GLOBAL SHIPPING
                </p>
              </div>
              <div className="w-full max-w-full mt-[100px] tablet:max-w-[440px]">
                <div className="description flex flex-col py-[9px] border-b border-stone-200">
                  <div className="flex flex-row justify-between mb-[7px] items-center pr-[14px]">
                    <h3 className="text-xs mobile:text-sm">DESCRIPTION</h3>
                    <div
                      onClick={() => toggleSection("description")}
                      className="cursor-pointer"
                    >
                      {openSections.description ? (
                        <FaMinus className="w-[10px] transition-all ease-out" />
                      ) : (
                        <FaPlus className="w-[10px] transition-all ease-out" />
                      )}
                    </div>
                  </div>
                  <p
                    className={`text-[10px] mobile:text-xs ${openSections.description ? "flex" : "hidden"} uppercase break-words tracking-wider`}
                  >
                    {product?.description}
                  </p>
                </div>
                <div className="details flex flex-col py-[9px] border-b border-stone-200">
                  <div className="flex flex-row justify-between items-center pr-[14px]">
                    <h3 className="text-xs mobile:text-sm">DETAILS</h3>
                    <div
                      onClick={() => toggleSection("details")}
                      className="cursor-pointer"
                    >
                      {openSections.details ? (
                        <FaMinus className="w-[10px]" />
                      ) : (
                        <FaPlus className="w-[10px]" />
                      )}
                    </div>
                  </div>
                  <ul
                    className={`text-[10px] mobile:text-xs ${openSections.details ? "flex flex-col gap-[6px]" : "hidden"} uppercase break-words tracking-wider mt-[8px]`}
                  >
                    {(
                      product?.details as { label: string; value: string }[]
                    )?.map((detail) => (
                      <li
                        key={detail.label}
                        className="flex flex-row gap-[6px]"
                      >
                        <span className="font-medium">{detail.label}:</span>
                        <span className="text-gray-500">{detail.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="size_fit flex flex-col py-[9px] border-b border-stone-200">
                  <div className="flex flex-row justify-between items-center pr-[14px]">
                    <h3 className="text-xs mobile:text-sm">SIZE & FIT</h3>
                    <div
                      onClick={() => toggleSection("sizeGuide")}
                      className="cursor-pointer"
                    >
                      {openSections.sizeGuide ? (
                        <FaMinus className="w-[10px]" />
                      ) : (
                        <FaPlus className="w-[10px]" />
                      )}
                    </div>
                  </div>
                  <ul
                    className={`text-[10px] mobile:text-xs ${openSections.sizeGuide ? "flex" : "hidden"} uppercase break-words tracking-wider`}
                  >
                    <div className="flex flex-col gap-[6px] text-[10px] mobile:text-xs mt-[8px]">
                      <p>
                        <span className="font-medium">Model Height:</span>{" "}
                        <span className="text-gray-500">
                          {product?.sizeGuide?.modelHeightFeet} (
                          {product?.sizeGuide?.modelHeightCm}cm)
                        </span>
                      </p>
                      <p>
                        <span className="font-medium">Model Wears:</span>{" "}
                        <span className="text-gray-500">
                          Size {product?.sizeGuide?.modelWears}
                        </span>
                      </p>
                    </div>
                  </ul>
                </div>
                <div className="delivery_return flex flex-col py-[9px] border-b border-stone-200">
                  <div className="flex flex-row justify-between items-center pr-[14px]">
                    <button
                      onClick={() => toggleSection("delivery_return")}
                      className="text-xs mobile:text-sm"
                    >
                      DELIVERY & RETURN
                    </button>
                    {openSections.delivery_return && (
                      <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => toggleSection("delivery_return")}
                      />
                    )}
                    <div
                      className={`${openSections.delivery_return ? "flex flex-col opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-opacity duration-300 ease-in-out z-50 gap-[30px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md
  w-[95%] max-w-[600px] 
  p-[20px] mobile:p-[30px] tablet:p-[40px]
  max-h-[85vh] overflow-y-auto`}
                    >
                      <button
                        onClick={() => toggleSection("delivery_return")}
                        className="self-end text-gray-400 hover:text-black text-xl leading-none"
                      >
                        ✕
                      </button>
                      <div>
                        <h3 className="font-semibold text-sm mobile:text-base mb-2">
                          Free Ground Shipping on Orders over $99*
                        </h3>
                        <p className="text-xs mobile:text-sm text-gray-600">
                          We do our best to process and ship orders within 1-2
                          business days. Please keep in mind that we get
                          backlogged during sales or the holiday season and it
                          could take longer. If you have any questions about
                          your order, please contact our friendly Customer
                          Service team.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mobile:text-base mb-2">
                          Returns & Exchanges
                        </h3>
                        <p className="text-xs mobile:text-sm text-gray-600">
                          We accept both current season and sale items for
                          return or exchange. We do not set a time limit on
                          returns, though we ask that returns for fit or color
                          be made in a timely manner and that items be kept in
                          new condition with tags attached.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm mobile:text-base mb-2">
                          We Guarantee Everything We Make
                        </h3>
                        <p className="text-xs mobile:text-sm text-gray-600">
                          If you are not satisfied with one of our products at
                          the time you receive it, or if one of our products
                          does not perform to your satisfaction, our Ironclad
                          Guarantee allows you to return it for a replacement or
                          refund at no charge.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Benefits />
    </>
  );
};

export default ProductPage;
