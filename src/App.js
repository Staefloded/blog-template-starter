import { Routes, Route } from "react-router-dom";

import Home from "pages/Home";
import Layout from "components/layout.component";
import NotFound from "pages/NotFound";
import News from "pages/News";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="news">
            <Route path=":id" element={<News />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
