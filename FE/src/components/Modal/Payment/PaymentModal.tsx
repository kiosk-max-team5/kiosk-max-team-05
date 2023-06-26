import { useContext, useState } from "react";
import styles from "./PaymentModal.module.css";
import ModalContext from "../../../contexts/ModalContext";

interface YNProps {
  onClick: (isCancelled: boolean) => void;
  realCloseFn: () => void;
}

export function PaymentModal() {
  const [isClosePaymentModal, setIsClosePaymentModal] = useState(false);
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { setIsDimOpen, setModalState, modalState } = contextValue;

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

  // const handleNoCancleButtonClick = () => {
  //   setIsClosePaymentModal(false);
  // };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 4000) + 3000;
  };

  const paymentTime = getRandomNumber();

  const handleCardPaymentButtonClick = () => {
    setModalState("cardPayment");
    console.log(paymentTime);
    console.log(typeof paymentTime);
    setTimeout(() => {
      setIsDimOpen(false);
      setModalState("receipt");
    }, paymentTime);
  };

  const handleCashPaymentButtonClick = () => {
    setModalState("cashPayment");
  };
  const isPaymentModalOpen = modalState === "payment";

  return isPaymentModalOpen ? (
    <div className={styles.PaymentModal}>
      <div className={styles.CloseButton} onClick={handleCloseButtonClick}>
        X
      </div>
      <div className={styles.Content}>
        <div className={styles.Images}>
          <div className={styles.CardImage}>💳</div>
          <div className={styles.CashImage}>💵</div>
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.Button} onClick={handleCardPaymentButtonClick}>
            카드결제
          </div>
          <div className={styles.Button} onClick={handleCashPaymentButtonClick}>
            현금결제
          </div>
        </div>
      </div>
      {/* {isClosePaymentModal && <YNButton onClick={handleReallyCloseButtonClick} />} */}
      {isClosePaymentModal && <YNButton props={ynProps} />}
    </div>
  ) : null;
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
