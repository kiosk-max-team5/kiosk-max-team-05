import "./App.css";
import { ModalProvider } from "./ModalContext";
import { Dim } from "./components/Dim";
import { MainPage } from "./components/MainPage";
import { CardPaymentLoading } from "./components/modal/CardPaymentLoading";
import { CashPayment } from "./components/modal/CashPayment";
import { OrderModal } from "./components/modal/OrderModal";
import { PaymentModal } from "./components/modal/PaymentModal";
import { Receipt } from "./components/modal/Receipt";

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Receipt />
        <MainPage />
        <OrderModal />
        <PaymentModal />
        <CardPaymentLoading />
        <CashPayment />
        <Dim />
      </ModalProvider>
    </div>
  );
}

export default App;
