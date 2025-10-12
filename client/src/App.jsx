import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { Toaster } from "sonner";

// Import all components
import {Password} from "./components/Password";
import { Username } from "./components/Username";
import {Register} from "./components/Register";
import {Profile} from "./components/Profile";
import {Recovery} from "./components/Recovery";
import {Reset} from "./components/Reset";
// import {NotFound} from "./components/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route  element={<AuthPage />} /> */}
      <Route index element={<Username />} />
      <Route path="password" element={<Password/>}/>
      <Route path="recovery" element={<Recovery/>}/>
      <Route path="reset" element={<Reset/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route
        path="*"
        element={
          <div className="flex justify-center items-center text-3xl font bold">
            404 Page NOt Found
          </div>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <Toaster position="top-center" richColors duration={3000} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
