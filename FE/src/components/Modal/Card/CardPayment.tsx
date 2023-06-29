import { useContext } from "react";
import styles from "./CardPayment.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function CardPayment() {
  const contextValue = useContext(ModalContext)!;

  const { isPaymentError, modalState } = contextValue;

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

      {isPaymentError ? (
        <div className={styles.ErrorMessage}>
          <img src="/assets/logo.svg" alt="main" />
          <div className={styles.ErrorText}>
            죄송합니다. 결제 중 오류가 발생했어요! 다시 시도하려면 <span>화면을 터치해주세요.</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
