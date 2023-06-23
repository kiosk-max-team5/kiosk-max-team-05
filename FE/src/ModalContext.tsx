import { createContext, useState, ReactNode } from "react";
import { Menus } from "./components/MenuArea";

type ModalContextType = {
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (isOpen: boolean) => void;
  selectedMenu: Menus | null;
  setSelectedMenu: (menuInfo: Menus | null) => void;
  isOpenCart: boolean;
  setIsOpenCart: (isOpen: boolean) => void;
  cartMenuList: CartMenus[];
  setCartMenuList: (menuList: CartMenus[]) => void;
  orderCount: number;
  setOrderCount: (count: number) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (isOpen: boolean) => void;
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<Menus | null>(null);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartMenuList, setCartMenuList] = useState<CartMenus[]>([]); // [{ imgUrl: "", name: "", price: 0 }
  const [orderCount, setOrderCount] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDimOpen, setIsDimOpen] = useState(false);

  const value: ModalContextType = {
    isOrderModalOpen,
    setIsOrderModalOpen,
    selectedMenu,
    setSelectedMenu,
    isOpenCart,
    setIsOpenCart,
    cartMenuList,
    setCartMenuList,
    orderCount,
    setOrderCount,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    isDimOpen,
    setIsDimOpen,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalContext;
