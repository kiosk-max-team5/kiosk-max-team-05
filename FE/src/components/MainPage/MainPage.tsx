import { CategoryTabs } from "../CategoryTabs/CategoryTabs";
import { MenuArea } from "../MenuArea/MenuArea";
import { useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";
import { Cart } from "../Cart/Cart";


// type category = {
//   name: string;
// };


export function MainPage() {
  const [menuData, setMenuData] = useState([]);

  const indexRef = useRef(0);
  const [activeTab, setActiveTab] = useState(-1);
  const [currentCategory, setCurrentCategory] = useState(-1);
  const [animationClass, setAnimationClass] = useState("");
  const [isTransitionEnd, setIsTransitionEnd] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  // const [categories, setCategories] = useState([]);
  const categories = ["커피", "라떼", "티", "쥬스", "디카페인"];
  const endpoint = useRef(["coffee", "latte", "tea", "juice", "decaf"]);

  const handleTabClick = (index: number) => {
    if (index === currentCategory) return;
    setAnimationClass("fade-enter");
    indexRef.current = index;
  };

  useEffect(() => {
    if (isTransitionEnd) {
      setCurrentCategory(indexRef.current);
      setActiveTab(indexRef.current);
    }
  }, [isTransitionEnd]);

  useEffect(() => {
    console.log("패치된거임");
    setIsFetched(false);
    // setAnimationClass("fade");
  }, [isFetched]);

  useEffect(() => {
    setAnimationClass("fade-exit");
    setIsTransitionEnd(false);
  }, [activeTab]);

  const handleTransitionEnd = () => {
    setIsTransitionEnd(true);
  };

  // useEffect(() => {
  //   setAnimationClass("fade-enter");
  // }, [index]);

  // useEffect(() => {
  //   // if (isTransitionEnd) {
  //   setCurrentCategory(index);
  //   setActiveTab(index);
  //   setAnimationClass("fade-exit");
  //   // }
  // }, [index]);

  // const handleTabClick = (index: number) => {
  //   if (index === currentCategory) return;
  //   setAnimationClass("fade-enter");
  //   setTimeout(() => {
  //     setCurrentCategory(index);
  //     setActiveTab(index);
  //     setAnimationClass("fade-exit");
  //   }, 1100);
  // };

  const handleClickMainImage = () => {
    indexRef.current = 0;
    setIsTransitionEnd(true);
    console.log("메인이미지 클릭");
  };

  // const handleClickMainImage = () => {

  //   handleTabClick(0);
  // };

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/categories");
  //       const data = await response.json();
  //       const categoryNames = data.map((category: category) => category.name);

  //       setCategories(categoryNames);
  //     } catch (error) {
  //       console.error("Error fetching categories data:", error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const fetchMenuData = async () => {
      if (currentCategory >= 0) {
        try {
          // const response = await fetch(`http://localhost:8080/${endpoint.current[currentCategory]}`);
          // const response = await fetch("/api/v1/products?category=coffee");
          const response = await fetch(`/api/v1/products?category=${endpoint.current[currentCategory]}`);

          const data = await response.json();
          console.log("원본데이터");
          console.log(data);

          const menuData = data.message;
          console.log("메세지안에 배열");
          console.log(menuData);

          setMenuData(menuData);
          setAnimationClass("fade");
          setIsFetched(true);
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
        <MenuArea animationClass={animationClass} menus={menuData} onTransitionEnd={handleTransitionEnd} />
      ) : (
        // <MenuArea animationClass={animationClass} menus={menuData} />
        <div className={styles.MainImage} onClick={handleClickMainImage}>
          <img src="/assets/logo.svg" alt="main" />
        </div>
      )}
      <Cart />
    </div>
  );
}
