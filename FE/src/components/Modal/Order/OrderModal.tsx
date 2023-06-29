import { useContext, useState } from "react";
import styles from "./OrderModal.module.css";
import ModalContext, { selectedMenus } from "../../../contexts/ModalContext";
import { Menus } from "../../MenuArea/MenuArea";

type OrderInfo = React.MutableRefObject<{
  payments: string;
  orderPrice: number;
  inputPrice: number;
  orderProducts: {
    productId: number;
    count: number;
    size: string;
    temperature: string;
  }[];
}>;

export function OrderModal() {
  const [orderAnimationClass, setOrderAnimationClass] = useState<string>("fade-exit");
  const [isOptionsComplete, setIsOptionsComplete] = useState<boolean>(false);
  const contextValue = useContext(ModalContext)!;
  const {
    currentCategory,
    setModalState,
    modalState,
    orderCount,
    setOrderCount,
    selectedMenu,
    setSelectedMenu,
    setIsOpenCart,
    cartMenuList,
    setCartMenuList,
    setIsDimOpen,
    orderInfo,
  } = contextValue;

  const handleCloseButtonClick = () => {
    setModalState(null);
    setIsDimOpen(false);
  };
  const handleAddToCartButtonClick = () => {
    console.log(selectedMenu);
    console.log(cartMenuList);

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
    setIsOptionsComplete(false);
  };

  return modalState === "order" ? (
    <div className={styles.OrderModal}>
      <CloseButton onClick={handleCloseButtonClick} />

      <div className={styles.Upper}>
        <Menu
          orderInfo={orderInfo}
          selectedMenu={selectedMenu}
          animationClass={orderAnimationClass}
          onTransitionEnd={handleTransitionEnd}
        />
        <div className={styles.Options}>
          <div className={styles.OptionButtons}>
            <SizeButtons
              currentCategory={currentCategory}
              orderInfo={orderInfo}
              setIsOptionsComplete={setIsOptionsComplete}
              onMouseUp={setSelectedMenu}
              selectedMenu={selectedMenu}
            />
            {currentCategory !== 3 && (
              <TempButtons
                orderInfo={orderInfo}
                setIsOptionsComplete={setIsOptionsComplete}
                onMouseUp={setSelectedMenu}
                selectedMenu={selectedMenu}
              />
            )}
          </div>
          <QuantityControl
            orderInfo={orderInfo}
            orderCount={orderCount}
            setOrderCount={setOrderCount}
            onMouseUp={setSelectedMenu}
            selectedMenu={selectedMenu}
          />
        </div>
      </div>
      <div className={styles.Lower}>
        <AddToCartButton
          isOptionsComplete={isOptionsComplete}
          orderInfo={orderInfo}
          onClick={handleAddToCartButtonClick}
        />
      </div>
    </div>
  ) : null;
}

export interface QuantityControlProps {
  orderCount: number;
  setOrderCount: (count: number) => void;
  orderInfo: OrderInfo;
  selectedMenu: selectedMenus | null;
  onMouseUp: (menuInfo: selectedMenus) => void;
}

function QuantityControl({ orderCount, setOrderCount, orderInfo, selectedMenu, onMouseUp }: QuantityControlProps) {
  const handleClickPlus = () => {
    setOrderCount(orderCount + 1);
    if (selectedMenu && selectedMenu.imageUrl && selectedMenu.name && typeof selectedMenu.price === "number") {
      const updatedMenu: selectedMenus = { ...selectedMenu, count: orderCount + 1 };
      onMouseUp(updatedMenu);
    }
  };

  const handleClickMinus = () => {
    if (orderCount > 1) {
      setOrderCount(orderCount - 1);
      if (selectedMenu && selectedMenu.imageUrl && selectedMenu.name && typeof selectedMenu.price === "number") {
        const updatedMenu = { ...selectedMenu, count: orderCount - 1 };
        onMouseUp(updatedMenu);
      }
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
  orderInfo,
}: {
  selectedMenu: Menus | null;
  animationClass: string;
  onTransitionEnd: () => void;
  orderInfo: OrderInfo;
}) {
  return (
    <div className={`${styles.Menu} ${styles[animationClass]}`} onTransitionEnd={onTransitionEnd}>
      {/* <div className={styles.Menu}> */}
      <img src={selectedMenu?.imageUrl} alt="menu" />
      <div className={styles.MenuName}>{selectedMenu?.name}</div>
      <div className={styles.MenuPrice}>{selectedMenu?.price}</div>
    </div>
  );
}

function AddToCartButton({
  onClick,
  orderInfo,
  isOptionsComplete,
}: {
  onClick: () => void;
  orderInfo: OrderInfo;
  isOptionsComplete: boolean;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const handleMouseDown = () => {
    if (!isOptionsComplete) return;
    setIsZoomed(true);
  };

  const handleMouseUp = () => {
    if (!isOptionsComplete) return;
    setIsZoomed(false);
    onClick();
  };
  return (
    <div
      className={`${styles.AddToCartButton} ${isZoomed ? styles.zoomed : ""} ${
        isOptionsComplete ? styles.Completed : ""
      }`}
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

function SizeButtons({
  orderInfo,
  selectedMenu,
  onMouseUp,
  setIsOptionsComplete,
  currentCategory,
}: {
  orderInfo: OrderInfo;
  selectedMenu: selectedMenus | null;
  onMouseUp: (menuInfo: selectedMenus | null) => void;
  setIsOptionsComplete: (isOptionsComplete: boolean) => void;
  currentCategory: number;
}) {
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  const handleOptionButtonClick = (id: string) => {
    setSelectedButtonId(id);
    if (selectedMenu && selectedMenu.imageUrl && selectedMenu.name) {
      const updatedMenu: selectedMenus = { ...selectedMenu, size: id };
      onMouseUp(updatedMenu);
      if (selectedMenu.temperature || currentCategory === 3) {
        setIsOptionsComplete(true);
      }
    }

    // orderInfo.current.orderProducts[0].size = id;
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

function TempButtons({
  orderInfo,
  selectedMenu,
  onMouseUp,
  setIsOptionsComplete,
}: {
  orderInfo: OrderInfo;
  selectedMenu: selectedMenus | null;
  onMouseUp: (menuInfo: selectedMenus | null) => void;
  setIsOptionsComplete: (isOptionsComplete: boolean) => void;
}) {
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);

  const handleOptionButtonClick = (id: string) => {
    setSelectedButtonId(id);
    if (selectedMenu && selectedMenu.imageUrl && selectedMenu.name) {
      const updatedMenu: selectedMenus = { ...selectedMenu, temperature: id };
      onMouseUp(updatedMenu);
      if (selectedMenu.size) {
        setIsOptionsComplete(true);
      }
    }
    // orderInfo.current.orderProducts[0].temperature = id;
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
