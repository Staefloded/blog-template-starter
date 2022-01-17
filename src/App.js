import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Layout from "components/layout.component";
import NotFound from "pages/NotFound";
import News from "pages/News";
import EditNews from "pages/EditNews";
import NewsLanding from "pages/NewsLanding";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="news">
            <Route index element={<NewsLanding />} />
            <Route path=":id" element={<News />} />
            <Route path="edit/:id" element={<EditNews />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
