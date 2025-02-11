import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const AccordionPanelItem = ({ children, title }) => {
  return (
    <AccordionItem className="border-none" value={title}>
      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 hover:rounded-lg transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4">
        <div className="divide-y divide-gray-100">
          {children}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccordionPanelItem;
