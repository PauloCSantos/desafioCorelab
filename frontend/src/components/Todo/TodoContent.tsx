interface TodoContentProps {
  description: string | null;
}

export const TodoContent = ({ description }: TodoContentProps) => {
  return (
    <div className="px-3 my-3 line-clamp-[11] flex-1">
      <p className="text-xs">{description}</p>
    </div>
  );
};
