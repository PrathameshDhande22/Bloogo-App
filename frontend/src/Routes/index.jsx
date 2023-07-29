import { Route, Routes } from "react-router-dom";
import { Home, About, Developers, Blogs, SignUp, Login } from "../Pages";
import { SpinPage } from "../utils/SpinPage";
import { useSelector } from "react-redux";
import { RemoveAccess } from "../components/RemoveAccess";

const NestedComponents = {
  home: (
    <SpinPage>
      <Home />
    </SpinPage>
  ),
};

const Content = () => {
  const isAuthentic = useSelector((state) => state.login.isLogin);
  return (
    // TODO : Add the Dashboard Page.
    <Routes>
      <Route
        path="/"
        element={isAuthentic ? null : NestedComponents?.home}
        index
      />
      <Route
        path="/home"
        element={isAuthentic ? null : NestedComponents?.home}
      />
      <Route path="/about" element={<About />} />
      <Route path="/developer" element={<Developers />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/signup" element={<RemoveAccess element={<SignUp />} />} />
      <Route path="/login" element={<RemoveAccess element={<Login />} />} />
    </Routes>
  );
};
export default Content;
