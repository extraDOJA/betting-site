import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./routes/ProtectedRoute";
import BalancePage from "./pages/BalancePage";
import BetsPage from "./pages/BetsPage";
import LeaguePage from "./pages/LeaguePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/league/:leagueSlug" element={<LeaguePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/user/bets" element={<BetsPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
