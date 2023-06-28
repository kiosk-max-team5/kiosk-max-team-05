import { useContext, useEffect, useState } from "react";
import styles from "./Receipt.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function Receipt() {
  const [time, setTime] = useState<number>(555);

  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { modalState } = contextValue;
  const isReceiptOpen = modalState === "receipt";
  useEffect(() => {
    let timer: NodeJS.Timeout | number | undefined;

    if (isReceiptOpen && time > 0) {
      timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isReceiptOpen, time]);

  useEffect(() => {
    if (isReceiptOpen) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, time * 1000);

      return () => clearTimeout(timer);
    }
  }, [isReceiptOpen, time]);

  const OrderMenuList = [
    { name: "아메리카노", count: 2 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
    { name: "카페라떼", count: 1 },
  ];

  return isReceiptOpen ? (
    <div className={styles.Receipt}>
      <img className={styles.TextLogo} src="/assets/text-logo.svg" alt="main" />
      <div className={styles.ReceiptContent}>
        <div className={styles.ReceiptTitle}>주문번호03</div>
        <div className={styles.ReceiptBody}>
          <div className={styles.MenuContainer}>
            {/* <div className={styles.Menu}>아메리카노 2잔</div>
            <div className={styles.Menu}>카페라떼 1잔</div> */}
            {OrderMenuList.map((menu, index) => (
              <OrderMenu name={menu.name} count={menu.count} key={index} />
            ))}
          </div>
          <div className={styles.PaymentContainer}>
            <div className={styles.Payment}>결제방식: 현금</div>
            <div className={styles.Payment}>투입금액: 10000</div>
            <div className={styles.Payment}>총 결제금액 9500</div>
            <div className={styles.Payment}>잔돈 500</div>
          </div>
        </div>
      </div>
      <div className={styles.MessagesContainer}>
        <div className={styles.Messages}>(주의: 이 화면은 10초뒤에 자동으로 사라집니다)</div>
        <div className={styles.Timer}>{time}</div>
      </div>
    </div>
  ) : null;
}

function OrderMenu({ name, count }: { name: string; count: number }) {
  return (
    <div className={styles.Menu}>
      {name} {count}잔
    </div>
  );
}