import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./components/feed/feed";
import Logout from "./components/login&logout/Logout";
import Profile from "./components/profile/Profile";
import "./index.css";
import appStore from "./utils/appStore";
import Login from "./components/login&logout/Login";
import Signup from "./components/signup/signup";
import Connection from './components/connection/connection';

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<Body />}>
              
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/connections" element={<Connection />} />
              
              {/* <Route path="" element={< />}/> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
