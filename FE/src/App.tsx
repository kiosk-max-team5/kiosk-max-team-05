import "./App.css";
import { ModalProvider } from "./ModalContext";
import { Dim } from "./components/Dim";
import { MainPage } from "./components/MainPage";
import { OrderModal } from "./components/modal/OrderModal";
import { PaymentModal } from "./components/modal/PaymentModal";

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <MainPage />
        <OrderModal />
        <PaymentModal />
        <Dim />
      </ModalProvider>
    </div>
  );
}

export default App;
