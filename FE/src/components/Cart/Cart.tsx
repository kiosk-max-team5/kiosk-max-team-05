import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import ModalContext, { CartMenus, selectedMenus } from "../../contexts/ModalContext";

export function Cart() {
  const time = useRef(10);
  const [timeDisplay, setTimeDisplay] = useState(time.current);
  // const [paymentIsZoomed, setPaymentIsZoomed] = useState(false);
  // const [cancelIsZoomed, setCancelIsZoomed] = useState(false);
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const {
    selectedMenu,
    setIsDimOpen,
    isOpenCart,
    setIsOpenCart,
    setModalState,
    cartMenuList,
    setCartMenuList,
    modalState,
  } = contextValue;

  const handlePaymentMouseUp = () => {
    setModalState("payment");
    setIsDimOpen(true);
  };
  const handleCancelMouseUp = () => {
    setCartMenuList([]);
    setIsOpenCart(false);
  };

  useEffect(() => {
    if (cartMenuList.length === 0) {
      setIsOpenCart(false);
    }
  }, [cartMenuList, setIsOpenCart]);

  useEffect(() => {
    if (modalState === "payment") return;

    let timer: NodeJS.Timeout | number | undefined;

    const tick = () => {
      if (time.current <= 0) {
        setCartMenuList([]);
        setIsOpenCart(false);
        time.current = 500;
      } else {
        time.current -= 1;
      }
      setTimeDisplay(time.current);
    };

    if (isOpenCart && time.current > 0) {
      timer = setInterval(tick, 1000);
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [setIsOpenCart, time, setCartMenuList, isOpenCart, modalState]);

  useEffect(() => {
    time.current = 30;
    setTimeDisplay(time.current);
  }, [cartMenuList]);

  return isOpenCart ? (
    <div className={styles.Cart}>
      <div className={styles.MenuContainer}>
        {cartMenuList?.map((menu, index) => (
          <Menu
            selectedMenu={selectedMenu}
            key={index}
            menu={menu}
            index={index}
            cartMenuList={cartMenuList}
            setCartMenuList={setCartMenuList}
          />
        ))}
      </div>
      <div className={styles.ButtonContainer}>
        <Button text="전체취소" className="CancelButton" onMouseUp={handleCancelMouseUp} />
        <Button text="결제하기" className="PaymentButton" onMouseUp={handlePaymentMouseUp} />
        {modalState === "payment" ? null : (
          <div className={styles.CountMessages}>
            <span>{timeDisplay}</span>초 뒤에 장바구니 창이 닫힙니다.
          </div>
        )}
      </div>
    </div>
  ) : null;
}

function Button({ text, className, onMouseUp }: { text: string; className: string; onMouseUp: () => void }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleMouseDown = () => {
    setIsZoomed(true);
  };

  const handleMouseUp = () => {
    setIsZoomed(false);
    onMouseUp();
  };

  return (
    <div
      className={`${styles[className]} ${isZoomed ? styles.zoomed : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      {text}
    </div>
  );
}

function Menu({
  menu,
  index,
  cartMenuList,
  setCartMenuList,
  selectedMenu,
}: {
  menu: CartMenus;
  index: number;
  cartMenuList: CartMenus[];
  setCartMenuList: (menuList: CartMenus[]) => void;
  selectedMenu: selectedMenus | null;
}) {
  const [menuAnimation, setMenuAnimation] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const handleCloseButton = () => {
    setMenuAnimation("fade-enter");
    setTimeout(() => {
      handleRemoveFromCart(index);
      setMenuAnimation("fade-exit");
    }, 500);
  };

  const handleRemoveFromCart = (targetIndex: number) => {
    if (!setCartMenuList || !cartMenuList) return;

    const updatedCart = cartMenuList.filter((_, idx) => idx !== targetIndex);

    setCartMenuList(updatedCart);
  };

  const handleMouseDownMenu = () => {
    setIsZoomed(true);
  };
  const handleMouseUpMenu = () => {
    setIsZoomed(false);
  };

  return (
    //menuAnimation도 추가로 넣어줘야함
    //<div className={`${styles.MenuArea} ${styles[animationClass]}`}>
    <>
      {/* <div className={`${styles.Temperature} ${selectedMenu?.temperature === "hot" ? styles.Cold : styles.Hot}`}>
        {selectedMenu?.temperature}
      </div> */}

      <div
        className={`${styles.Menu} ${menuAnimation ? styles[menuAnimation] : ""} ${
          isZoomed ? `${styles.Menu} ${styles.zoomed}` : ""
        }`}
        onMouseDown={handleMouseDownMenu}
        onMouseUp={handleMouseUpMenu}>
        {menu?.temperature === "hot" ? <div className={styles.Hot}>HOT</div> : ""}
        <div className={styles.MenuSize}>{menu.size === "big" ? "LARGE" : "SMALL"}</div>
        <div className={styles.MenuCount}>{menu.count}</div>
        <div className={styles.CartMenuContainer}>
          <div className={styles.imgContainer}>
            <img src={menu?.imageUrl} alt="menu" />
          </div>
          <div className={styles.MenuName}>{menu?.name}</div>
          <div className={styles.MenuPrice}>{menu?.price}원</div>
        </div>
        <div className={styles.MenuCloseButton} key={index} onClick={handleCloseButton}>
          <span className={styles.MenuCloseButtonText}>X</span>
        </div>
      </div>
    </>
  );
}
