import "./App.css";
import AppRoute from "./routes/appRoute";
import { CartProvider } from "./services/auth/UsersService";

function App() {
  return (
    <div className="App">
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;
