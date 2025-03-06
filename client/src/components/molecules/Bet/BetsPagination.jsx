import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BetsPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Poprzednia strona"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Następna strona"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default React.memo(BetsPagination);