import "./App.css";
import CurrenctConvertor from "./components/Currenct-Convertor";

function App() {
  return (
    <>
      <div
        className="min-h-screen  bg-gray-100 flex flex-col
    items-center justify-content "
      >
        <div className="container">
          <CurrenctConvertor />
        </div>
      </div>
    </>
  );
}

export default App;
