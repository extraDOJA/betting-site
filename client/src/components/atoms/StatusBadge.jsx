import React from "react";
import { Badge } from "@/components/ui/badge";
import { getBadgeStyles } from "@/utils/formatBet";

const StatusBadge = ({ status, className = "" }) => {
  const { variant, className: badgeClassName } = getBadgeStyles(status);
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <Badge 
      variant={variant} 
      className={`text-sm ${badgeClassName || ""} ${className}`}
    >
      {formattedStatus}
    </Badge>
  );
};

export default StatusBadge;