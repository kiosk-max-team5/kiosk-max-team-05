import { CategoryTabs } from "./CategoryTabs";
import { MenuArea } from "./MenuArea";
import styles from "./MainPage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Cart } from "./cart/Cart";
import ModalContext from "../ModalContext";

export function MainPage() {
  const [menuData, setMenuData] = useState([]);
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }

  const categories = ["커피", "라떼", "티", "쥬스", "디카페인"];
  const endpoint = useRef(["coffee", "latte", "tea", "juice", "decaf"]);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [animationClass, setAnimationClass] = useState("fade-enter");

  const handleTabClick = (index: number) => {
    if (index === currentCategory) return;
    setAnimationClass("fade-enter");
    setTimeout(() => {
      setAnimationClass("fade-exit");

      setCurrentCategory(index);
    }, 450);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      if (currentCategory >= 0) {
        try {
          const response = await fetch(`http://localhost:8080/${endpoint.current[currentCategory]}`);

          const menuData = await response.json();

          setMenuData(menuData);
        } catch (error) {
          console.error("Error fetching coffee data:", error);
        }
      }
    };
    fetchMenuData();

    console.log("안녕");
  }, [currentCategory, endpoint]);

  return (
    <div className={styles.MainPage}>
      <CategoryTabs categories={categories} onClick={handleTabClick} />
      {currentCategory >= 0 ? (
        <MenuArea animationClass={animationClass} menus={menuData} />
      ) : (
        <div className={styles.MainImage}></div>
      )}
      <Cart />
    </div>
  );
}
