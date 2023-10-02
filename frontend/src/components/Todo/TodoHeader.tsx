import Star from "../Star/Star";

interface TodoHeaderProps {
  title: string;
  favoriteStatus: boolean;
}

export const TodoHeader = ({ title, favoriteStatus }: TodoHeaderProps) => {
  return (
    <>
      <div className="flex w-full h-max justify-between align-middle p-3">
        <p className="font-bold w-10/12 text-sm line-clamp-1">{title}</p>
        <div className="" style={{ color: "white" }}>
          <Star kind={favoriteStatus} />
        </div>
      </div>
      <hr />
    </>
  );
};
