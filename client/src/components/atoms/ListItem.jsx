import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router";

const ListItem = ({ children, country = "EU", to="#" }) => {
  return (
    <div className="group">
      <Link to={to} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors">
        <div className="flex-shrink-0">
          <div className="w-7 h-7 border-2 border-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <ReactCountryFlag countryCode={country} svg style={{ width: "25px", height: "25px", borderRadius: "50%", objectFit: "cover" }} />
          </div>
        </div>
        <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">{children}</span>
      </Link>
    </div>
  );
};

export default ListItem;
