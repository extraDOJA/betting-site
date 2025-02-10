export const showSuccessToast = (toast, message) => {
  toast({
    title: "Success",
    description: message,
  });
};

export const showErrorToast = (toast, message) => {
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};
