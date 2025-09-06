// src/components/Layout/MainLayout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="lg:flex h-screen bg-[#f1f5f9]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        
        {/* Navbar visible only on md and above */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
