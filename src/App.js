import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import StateManager from "./Components/StateManager";
import { DataProvider } from "./ContextProvider";

function App() {
  return (
    <div>
      <DataProvider>
          <StateManager/>
          <Button/>
      </DataProvider>
      
      

    </div>
  );
}

export default App;
