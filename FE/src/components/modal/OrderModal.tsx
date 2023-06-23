import { useContext, useState } from "react";
import styles from "./OrderModal.module.css";
import ModalContext from "../../ModalContext";
import { Menus } from "../MenuArea";

export function OrderModal() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const {
    orderCount,
    setOrderCount,
    selectedMenu,
    isOrderModalOpen,
    setIsOrderModalOpen,
    setIsOpenCart,
    cartMenuList,
    setCartMenuList,
  } = contextValue;

  const handleCloseButtonClick = () => {
    setIsOrderModalOpen(false);
  };
  const handleAddToCartButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpenCart(true);
    setOrderCount(1);
    if (selectedMenu && cartMenuList && setCartMenuList) {
      const updatedMenu = { ...selectedMenu, count: orderCount };
      setCartMenuList([...cartMenuList, updatedMenu]);
    }

    setIsOrderModalOpen(false);
  };

  return isOrderModalOpen ? (
    <div className={styles.OrderModal}>
      <CloseButton onClick={handleCloseButtonClick} />
      <div className={styles.Upper}>
        <Menu selectedMenu={selectedMenu} />
        <div className={styles.Options}>
          <div className={styles.OptionButtons}>
            <SizeButtons />
            <TempButtons />
          </div>
          <QuantityControl orderCount={orderCount} setOrderCount={setOrderCount} />
        </div>
      </div>
      <div className={styles.Lower}>
        <AddToCartButton onClick={handleAddToCartButtonClick} />
      </div>
    </div>
  ) : null;
}

export interface QuantityControlProps {
  orderCount: number;
  setOrderCount: (count: number) => void;
}

function QuantityControl({ orderCount, setOrderCount }: QuantityControlProps) {
  const handleClickPlus = () => {
    setOrderCount(orderCount + 1);
  };

  const handleClickMinus = () => {
    if (orderCount > 1) {
      setOrderCount(orderCount - 1);
    }
  };

  return (
    <div className={styles.QuantityControl}>
      <div className={styles.Minus} onClick={handleClickMinus}>
        -
      </div>
      <div className={styles.Quantity}>{orderCount}</div>
      <div className={styles.Plus} onClick={handleClickPlus}>
        +
      </div>
    </div>
  );
}

function Menu({ selectedMenu }: { selectedMenu: Menus | null }) {
  return (
    <div className={styles.Menu}>
      <img src={selectedMenu?.imgUrl} alt="menu" />
      <div className={styles.MenuName}>{selectedMenu?.name}</div>
      <div className={styles.MenuPrice}>{selectedMenu?.price}</div>
    </div>
  );
}

function AddToCartButton({ onClick }: { onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) {
  return (
    <div className={styles.AddToCartButton} onClick={onClick}>
      담기
    </div>
  );
}

function CloseButton({ onClick }: { onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) {
  return (
    <div className={styles.CloseButton} onClick={onClick}>
      X
    </div>
  );
}

function SizeButtons() {
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  const handleOptionButtonClick = (id: string) => {
    setSelectedButtonId(id);
  };

  return (
    <div className={styles.Buttons}>
      <Button
        id="big"
        text="큰거"
        color="#1b3c35"
        isSelected={selectedButtonId === "big"}
        onClick={() => handleOptionButtonClick("big")}
      />
      <Button
        id="small"
        text="작은거"
        color="#1b3c35"
        isSelected={selectedButtonId === "small"}
        onClick={() => handleOptionButtonClick("small")}
      />
    </div>
  );
}

function TempButtons() {
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  const handleOptionButtonClick = (id: string) => {
    setSelectedButtonId(id);
  };

  return (
    <div className={styles.Buttons}>
      <Button
        id="hot"
        text="뜨거운것"
        color="#397e6f"
        isSelected={selectedButtonId === "hot"}
        onClick={() => handleOptionButtonClick("hot")}
      />
      <Button
        id="cold"
        text="차가운것"
        color="#397e6f"
        isSelected={selectedButtonId === "cold"}
        onClick={() => handleOptionButtonClick("cold")}
      />
    </div>
  );
}

function Button({
  id,
  text,
  color,
  isSelected,
  onClick,
}: {
  id: string;
  text: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      id={id}
      className={`${styles.Button} ${isSelected ? styles.SelectedButton : ""}`}
      style={{ backgroundColor: color }}
      onClick={onClick}>
      <div className={styles.ButtonText}>{text}</div>
    </div>
  );
}
