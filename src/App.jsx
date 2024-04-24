import { CpuProvider } from "./context/CpuContext";

import Settings from "./components/Settings/Settings";
import Simulator from "./components/Simulator/Simulator";

const App = () => {
  return (
    <>
      <header>
        <h1>CPU Simulator</h1>
      </header>
      <div className="container">
        <CpuProvider>
          <Settings />
          <Simulator />
        </CpuProvider>
      </div>
    </>
  );
};

export default App;
