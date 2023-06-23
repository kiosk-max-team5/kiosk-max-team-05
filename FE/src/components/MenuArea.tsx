import { useContext } from "react";
import ModalContext from "../ModalContext";
import styles from "./MenuArea.module.css";

export interface Menus {
  imgUrl: string;
  name: string;
  price: number;
}

export function MenuArea({ menus, animationClass }: { menus: Menus[]; animationClass: string }) {
  return (
    <div className={`${styles.MenuArea} ${styles[animationClass]}`}>
      {menus.map((menu, index) => (
        <Menu menu={menu} key={index} index={index} />
      ))}
    </div>
  );
}

function Menu({ menu, index }: { menu: Menus; index: number }) {
  const contextValue = useContext(ModalContext);

  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { setOrderCount, setIsOrderModalOpen, setSelectedMenu } = contextValue;

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOrderModalOpen(true);
    setOrderCount(1);
    
    const menuInfo = getSelectedMenuInfo(event.currentTarget);

    setSelectedMenu(menuInfo);
  };

  function getSelectedMenuInfo(target: HTMLElement): Menus {
    const imgElem = target.firstElementChild;
    const imgUrl = imgElem?.getAttribute("src")!;
    const nameElem = imgElem?.nextElementSibling;
    const name = imgElem?.nextElementSibling?.textContent!;
    const priceElem = nameElem?.nextElementSibling;
    const priceText = priceElem?.textContent!;
    const price = parseInt(priceText, 10);

    return { imgUrl, name, price };
  }

  return (
    <>
      <div className={styles.Menu} onClick={handleMenuClick}>
        <img src={menu.imgUrl} alt="menu" />
        <div className={styles.MenuName}>{menu.name}</div>
        <div className={styles.MenuPrice}>{menu.price}</div>
        {index === 0 && <div className={styles.StarMark}>&#9733;</div>}
      </div>
    </>
  );
}
