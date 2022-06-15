import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Playground from "./components/Playground";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Playground />
	</React.StrictMode>
);
