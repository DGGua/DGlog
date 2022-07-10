import "./App.css";
import MainPage from "./pages/ts/MainPage";
import Navigator from "./components/ts/Navigator";
import { Route, Routes } from "react-router-dom";
import BlogPage from "./pages/ts/BlogPage";
function App() {
  const tags = [
    { name: "首页", url: "/home" },
    { name: "DGoDo", url: "http://dgodo.dggua.top" },
  ];

  return (
    <>
      <Navigator tags={tags}></Navigator>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:blogId" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;
