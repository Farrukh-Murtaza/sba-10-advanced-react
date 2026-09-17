import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage"
import NotFound from "./pages/NotFound"
import SearchPage from "./pages/SearchPage"
import FavoritesPage from "./pages/FavoritesPage"
import RecipeDetailPage from "./pages/RecipeDetailPage"
import CategoryPage from "./pages/CategoryPage"
import Navbar from "./components/Navbar"

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fffaf5]">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />

          <Route
            path="/recipe/:recipeId"
            element={<RecipeDetailPage />}
          />

          <Route
            path="/favorites"
            element={<FavoritesPage />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
