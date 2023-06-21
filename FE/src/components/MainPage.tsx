import { CategoryTabs } from "./CategoryTabs";
import { MenuArea } from "./MenuArea";
import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";

export function MainPage() {
  const [menuData, setMenuData] = useState([]);

  const categories = ["커피", "라떼", "티", "쥬스", "디카페인"];
  const endpoint = ["coffee", "latte", "tea", "juice", "decaf"];
  const [currentCategory, setCurrentCategory] = useState(-1);

  const handleTabClick = (index: number) => {
    setCurrentCategory(index);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${endpoint[currentCategory]}`);
        const menuData = await response.json();
        console.log(menuData);
        setMenuData(menuData);
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      }
    };

    fetchMenuData();
  }, [currentCategory]);
  return (
    <div className={styles.MainPage}>
      <CategoryTabs categories={categories} onClick={handleTabClick} />
      {currentCategory >= 0 ? <MenuArea menus={menuData} /> : <div className={styles.MainImage}></div>}
    </div>
  );
}

// const menus = [
//   {
//     커피: [
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "아메리카노",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "바닐라라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "카페모카",
//         price: 4000,
//       },
//     ],
//   },
//   {
//     라떼: [
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "아메리카노",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "바닐라라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "카페모카",
//         price: 4000,
//       },
//     ],
//   },
//   {
//     티: [
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "아메리카노",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "바닐라라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "카페모카",
//         price: 4000,
//       },
//     ],
//   },
//   {
//     쥬스: [
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "아메리카노",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "바닐라라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "카페모카",
//         price: 4000,
//       },
//     ],
//   },
//   {
//     디카페인: [
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "아메리카노",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "바닐라라떼",
//         price: 4000,
//       },
//       {
//         imgUrl: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mug-2031218_960_720.jpg",
//         name: "카페모카",
//         price: 4000,
//       },
//     ],
//   },
// ];
