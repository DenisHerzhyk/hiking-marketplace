import { BrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import "./styles/main.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
