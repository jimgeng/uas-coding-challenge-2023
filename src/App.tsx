import { useState } from "react";
import Table from "./components/Table";
import History from "./components/History";

function App() {
  const [tableSize, setTableSize] = useState(12);
  const [operationHistory, setOperationHistory] = useState<Set<string>>(
    new Set()
  );

  function addToOperationHistory(newOperation: string) {
    setOperationHistory((prev) => new Set(prev.add(newOperation)));
  }

  function changeTableSize(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.value === "") {
      setTableSize(0);
    } else {
      const newSize: number = parseInt(event.currentTarget.value);
      if (!isNaN(newSize) && newSize > 0) {
        setTableSize(newSize);
      }
    }
  }

  return (
    <main className="flex justify-between flex-col h-screen gap-[5%] bg-gray-200 p-4 dark:bg-gray-800 lg:flex-row">
      <Table size={tableSize} addToOperationHistory={addToOperationHistory} />
      <div className="h-[45%] lg:h-full flex-grow mt-4 flex flex-col lg:mt-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold dark:text-gray-100">History</h1>
          <div>
            <p className="mr-4 inline text-xl dark:text-gray-100">Size:</p>
            <input
              type="number"
              name="size"
              id="size"
              value={tableSize === 0 ? "" : tableSize}
              onChange={changeTableSize}
              className="w-32 appearance-none rounded-md border-2 px-4 py-2 text-lg outline-none transition-all focus:border-solid focus:border-emerald-600 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 dark:focus:bg-gray-600"
            />
          </div>
        </div>
        <History history={operationHistory} />
      </div>
    </main>
  );
}

export default App;
