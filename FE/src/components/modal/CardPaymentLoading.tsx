import { useContext, useEffect } from "react";
import styles from "./CardPaymentLoading.module.css";
import ModalContext from "../../ModalContext";

export function CardPaymentLoading() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isCardLoadingOpen, setIsReceiptOpen } = contextValue;

  // useEffect(() => {
  //   if (!isCardLoadingOpen) {
  //     setIsReceiptOpen(true);
  //   }
  //   console.log("안녕");
  // }, []);

  // return <div className={styles.CardPaymentLoading}></div>;
  return isCardLoadingOpen ? <div className={styles.CardPaymentLoading}>결제중입니다...</div> : null;
}
