import styles from "./MenuArea.module.css";

interface Menus {
  imgUrl: string;
  name: string;
  price: number;
}

export function MenuArea({ menus }: { menus: Menus[] }) {
  console.log(menus);

  menus.map((menu) => console.log(menu));

  return (
    <div className={styles.MenuArea}>
      {menus.map((menu, index) => (
        <Menu menu={menu} key={index} />
      ))}
    </div>
  );
}

function Menu({ menu }: { menu: Menus }) {
  return (
    <div className={styles.Menu}>
      <img src={menu.imgUrl} alt="menu" />
      <div className={styles.name}>{menu.name}</div>
      <div className={styles.price}>{menu.price}</div>
    </div>
  );
}
