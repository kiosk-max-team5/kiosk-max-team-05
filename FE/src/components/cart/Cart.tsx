import { useContext } from "react";
import styles from "./Cart.module.css";
import ModalContext, { CartMenus } from "../../ModalContext";

export function Cart() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isOpenCart, setIsOpenCart, cartMenuList, setCartMenuList } = contextValue;

  const handleClickCancelButton = () => {
    setCartMenuList([]);
    setIsOpenCart(false);
  };

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
        <div className={styles.PaymentButton}>결제하기</div>
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
    if (!setCartMenuList || !cartMenuList) return; // 필요한 상태가 제공되지 않았다면 함수를 종료합니다.

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
