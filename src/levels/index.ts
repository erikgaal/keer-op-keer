export type Color = "G" | "Y" | "B" | "P" | "O";

export type Field = {
  color: Color;
  star: boolean;
};

export type Level = Array<Field>;

export function stringToLevel(input: string): Level {
  return input
    .split(/(\w\*?)/)
    .filter(Boolean)
    .map((field: string) => ({
      color: field.toUpperCase() as Color,
      star: field === field.toUpperCase(),
    }));
}
