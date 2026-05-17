import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}

export default MainLayout;