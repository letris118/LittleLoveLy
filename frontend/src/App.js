import "./App.css";
import AppRoute from "./routes/appRoute";
import { CartProvider } from "./services/auth/UsersService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;
