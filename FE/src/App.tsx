import "./App.css";
import { ModalProvider } from "./ModalContext";
import { MainPage } from "./components/MainPage";
import { OrderModal } from "./components/modal/OrderModal";

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <MainPage />
        <OrderModal />
      </ModalProvider>
    </div>
  );
}

export default App;
