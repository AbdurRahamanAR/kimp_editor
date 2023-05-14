import "./styles.css";
import Editor from "./Editor";
import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState<string>();
  return (
    <div className="App">
      <button
        type="button"
        onClick={() => {
          setText("<p>lol</p>");
        }}
      >
        Update
      </button>
      <Editor value={text} onChange={setText} />
      <pre>{JSON.stringify(text, null, 2)}</pre>
    </div>
  );
}
