import { createContext, useState, ReactNode, useRef } from "react";
// import { Menus } from "../components/MenuArea/MenuArea";

export type selectedMenus = {
  size?: string;
  imageUrl: string;
  name: string;
  price: number;
  id?: number;
  temperature?: string;
  count?: number;
};

// export type selectedMenus = {
//   imageUrl: string;
//   name: string;
//   price: number;
//   size?: string;
//   id?: number;
//   temperature?: string;
//   count?: number;
// };

type ModalContextType = {
  modalState: "order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null;
  setModalState: React.Dispatch<
    React.SetStateAction<"order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null>
  >;

  selectedMenu: selectedMenus | null;
  setSelectedMenu: (menuInfo: selectedMenus | null) => void;
  isOpenCart: boolean;
  setIsOpenCart: (isOpen: boolean) => void;
  cartMenuList: CartMenus[];
  setCartMenuList: (menuList: CartMenus[]) => void;
  orderCount: number;
  setOrderCount: (count: number) => void;

  isZoomed: boolean;
  setIsZoomed: (isZoomed: boolean) => void;

  isDimOpen: boolean;
  setIsDimOpen: (isOpen: boolean) => void;

  orderInfo: OrderInfo;
};

type OrderInfo = React.MutableRefObject<{
  payments: string;
  orderPrice: number;
  inputPrice: number;
  orderProducts: {
    productId: number;
    count: number;
    size: string;
    temperature: string;
  }[];
}>;

export const initOrderInfo = {
  payments: "",
  orderPrice: 0,
  inputPrice: 0,
  orderProducts: [],
};

type ModalProviderProps = {
  children: ReactNode;
};

export interface CartMenus {
  imageUrl: string;
  name: string;
  price: number;
  count: number;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: ModalProviderProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalState, setModalState] = useState<"order" | "payment" | "cardPayment" | "cashPayment" | "receipt" | null>(
    null
  );

  const [selectedMenu, setSelectedMenu] = useState<selectedMenus | null>(null);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartMenuList, setCartMenuList] = useState<CartMenus[]>([]); // [{ imageUrl: "", name: "", price: 0 }
  const [orderCount, setOrderCount] = useState(1);

  const [isDimOpen, setIsDimOpen] = useState(false);

  const orderInfo = useRef(initOrderInfo);
  // const orderInfoList = useRef([]);

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

    isZoomed,
    setIsZoomed,

    isDimOpen,
    setIsDimOpen,

    orderInfo,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalContext;
