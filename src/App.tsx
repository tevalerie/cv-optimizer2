import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import CVOptimizerApp from "./components/CVOptimizerApp";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Use tempo routes if in Tempo environment */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/*" element={<CVOptimizerApp />} />
          {/* Add this before the catchall route for Tempo */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
