import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
//必须要加这个，否则会直接下载一堆字体
import 'typeface-roboto'

ReactDOM.render(<App />, document.getElementById("root"));

// serviceWorker.unregister();

