import React from "react";
import { Button } from "@/components/ui/button";

const BetButton = ({ title, odds, isSelected, onClick }) => {
  return (
    <Button variant="destructive" onClick={onClick} className={`flex flex-col text-xs gap-0 w-[150px] h-[40px] ${isSelected && "bg-primary"}`}>
      <span style={{ fontSize: ".7rem", lineHeight: "1.2" }} className="font-semibold">
        {title}
      </span>
      <span style={{ fontSize: "1rem", lineHeight: "1.2" }} className="font-bold">
        {odds}
      </span>
    </Button>
  );
};

export default BetButton;
