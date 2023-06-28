import { createContext, useState, ReactNode } from "react";
import { Menus } from "../components/MenuArea/MenuArea";

type ModalContextType = {
  modalState: "order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null;
  setModalState: React.Dispatch<
    React.SetStateAction<"order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null>
  >;

  selectedMenu: Menus | null;
  setSelectedMenu: (menuInfo: Menus | null) => void;
  isOpenCart: boolean;
  setIsOpenCart: (isOpen: boolean) => void;
  cartMenuList: CartMenus[];
  setCartMenuList: (menuList: CartMenus[]) => void;
  orderCount: number;
  setOrderCount: (count: number) => void;

  isDimOpen: boolean;
  setIsDimOpen: (isOpen: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

export interface CartMenus {
  imgUrl: string;
  name: string;
  price: number;
  count: number;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<
    "order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null
  >(null);

  const [selectedMenu, setSelectedMenu] = useState<Menus | null>(null);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartMenuList, setCartMenuList] = useState<CartMenus[]>([]); // [{ imgUrl: "", name: "", price: 0 }
  const [orderCount, setOrderCount] = useState(1);

  const [isDimOpen, setIsDimOpen] = useState(false);

  const value: ModalContextType = {
    modalState,
    setModalState,

    selectedMenu,
    setSelectedMenu,
    isOpenCart,
    setIsOpenCart,
    cartMenuList,
    setCartMenuList,
    orderCount,
    setOrderCount,

    isDimOpen,
    setIsDimOpen,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalContext;
