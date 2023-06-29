import { useContext, useEffect, useState } from "react";
import styles from "./Receipt.module.css";
import ModalContext from "../../../contexts/ModalContext";

export function Receipt() {
  const initialData = { orderNumber: 0, orderProducts: [], payment: "", inputCost: 0, totalCost: 0 };
  const [time, setTime] = useState<number>(10);
  const [receiptData, setReceiptData] = useState(initialData);
  const contextValue = useContext(ModalContext)!;

  const { paidOrderIDList, modalState } = contextValue;
  const isReceiptOpen = modalState === "receipt";

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const orderId = paidOrderIDList[paidOrderIDList.length - 1];
        console.log("응답받은ID리스트");
        console.log(paidOrderIDList);
        console.log("apiID로 넣을 값");
        console.log(orderId);

        const response = await fetch(`/api/v1/orders/${orderId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("영수증fetch데이터");
        console.log(data);

        const receiptData = data.message;
        console.log("영수증에뿌릴영수증값");
        console.log(receiptData);

        setReceiptData(receiptData);
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      }
    };

    fetchReceipt();
  }, [paidOrderIDList, setReceiptData]);

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

  return isReceiptOpen && receiptData ? (
    <div className={styles.Receipt}>
      <img className={styles.TextLogo} src="/assets/text-logo.svg" alt="main" />
      <div className={styles.ReceiptContent}>
        <div className={styles.ReceiptTitle}>주문번호 {receiptData.orderNumber}</div>
        <div className={styles.ReceiptBody}>
          <div className={styles.MenuContainer}>
            {/* {OrderMenuList.map((menu, index) => (
              <OrderMenu name={menu.ProductName} count={menu.count} key={index} />
            ))} */}
            {receiptData.orderProducts.map((menu: Menu, index) => (
              <OrderMenu name={menu.productName} count={menu.count} key={index} />
            ))}
          </div>
          <div className={styles.PaymentContainer}>
            <div className={styles.Payment}>결제방식: {receiptData.payment === "card" ? "카드" : "현금"}</div>
            <div className={styles.Payment}>투입금액: {receiptData.inputCost}원</div>
            <div className={styles.Payment}>총 결제금액 {receiptData.totalCost}원</div>
            {receiptData.payment === "cash" ? (
              <div className={styles.Payment}>잔돈 {receiptData.inputCost - receiptData.totalCost}원</div>
            ) : (
              ""
            )}
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

type Menu = {
  productName: string;
  count: number;
};

function OrderMenu({ name, count }: { name: string; count: number }) {
  return (
    <div className={styles.Menu}>
      {name} {count}잔
    </div>
  );
}
