import { CpuProvider } from "./context/CpuContext";

import Settings from "./components/Settings/Settings";
import Simulator from "./components/Simulator/Simulator";

const App = () => {
  return (
    <>
      <header>
        <h1>CPU Simulator</h1>
      </header>
      <main className="container">
        <CpuProvider>
          <Settings />
          <Simulator />
        </CpuProvider>
      </main>
    </>
  );
};

export default App;
