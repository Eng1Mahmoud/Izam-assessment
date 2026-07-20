import { Routes, Route } from "react-router";
import ListPage from "./pages/list/ListPage";
import DetailPage from "./pages/detail/DetailPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/pokemon/:id" element={<DetailPage />} />
      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center text-slate-500">
            Page not found.
          </div>
        }
      />
    </Routes>
  );
}
