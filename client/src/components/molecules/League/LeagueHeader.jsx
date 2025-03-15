import React from "react";
import ReactCountryFlag from "react-country-flag";

const LeagueHeader = ({ league }) => {
  return (
    <div className="rounded-lg p-6 mb-6 bg-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-5">
          {league?.country_code ? (
            <div className="relative">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
                <ReactCountryFlag countryCode={league?.country_code} svg style={{ width: "40px", height: "40px" }} />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-500 text-xl font-bold">{league?.name?.charAt(0) || "L"}</span>
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-800">{league?.name}</h1>
          </div>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-500 font-medium flex items-center">
              <span className="mr-1">•</span>
              {league?.sport?.name || "Sport"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueHeader;
