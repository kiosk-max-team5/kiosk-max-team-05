import { useContext, useState } from "react";
import styles from "./CashPayment.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function CashPayment() {
  const contextValue = useContext(ModalContext)!;
  const [paidAmount, setPaidAmount] = useState(0);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const orderAmount = 9000;

  const { setModalState, cartMenuList, setIsDimOpen, modalState } = contextValue;

  const handleClickPriceButton = (price: number) => {
    if (orderAmount < paidAmount + price) {
      setIsPaymentComplete(true);
    }
    setPaidAmount(paidAmount + price);
  };

  const handleClickPaymentButton = async () => {
    if (!isPaymentComplete) return;

    const orderPrice = cartMenuList.reduce((acc, cur) => {
      return acc + cur.price * cur.count;
    }, 0);
    const postData = {
      payment: "cash",
      totalCost: orderPrice,
      inputCost: paidAmount,
      orderProducts: cartMenuList.map((menu) => ({
        productId: menu.id,
        count: menu.count,
        size: menu.size,
        temperature: menu.temperature,
      })),
    };
    console.log(postData);
    console.log(JSON.stringify(postData));

    try {
      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsDimOpen(false);
    setModalState("receipt");
  };

  return modalState === "cashPayment" ? (
    <div className={styles.CashPayment}>
      <div className={styles.ButtonContainer}>
        <PriceButton onClick={() => handleClickPriceButton(1000)} price={1000} />
        <PriceButton onClick={() => handleClickPriceButton(10000)} price={10000} />
        <PriceButton onClick={() => handleClickPriceButton(100)} price={100} />
        <PriceButton onClick={() => handleClickPriceButton(500)} price={500} />

        {/* <div className={styles.PriceButton} onClick={() => handleClickPriceButton(1000)}>
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
        </div> */}
      </div>
      <div className={styles.PaymentSection}>
        <div className={styles.AmountContainer}>
          <div className={styles.Amount}>주문금액: {orderAmount}원</div>
          <div className={styles.Amount}>결제금액: {paidAmount}원</div>
        </div>
        <PaymentButton onClick={handleClickPaymentButton} isPaymentComplete={isPaymentComplete} />
        {/* <div
          className={`${styles.PaymentButton} ${isPaymentComplete ? styles.Completed : ""}`}
          onClick={handleClickPaymentButton}>
          결제하기
        </div> */}
      </div>
    </div>
  ) : null;
}

function PaymentButton({ onClick, isPaymentComplete }: { onClick: () => void; isPaymentComplete: boolean }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleMouseDown = () => {
    if (!isPaymentComplete) return;
    setIsZoomed(true);
  };

  const handleMouseUp = () => {
    if (!isPaymentComplete) return;
    setIsZoomed(false);
    onClick();
  };
  return (
    <div
      className={`${styles.PaymentButton} ${isPaymentComplete ? styles.Completed : ""} ${
        isZoomed ? styles.zoomed : ""
      }`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      결제하기
    </div>
  );
}

function PriceButton({ onClick, price }: { onClick: () => void; price: number }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleMouseDown = () => {
    setIsZoomed(true);
  };

  const handleMouseUp = () => {
    setIsZoomed(false);
    onClick();
  };
  return (
    <div
      className={`${styles.PriceButton} ${isZoomed ? styles.zoomed : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      {price}원
    </div>
  );
}
