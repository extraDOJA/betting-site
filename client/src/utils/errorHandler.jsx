// Formats error messages from various sources
export const formatErrorMessage = (error) => {
  if (!error) return "An error occurred";

  if (error.response?.data) {
    const { data } = error.response;

    if (data.detail) return data.detail;
    if (data.message) return data.message;
    if (data.error) return data.error;

    if (typeof data === "object" && Object.keys(data).length > 0) {
      const firstErrorField = Object.keys(data)[0];
      return `${firstErrorField}: ${data[firstErrorField]}`;
    }
  }

  if (error.message) return error.message;

  if (typeof error === "string") return error;

  return "An error occurred";
};

// Main function for handling API errors
export const handleApiError = (error, toast) => {
  const errorMessage = formatErrorMessage(error);

  if (toast) {
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  console.error("API Error:", error);

  return errorMessage;
};

// Form error handling
export const handleFormErrors = (error, setError, defaultField = "root") => {
    if (error?.response?.data && typeof error.response.data === 'object') {
      const { data } = error.response;

      if (data.detail) {
        setError(defaultField, { 
          type: "manual", 
          message: data.detail 
        });
        return true;
      }
      
      // Map API errors to form fields
      Object.entries(data).forEach(([field, message]) => {
        const errorMessage = Array.isArray(message) ? message[0] : message;
        setError(field, { 
          type: "manual", 
          message: errorMessage 
        });
      });
      
      return true;
    }
    
    return false;
  };
