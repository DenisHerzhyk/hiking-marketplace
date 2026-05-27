import { createContext, useContext, useState } from "react";

type CheckoutStep = 0 | 1 | 2;

type CheckoutContextType = {
  currentStep: CheckoutStep;
  setCurrentStep: (step: CheckoutStep) => void;
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(0);
  return (
    <CheckoutContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used inside CheckoutProvider");
  }
  return context;
};
