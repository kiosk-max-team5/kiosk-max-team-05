import { useContext, useState } from "react";
import styles from "./PaymentModal.module.css";
import ModalContext from "../../../contexts/ModalContext";

interface YNProps {
  onClick: (isCancelled: boolean) => void;
  realCloseFn: () => void;
}

export function PaymentModal() {
  const [isClosePaymentModal, setIsClosePaymentModal] = useState(false);
  const contextValue = useContext(ModalContext)!;
  const { orderInfo, cartMenuList, setIsDimOpen, setModalState, modalState } = contextValue;

  const handleCloseButtonClick = () => {
    setIsClosePaymentModal(true);
  };

  const handleYNButton = (isCancelled: boolean) => {
    setIsClosePaymentModal(isCancelled);
  };
  const handleReallyCloseButtonClick = () => {
    setModalState(null);
    setIsDimOpen(false);
  };

  const ynProps = {
    onClick: handleYNButton,
    realCloseFn: handleReallyCloseButtonClick,
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 4000) + 3000;
  };

  const paymentTime = getRandomNumber();

  const handleCardPaymentButtonClick = async () => {
    const orderPrice = cartMenuList.reduce((acc, cur) => {
      return acc + cur.price * cur.count;
    }, 0);
    const postData = {
      payment: "카드",
      totalCost: orderPrice,
      inputCost: orderPrice,
      orderProducts: cartMenuList.map((menu) => ({
        productId: menu.id,
        count: menu.count,
        size: menu.size,
        temperature: menu.temperature,
      })),
    };
    console.log(postData);

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

    setModalState("cardPayment");
    setTimeout(() => {
      setIsDimOpen(false);
      setModalState("receipt");
    }, paymentTime);
  };

  // const handleCardPaymentButtonClick = () => {
  //   const orderPrice = cartMenuList.reduce((acc, cur) => {
  //     return acc + cur.price * cur.count;
  //   }, 0);
  //   const postData = {
  //     payment: "카드",
  //     totalCost: orderPrice,
  //     inputCost: orderPrice,
  //     orderProducts: cartMenuList.map((menu) => ({
  //       productId: menu.id,
  //       count: menu.count,
  //       size: menu.size,
  //       temperature: menu.temperature,
  //     })),
  //   };
  //   console.log(postData);
  //   const jsonPostData = JSON.stringify(postData);
  //   console.log(jsonPostData);

  //   setModalState("cardPayment");
  //   setTimeout(() => {
  //     setIsDimOpen(false);
  //     setModalState("receipt");
  //   }, paymentTime);
  // };

  const handleCashPaymentButtonClick = () => {
    setModalState("cashPayment");
  };
  const isPaymentModalOpen = modalState === "payment";

  return isPaymentModalOpen ? (
    <div className={styles.PaymentModal}>
      {!isClosePaymentModal && (
        <div className={styles.CloseButton} onClick={handleCloseButtonClick}>
          X
        </div>
      )}
      <div className={styles.Content}>
        <div className={styles.Images}>
          <div className={styles.CardImage}>💳</div>
          <div className={styles.CashImage}>💵</div>
        </div>
        <div className={styles.ButtonContainer}>
          <Button onClick={handleCardPaymentButtonClick} text="카드결제" />
          <Button onClick={handleCashPaymentButtonClick} text="현금결제" />
        </div>
      </div>
      {isClosePaymentModal && <YNButton props={ynProps} />}
    </div>
  ) : null;
}

function Button({ onClick, text }: { onClick: () => void; text: string }) {
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
      className={`${styles.Button} ${isZoomed ? styles.zoomed : ""}`}
      // onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      {text}
    </div>
  );
}

function YNButton({ props }: { props: YNProps }) {
  return (
    <div className={styles.Message}>
      <div className={styles.MessageContent}>결제를 취소하시겠습니까?</div>
      <div className={styles.YesOrNo}>
        <div className={styles.YNButton} onClick={props.realCloseFn}>
          네
        </div>
        <div className={styles.YNButton} onClick={() => props.onClick(false)}>
          아니오
        </div>
      </div>
    </div>
  );
}
