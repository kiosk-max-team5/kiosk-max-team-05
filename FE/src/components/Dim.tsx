import { useContext } from "react";
import styles from "./Dim.module.css";
import ModalContext from "../ModalContext";

export function Dim() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isDimOpen, setIsDimOpen, isOrderModalOpen, setIsOrderModalOpen, isPaymentModalOpen, setIsPaymentModalOpen } =
    contextValue;

  const handleBackgroundClick = () => {
    setIsDimOpen(false);
    switch (true) {
      case isOrderModalOpen:
        setIsOrderModalOpen(false);
        break;
      case isPaymentModalOpen:
        setIsPaymentModalOpen(false);
        break;
      default:
        break;
    }
  };

  return isDimOpen ? <div className={styles.Dim} onClick={handleBackgroundClick}></div> : null;
}
