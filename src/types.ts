export type Column = {
  value: string;
  label: string;
  minWidth?: number;
  colSpan?: number;
};

export type NameIdType<T = number> = {
  name: string;
  id: T;
};
export type ApiResponseSuccessMessage = {
  message: string;
};
export type StatCardProps = {
  title: string;
  stat: number;
  icon: React.ReactNode;
  bgColor?: string;
};
