import "./App.css";
import { ModalProvider } from "./contexts/ModalContext";
import { MainPage } from "./components/MainPage/MainPage";
import { Modal } from "./components/Modal/Modal";
import { Dim } from "./components/Dim/Dim";

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Modal />
        <MainPage />
        <Dim />
      </ModalProvider>
    </div>
  );
}

export default App;
