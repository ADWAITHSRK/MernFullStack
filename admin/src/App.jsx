import { ToastContainer } from "react-toastify";
import "./App.css";

import { Outlet } from 'react-router-dom';

function App() {
  
  return (
      <div className="min-h-screen flex flex-col">
        
        
        <main className="flex-grow py-4">
          <Outlet />
        </main>
        
        <ToastContainer/>
      </div>
  );
}

export default App;