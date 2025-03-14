import React from "react";
import { Button } from "@/components/ui/button";

const BetButton = ({ title, odds, isSelected, onClick }) => {
  return (
    <Button variant="destructive" onClick={onClick} className={`flex flex-col text-xs gap-0 w-[90px] lg:w-[105px] xl:w-[130px] h-[40px] ${isSelected && "bg-primary"}`}>
      <span style={{ lineHeight: "1.2" }} className="font-semibold">
        {title}
      </span>
      <span style={{ lineHeight: "1.2" }} className="font-bold lg:text-lg">
        {odds}
      </span>
    </Button>
  );
};

export default BetButton;
