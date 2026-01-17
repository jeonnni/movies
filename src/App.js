import styles from "./App.module.css";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/movie/:id/" element={<Detail />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movies/" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
