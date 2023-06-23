import { useContext } from "react";
import styles from "./Dim.module.css";
import ModalContext from "../ModalContext";

export function Dim() {
  const contextValue = useContext(ModalContext);
  if (!contextValue) {
    throw new Error("ModalContext is not provided");
  }
  const { isDimOpen } = contextValue;

  return isDimOpen ? <div className={styles.Dim}></div> : null;
}
