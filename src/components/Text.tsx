interface TextProps {
  children?: React.ReactNode;
}
export function Text({ children }: TextProps) {
  return <span className={'text-2xl font-bold'}>{children}</span>;
}
