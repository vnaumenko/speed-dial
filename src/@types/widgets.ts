type PlacementType = "one" | "two" | "three" | "four" | "five" | "six" | "seven";

interface IWidget {
  id: string;
  placement: PlacementType;
  innerState: any;
}

export type { IWidget };
