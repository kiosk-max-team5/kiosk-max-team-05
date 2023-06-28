import { CategoryTabs } from "../CategoryTabs/CategoryTabs";
import { MenuArea } from "../MenuArea/MenuArea";
import { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";
import { Cart } from "../Cart/Cart";


type category = {
  name: string;
};

export function MainPage() {
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [animationClass, setAnimationClass] = useState("fade-enter");

  const [categories, setCategories] = useState([]);
  const endpoint = useRef(["coffee", "latte", "tea", "juice", "decaf"]);

  const handleTabClick = (index: number) => {
    if (index === currentCategory) return;
    setAnimationClass("fade-enter");
    setTimeout(() => {
      setAnimationClass("fade-exit");

      setCurrentCategory(index);
      setActiveTab(index);
    }, 450);
  };

  const handleClickMainImage = () => {
    handleTabClick(0);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/v1/products?category=coffee");
        const data = await response.json();
        const categoryNames = data.map((category: category) => category.name);

        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };

    fetchCategories();
  }, []);

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
  }, [currentCategory, endpoint]);

  return (
    <div className={styles.MainPage}>
      <CategoryTabs categories={categories} onClick={handleTabClick} activeTab={activeTab} />
      {currentCategory >= 0 ? (
        <MenuArea animationClass={animationClass} menus={menuData} />
      ) : (
        <div className={styles.MainImage} onClick={handleClickMainImage}></div>
      )}
      <Cart />
    </div>
  );
}
