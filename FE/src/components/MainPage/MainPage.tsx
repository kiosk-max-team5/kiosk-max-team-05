import { CategoryTabs } from "../CategoryTabs/CategoryTabs";
import { MenuArea } from "../MenuArea/MenuArea";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./MainPage.module.css";
import { Cart } from "../Cart/Cart";
import ModalContext from "../../contexts/ModalContext";


// type category = {
//   name: string;
// };


export function MainPage() {
  const contextValue = useContext(ModalContext)!;
  const { currentCategory, setCurrentCategory } = contextValue;

  const [menuData, setMenuData] = useState([]);
  const indexRef = useRef(0);
  const [activeTab, setActiveTab] = useState(-1);
  // const [currentCategory, setCurrentCategory] = useState(-1);
  const [animationClass, setAnimationClass] = useState("fade-mount");
  const [isTransitionEnd, setIsTransitionEnd] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  // const [categories, setCategories] = useState([]);
  const categories = ["커피", "라떼", "티", "쥬스", "디카페인"];
  const endpoint = useRef(["coffee", "latte", "tea", "juice", "decaf"]);

  const handleTabClick = (index: number) => {
    if (index === currentCategory) return;
    setAnimationClass("fade-out");
    indexRef.current = index;
  };

  useEffect(() => {
    if (isTransitionEnd) {
      setCurrentCategory(indexRef.current);
      setActiveTab(indexRef.current);
    }
  }, [isTransitionEnd, setCurrentCategory]);

  useEffect(() => {
    console.log("패치된거임");
    setIsFetched(false);
    // setAnimationClass("fade");
  }, [isFetched]);

  useEffect(() => {
    // setAnimationClass("fade-mount");
    setIsTransitionEnd(false);
  }, [activeTab]);

  const handleTransitionEnd = () => {
    setIsTransitionEnd(true);
  };

  const handleClickMainImage = () => {
    indexRef.current = 0;
    setIsTransitionEnd(true);
    console.log("메인이미지 클릭");
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      if (currentCategory >= 0) {
        try {
          // const response = await fetch(`http://localhost:8080/${endpoint.current[currentCategory]}`);

          const response = await fetch(`/api/v1/products?category=${endpoint.current[currentCategory]}`);

          const data = await response.json();
          console.log("원본데이터");
          console.log(data);

          const menuData = data.message;
          console.log("메세지안에 배열");
          console.log(menuData);

          setMenuData(menuData);
          setIsFetched(true);
          setAnimationClass("fade-mount");
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
        <div className={styles.MainImage} onClick={handleClickMainImage}>
          <div className={styles.MainText}>주문하시려면 화면을 터치해주세요</div>
          <img src="/assets/logo.svg" alt="main" />
        </div>
      )}
      <Cart />
    </div>
  );
}
