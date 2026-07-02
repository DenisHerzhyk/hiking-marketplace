import { useCheckout } from "../checkout/context/CheckoutContext";

export const CheckoutSteps = () => {
  const { currentStep } = useCheckout();
  return (
    <div className="flex items-center justify-center gap-0 mb-[40px] mobile:mb-[56px] mt-[32px]">
      {["Delivery", "Payment", "Confirmation"].map((step, i) => {
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-[6px]">
              <div
                className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[11px] font-semibold border ${isActive || isCompleted ? "bg-white border border-stone-500 text-stone-700 shadow-sm" : "text-gray-300 border-gray-200"}`}
              >
                {i + 1}
              </div>
              <span
                className={`text-[10px] tracking-widest uppercase ${isActive ? "text-black font-medium" : "text-gray-300"}`}
              >
                {step}
              </span>
            </div>
            {i < 2 && (
              <div
                className={`w-[60px] mobile:w-[100px] h-[1px] mb-[20px] mx-[6px] ${i < currentStep ? "bg-gray-300" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
