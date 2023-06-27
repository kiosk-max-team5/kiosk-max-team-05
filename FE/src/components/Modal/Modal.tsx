import { useContext } from "react";

import ModalContext from "../../contexts/ModalContext";
import { OrderModal } from "./Order/OrderModal";
import { PaymentModal } from "./Payment/PaymentModal";
import { CardPayment } from "./Card/CardPayment";
import { CashPayment } from "./Cash/CashPayment";
import { Receipt } from "./Receipt/Receipt";

export function Modal() {
  const contextValue = useContext(ModalContext)!;

  const { modalState } = contextValue;

  switch (modalState) {
    case "order":
      return <OrderModal />;
    case "payment":
      return <PaymentModal />;
    case "cardPayment":
      return <CardPayment />;
    case "cashPayment":
      return <CashPayment />;
    case "receipt":
      return <Receipt />;
    default:
      return null;
  }
}
