import React, { FunctionComponent, useRef, useState } from "react";
import "./App.css";

import { Game } from "./Game";
import { useWindowSize } from "./hooks/useWindowSize";

function App() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <ScaleToFit>
        <Game />
      </ScaleToFit>
    </div>
  );
}

const ScaleToFit: FunctionComponent = (props) => {
  const size = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  let scale = 1;

  if (ref.current && size.height && size.width) {
    const padding = 32;

    scale = Math.min(
      size.height / (ref.current.offsetHeight + padding),
      size.width / (ref.current.offsetWidth + padding)
    );
  }

  return (
    <div
      className="transition"
      style={{ transform: `scale(${scale})` }}
      ref={ref}
      {...props}
    />
  );
};

export default App;
