import styles from "./App.module.css";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies/" element={<Home />}></Route>
          <Route path="/movie/:id/" element={<Detail />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
