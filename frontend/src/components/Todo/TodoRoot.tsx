interface TodoRootProps {
  children: React.ReactNode;
  color: string;
}

export const TodoRoot = ({ children, color }: TodoRootProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl border border-gray-100 drop-shadow-xl my-3 h-[437px] w-[390px]"
      style={{ backgroundColor: color }}
    >
      {children}
    </div>
  );
};
