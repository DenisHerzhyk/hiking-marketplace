import { FallbackProps } from "react-error-boundary";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Something went wrong 😢</h2>
      <pre style={{ color: "red" }}>{(error as Error).message}</pre>

      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
