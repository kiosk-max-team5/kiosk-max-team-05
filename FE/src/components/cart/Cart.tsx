import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import ModalContext, { CartMenus } from "../../contexts/ModalContext";

export function Cart() {
  const time = useRef(10);
  const [timeDisplay, setTimeDisplay] = useState(time.current);

  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { setIsDimOpen, isOpenCart, setIsOpenCart, setModalState, cartMenuList, setCartMenuList } = contextValue;

  const handleClickPaymentButton = () => {
    setModalState("payment");
    setIsDimOpen(true);
  };

  const handleClickCancelButton = () => {
    setCartMenuList([]);
    setIsOpenCart(false);
  };

  useEffect(() => {
    if (cartMenuList.length === 0) {
      setIsOpenCart(false);
    }
  }, [cartMenuList, setIsOpenCart]);

  useEffect(() => {
    let timer: NodeJS.Timeout | number | undefined;

    const tick = () => {
      if (time.current <= 0) {
        setCartMenuList([]);
        setIsOpenCart(false);
        time.current = 10;
      } else {
        time.current -= 1;
      }
      setTimeDisplay(time.current);
    };

    if (isOpenCart && time.current > 0) {
      timer = setInterval(tick, 1000);
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [setIsOpenCart, time, setCartMenuList, isOpenCart]);

  useEffect(() => {
    time.current = 10;
    setTimeDisplay(time.current);
  }, [cartMenuList]);

  return isOpenCart ? (
    <div className={styles.Cart}>
      <div className={styles.MenuContainer}>
        {cartMenuList?.map((menu, index) => (
          <Menu key={index} menu={menu} index={index} cartMenuList={cartMenuList} setCartMenuList={setCartMenuList} />
        ))}
      </div>
      <div className={styles.ButtonContainer}>
        <div className={styles.CancelButton} onClick={handleClickCancelButton}>
          전체취소
        </div>
        <div className={styles.PaymentButton} onClick={handleClickPaymentButton}>
          결제하기
        </div>
        <div className={styles.CountMessages}>{timeDisplay}초남음</div>
      </div>
    </div>
  ) : null;
}

function Menu({
  menu,
  index,
  cartMenuList,
  setCartMenuList,
}: {
  menu: CartMenus;
  index: number;
  cartMenuList: CartMenus[];
  setCartMenuList: (menuList: CartMenus[]) => void;
}) {
  const handleCloseButton = () => {
    handleRemoveFromCart(index);
  };

  const handleRemoveFromCart = (targetIndex: number) => {
    if (!setCartMenuList || !cartMenuList) return;

    const updatedCart = cartMenuList.filter((_, idx) => idx !== targetIndex);

    setCartMenuList(updatedCart);
  };

  return (
    <div className={styles.Menu}>
      <div className={styles.MenuCount}>{menu.count}</div>
      <img src={menu?.imgUrl} alt="menu" />
      <div className={styles.MenuName}>{menu?.name}</div>
      <div className={styles.MenuPrice}>{menu?.price}</div>
      <div className={styles.MenuCloseButton} key={index} onClick={handleCloseButton}>
        <span className={styles.MenuCloseButtonText}>X</span>
      </div>
    </div>
  );
}
