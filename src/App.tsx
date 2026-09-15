import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage"
import NotFound from "./pages/NotFound"

function App() {

  return (

    <Routes>
      <Route index element={<HomePage />} />


      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default App
