import { useContext } from "react";
import styles from "./PaymentModal.module.css";
import ModalContext from "../../ModalContext";

export function PaymentModal() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isPaymentModalOpen } = contextValue;

  return isPaymentModalOpen ? <div className={styles.PaymentModal}></div> : null;
}
