import { useContext, useState } from "react";
import styles from "./CashPayment.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function CashPayment() {
  const contextValue = useContext(ModalContext)!;
  const [paidAmount, setPaidAmount] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const orderAmount = 9000;

  const { setModalState, setIsDimOpen, modalState } = contextValue;

  const handleClickPriceButton = (price: number) => {
    if (orderAmount < paidAmount + price) {
      setIsPaymentComplete(true);
    }
    setPaidAmount(paidAmount + price);
  };

  const handleClickPaymentButton = () => {
    setIsDimOpen(false);
    setModalState("receipt");
  };

  return modalState === "cashPayment" ? (
    <div className={styles.CashPayment}>
      <div className={styles.ButtonContainer}>
        <div className={styles.PriceButton} onClick={() => handleClickPriceButton(1000)}>
          1000원
        </div>
        <div className={styles.PriceButton} onClick={() => handleClickPriceButton(10000)}>
          10000원
        </div>
        <div className={styles.PriceButton} onClick={() => handleClickPriceButton(100)}>
          100원
        </div>
        <div className={styles.PriceButton} onClick={() => handleClickPriceButton(500)}>
          500원
        </div>
      </div>
      <div className={styles.PaymentSection}>
        <div className={styles.AmountContainer}>
          <div className={styles.Amount}>주문금액: {orderAmount}원</div>
          <div className={styles.Amount}>결제금액: {paidAmount}원</div>
        </div>
        <div
          className={`${styles.PaymentButton} ${isPaymentComplete ? styles.Completed : ""}`}
          onClick={handleClickPaymentButton}>
          결제하기
        </div>
      </div>
    </div>
  ) : null;
}
