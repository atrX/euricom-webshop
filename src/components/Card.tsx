import type { ReactNode } from "react";
import Button from "./Button";

export type CardProps = {
  actionText?: string;
  children?: ReactNode;
  image: string;
  onActionClick?: () => void;
  title: string;
};

const Card: React.FC<CardProps> = ({
  actionText,
  children,
  image,
  onActionClick,
  title,
}) => {
  return (
    <div className="card bg-base-200 shadow-xl md:card-side">
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-64 w-48 object-cover" src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
        <div className="card-actions justify-end">
          {actionText && (
            <Button disabled={!onActionClick} onClick={onActionClick}>
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
