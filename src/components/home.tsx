import CVOptimizerApp from "./CVOptimizerApp";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#2B6CB0] font-montserrat">
            Q-Genics AI CV Optimizer
          </h1>
        </div>
      </header>
      <main>
        <CVOptimizerApp />
      </main>
      <footer className="mt-12 py-6 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Q-Genics AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
