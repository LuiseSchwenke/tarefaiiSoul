import Button from "./Components/Button/Button";
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
