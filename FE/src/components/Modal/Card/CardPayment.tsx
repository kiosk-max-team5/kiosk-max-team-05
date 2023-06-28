import { useContext } from "react";
import styles from "./CardPayment.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function CardPayment() {
  const contextValue = useContext(ModalContext)!;

  const { modalState } = contextValue;

  // useEffect(() => {
  //   if (!isCardLoadingOpen) {
  //     setIsReceiptOpen(true);
  //   }
  //   console.log("안녕");
  // }, []);

  // return <div className={styles.CardPaymentLoading}></div>;
  return modalState === "cardPayment" ? <div className={styles.CardPayment}></div> : null;
}
