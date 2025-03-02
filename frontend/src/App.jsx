import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ErrorBoundary from './Pages/ErrorBoundary/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { useGetProfileQuery } from "./redux/featurtes/userApiSlice";
import { useEffect } from "react";

function App() {
  const {isSuccess,refetch} = useGetProfileQuery()
  useEffect(()=>{if(!isSuccess){
    refetch();
  }},[isSuccess,refetch])
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        
         <Header className="mt-2" />
        
        <main className="flex-grow py-4">
          <Outlet />
        </main>
        
         <Footer />
        <ToastContainer/>
      </div>
    </ErrorBoundary>
  );
}

export default App;