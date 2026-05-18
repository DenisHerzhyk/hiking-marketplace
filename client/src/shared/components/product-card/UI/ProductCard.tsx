import ProductCardInterface from "../../../../pages/home/components/product-card/ProductCardInterface";

const ProductCard = ({ img, title, price }: ProductCardInterface) => {
  return (
    <>
      <div className="ProductCard">
        <div className="productcard__image relative mx-auto w-full min-w-[120px] max-w-[300px] min-h-[130px] max-h-[375px]">
          <img className="w-full h-full object-contain" src={img} alt="img" />
          <p className="font-medium text-white bg-black text-xs px-[21.5px] py-[5.5px] absolute top-0 left-0">
            NEW
          </p>
        </div>
        <div className="content flex flex-col mt-[17px]">
          <h1 className="productcard__title font-medium text-sm mobile:text-base">
            {title}
          </h1>
          <p className="productcard__price text-xs mobile:text-sm mt-[14px]">
            ${price}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
