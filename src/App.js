import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Layout from "components/layout.component";
import NotFound from "pages/NotFound";
import News from "pages/News";
import EditNews from "pages/EditNews";
import AddNews from "pages/AddNews";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="news">
            <Route path=":id" element={<News />} />
            <Route path="edit/:id" element={<EditNews />} />
            <Route path="add" element={<AddNews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
