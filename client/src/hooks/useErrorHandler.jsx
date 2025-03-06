import { useCallback } from "react";
import { useToast } from "./use-toast";
import { handleApiError, handleFormErrors } from "@/utils/errorHandler";

/**
 * Hook for easier error handling in React components
 */
export const useErrorHandler = () => {
  const { toast } = useToast();

  // API error handling
  const handleError = useCallback(
    (error) => {
      return handleApiError(error, toast);
    },
    [toast]
  );

  // Form error handling (integration with react-hook-form)
  const handleFormError = useCallback(
    (error, setError, defaultField= "root") => {
      // Try to map API errors to form fields
      const wasHandled = handleFormErrors(error, setError, defaultField);


      // If it wasn't possible to map to fields, show a general toast
      if (!wasHandled) {
        handleApiError(error, toast);
      }

      return wasHandled;
    },
    [toast]
  );

  return {
    handleError,
    handleFormError,
  };
};
