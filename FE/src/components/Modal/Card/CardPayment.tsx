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

  // return modalState === "cardPayment" ? <div className={styles.CardPayment}></div> : null;
  return (
    <>
      {modalState === "cardPayment" && <div className={styles.CardPayment}></div>}
      <div className={styles.Message}>결제 중입니다</div>
    </>
  );
}
