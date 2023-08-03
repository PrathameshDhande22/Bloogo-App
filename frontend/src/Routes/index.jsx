import { Route, Routes } from "react-router-dom";
import {
  Home,
  About,
  Developers,
  Blogs,
  SignUp,
  Login,
  Profile,
  Send,
  Verify,
  Error,
  Forgot,
  ChangePassword,
  Blog,
  NewBlog,
} from "../Pages";
import { SpinPage } from "../utils/SpinPage";
import { useSelector } from "react-redux";
import { RemoveAccess } from "../components/RemoveAccess";
import AuthProvider from "../Auth";
import { CheckAccess } from "../components/CheckAccess";

const NestedComponents = {
  home: (
    <SpinPage>
      <Home />
    </SpinPage>
  ),
  newblog: (
    <CheckAccess>
      <NewBlog />
    </CheckAccess>
  ),
};

const Content = () => {
  const isAuthentic = useSelector((state) => state.login.isLogin);
  const uData = useSelector((state) => state.udata.userData.isverified);

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
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/blog/:blogid" element={<Blog />} />
      <Route path="/verify/:token" element={uData ? <Error /> : <Verify />} />
      <Route element={<AuthProvider />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/send" element={uData ? <Error /> : <Send />} />
        <Route path="/blog/new" element={NestedComponents.newblog} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
export default Content;
