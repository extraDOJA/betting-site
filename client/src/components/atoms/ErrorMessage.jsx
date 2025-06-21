import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const ErrorMessage = ({ error }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="bg-card text-card-foreground border border-border shadow-lg rounded-xl px-8 py-8 max-w-md w-full flex flex-col items-center" role="alert" style={{ fontFamily: "Helvetica" }}>
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-base text-muted-foreground mb-2 text-center">Sorry, an error has occurred.</p>
        {error && <p className="text-sm text-muted-foreground mb-6 text-center break-all">Error: {error}</p>}
        <Button variant="outline" className="w-full max-w-[200px]" onClick={handleGoHome}>
          Back to homepage
        </Button>
      </div>
    </div>
  );
};

export default ErrorMessage;
