export type Column = {
  value: string;
  label: string;
  minWidth?: number;
  colSpan?: number;
};

export type NameIdType<T = string | number> = {
  name: string;
  id: T;
};
