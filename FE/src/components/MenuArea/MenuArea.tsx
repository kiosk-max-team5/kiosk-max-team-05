import { useContext, useState } from "react";

import styles from "./MenuArea.module.css";
import ModalContext, { selectedMenus } from "../../contexts/ModalContext";

export interface Menus {
  imageUrl: string;
  name: string;
  price: number;
}

type MenuAreaProps = {
  menus: Menus[];
  animationClass: string;
  onTransitionEnd: () => void;
};

export function MenuArea({ menus, animationClass, onTransitionEnd }: MenuAreaProps) {
  // console.log(animationClass);
  // console.log("페이드엔터가 아니야" + (animationClass !== "fade-enter"));
  const handleTransitionEnd = () => {
    onTransitionEnd();
    // console.log("트랜지션엔드끗");
  };
  return (
    <div
      className={`${styles.MenuArea} ${animationClass ? styles[animationClass] : ""}`}
      onTransitionEnd={handleTransitionEnd}>
      {menus.map((menu, index) => (
        <Menu menu={menu} key={index} index={index} />
      ))}
    </div>
  );
}

type MenuProps = {
  menu: selectedMenus;
  index: number;
};

function Menu({ menu, index }: MenuProps) {
  const { setOrderCount, setModalState, setSelectedMenu, setIsDimOpen } = useContext(ModalContext)!;
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMenuMouseDown = () => {
    setIsZoomed(true);
  };

  const handleMenuMouseUp = () => {
    setIsZoomed(false);
    setModalState("order");
    setOrderCount(1);
    setIsDimOpen(true);
    console.log(menu);
    const updatedMenu = { ...menu, count: 1, size: "", temperature: "" };
    console.log(updatedMenu);
    setSelectedMenu(updatedMenu);
  };

  // const handleMenuClick = () => {
  //   setModalState("order");
  //   setOrderCount(1);
  //   setIsDimOpen(true);
  //   setSelectedMenu(menu);
  // };

  return (
    <div
      className={`${styles.Menu} ${isZoomed ? styles.zoomed : ""}`}
      // onClick={handleMenuClick}
      onMouseDown={handleMenuMouseDown}
      onMouseUp={handleMenuMouseUp}>
      <img src={menu.imageUrl} alt="menu" />
      <div className={styles.MenuName}>{menu.name}</div>
      <div className={styles.MenuPrice}>{menu.price}원</div>
      {index === 0 && <div className={styles.StarMark}>&#9733;</div>}
    </div>
  );
}
// import { useContext } from "react";

// import styles from "./MenuArea.module.css";
// import ModalContext from "../../contexts/ModalContext";

// export type Menus = {
//   imageUrl: string;
//   name: string;
//   price: number;
// };

// type MenuAreaProps = {
//   menus: Menus[];
//   animationClass: string;
// };

// export function MenuArea({ menus, animationClass }: MenuAreaProps) {
//   return (
//     <div className={`${styles.MenuArea} ${styles[animationClass]}`}>
//       {menus.map((menu, index) => (
//         <Menu menu={menu} key={index} index={index} />
//       ))}
//     </div>
//   );
// }

// function Menu({ menu, index }: { menu: Menus; index: number }) {
//   const contextValue = useContext(ModalContext)!;

//   const { setOrderCount, setModalState, setSelectedMenu, setIsDimOpen } = contextValue;

//   const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     console.log("핸들메뉴");
//     setModalState("order");
//     setOrderCount(1);
//     setIsDimOpen(true);

//     const menuInfo = getSelectedMenuInfo(event.currentTarget);

//     setSelectedMenu(menuInfo);
//   };

//   function getSelectedMenuInfo(target: HTMLElement): Menus {
//     const imgElem = target.firstElementChild!;
//     const imageUrl = imgElem.getAttribute("src")!;
//     const nameElem = imgElem.nextElementSibling!;
//     const name = nameElem.textContent!;
//     const priceElem = nameElem.nextElementSibling!;
//     const priceText = priceElem.textContent!;
//     const price = parseInt(priceText, 10);

//     return { imageUrl, name, price };
//   }

//   return (
//     <>
//       <div className={styles.Menu} onClick={handleMenuClick}>
//         <img src={menu.imageUrl} alt="menu" />
//         <div className={styles.MenuName}>{menu.name}</div>
//         <div className={styles.MenuPrice}>{menu.price}</div>
//         {index === 0 && <div className={styles.StarMark}>&#9733;</div>}
//       </div>
//     </>
//   );
// }
