import classNames from "classnames";
import React, { FunctionComponent, HTMLAttributes, useState } from "react";

import { Color, stringToLevel } from "./levels";
import { levelOneString } from "./levels/1";

const Box: FunctionComponent<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div
    {...props}
    className={classNames(
      "flex justify-center items-center h-8 w-8 rounded",
      props.className
    )}
  >
    {props.children}
  </div>
);

interface FieldProps {
  color: Color;
  star: boolean;
  row: number;
  column: number;
}

function getColorClass(color: Color) {
  switch (color) {
    case "G":
      return "bg-green-600";
    case "Y":
      return "bg-yellow-300";
    case "B":
      return "bg-blue-600";
    case "P":
      return "bg-pink-600";
    case "O":
      return "bg-orange-500";
  }
}

const CrossIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

function Field(props: FieldProps) {
  const [checked, setChecked] = useState(false);

  const middleRow = props.column === 7;

  return (
    <button onClick={() => setChecked(!checked)}>
      <Box
        className={classNames(
          getColorClass(props.color),
          middleRow && "ring-2 ring-white"
        )}
      >
        {checked && (
          <span className="font-bold">
            <CrossIcon />
          </span>
        )}
      </Box>
    </button>
  );
}

export function Game() {
  const columns = 15;
  const rows = 7;

  const level = stringToLevel(levelOneString);

  return (
    <div className="flex flex-col items-center p-4 bg-blue-900 font-black text-2xl rounded-xl shadow-lg">
      <div className="flex space-x-0.5">
        {[...Array(columns)].map((value, index) => (
          <Box className={classNames("bg-white capitalize", index === 7 && 'text-red-500')}>
            {String.fromCharCode(97 + index)}
          </Box>
        ))}
      </div>

      <div
        className="grid flex-none gap-0.5 mt-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {level.map((value, index) => (
          <Field
            key={index}
            color={value.color}
            star={value.star}
            row={Math.floor(index / columns)}
            column={index % columns}
          ></Field>
        ))}
      </div>

      <div className="grid grid-rows-2 grid-flow-col gap-0.5 mt-4">
        {[...Array(columns)].map((value, index) => (
          <>
            <Box className="bg-white">0</Box>
            <Box className="bg-white">0</Box>
          </>
        ))}
      </div>
    </div>
  );
}
