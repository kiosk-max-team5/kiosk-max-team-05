import { useContext, useState } from "react";
import styles from "./OrderModal.module.css";
import ModalContext from "../../../contexts/ModalContext";
import { Menus } from "../../MenuArea/MenuArea";

export function OrderModal() {
  const [orderAnimationClass, setOrderAnimationClass] = useState<string>("fade-exit");
  const contextValue = useContext(ModalContext)!;

  const {
    setModalState,
    modalState,
    orderCount,
    setOrderCount,
    selectedMenu,
    setIsOpenCart,
    cartMenuList,
    setCartMenuList,
    setIsDimOpen,
  } = contextValue;

  const handleCloseButtonClick = () => {
    setModalState(null);
    setIsDimOpen(false);
  };
  const handleAddToCartButtonClick = () => {
    setOrderAnimationClass("fade-enter");
  };

  const handleTransitionEnd = () => {
    setOrderAnimationClass("");
    setIsOpenCart(true);
    setOrderCount(1);
    if (selectedMenu && cartMenuList && setCartMenuList) {
      const updatedMenu = { ...selectedMenu, count: orderCount };
      setCartMenuList([...cartMenuList, updatedMenu]);
    }
    setModalState(null);
    setIsDimOpen(false);
  };

  return modalState === "order" ? (
    <div className={styles.OrderModal}>
      <CloseButton onClick={handleCloseButtonClick} />
      <div className={styles.Upper}>
        <Menu selectedMenu={selectedMenu} animationClass={orderAnimationClass} onTransitionEnd={handleTransitionEnd} />
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
      <PlusMinusButton onClick={handleClickMinus} text="-" className={"Minus"} />
      <div className={styles.Quantity}>{orderCount}</div>
      <PlusMinusButton onClick={handleClickPlus} text="+" className={"Plus"} />
    </div>
  );
}

//plus minus 둘을 사용하는 공용 컴포넌트 버튼
function PlusMinusButton({ onClick, text, className }: { onClick: () => void; text: string; className: string }) {
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
      className={`${styles[className]} ${isZoomed ? styles.zoomed : ""}`}
      // onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      {text}
    </div>
  );
}

function Menu({
  selectedMenu,
  animationClass,
  onTransitionEnd,
}: {
  selectedMenu: Menus | null;
  animationClass: string;
  onTransitionEnd: () => void;
}) {
  return (
    <div className={`${styles.Menu} ${styles[animationClass]}`} onTransitionEnd={onTransitionEnd}>
      {/* <div className={styles.Menu}> */}
      <img src={selectedMenu?.imgUrl} alt="menu" />
      <div className={styles.MenuName}>{selectedMenu?.name}</div>
      <div className={styles.MenuPrice}>{selectedMenu?.price}</div>
    </div>
  );
}

function AddToCartButton({ onClick }: { onClick: () => void }) {
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
      className={`${styles.AddToCartButton} ${isZoomed ? styles.zoomed : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
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
        color="#c2abd6"
        isSelected={selectedButtonId === "big"}
        onClick={() => handleOptionButtonClick("big")}
      />
      <Button
        id="small"
        text="작은거"
        color="#c2abd6"
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
        color="#7c51a1"
        isSelected={selectedButtonId === "hot"}
        onClick={() => handleOptionButtonClick("hot")}
      />
      <Button
        id="cold"
        text="차가운것"
        color="#7c51a1"
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
