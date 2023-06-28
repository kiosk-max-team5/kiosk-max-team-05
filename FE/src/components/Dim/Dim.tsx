import { useContext } from "react";
import styles from "./Dim.module.css";
import ModalContext from "../../contexts/ModalContext";

export function Dim() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isDimOpen, setIsDimOpen, setModalState } = contextValue;

  const handleBackgroundClick = () => {
    setIsDimOpen(false);
    setModalState(null);
  };

  return isDimOpen ? <div className={styles.Dim} onClick={handleBackgroundClick}></div> : null;
}
