import { useCallback, useState } from "react";

const useCustomDialog = () => {
  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  const handleCustomDialogOpen = useCallback(() => {
    setCustomDialogOpen(true);
  }, []);

  const handleCustomDialogClose = useCallback(() => {
    setCustomDialogOpen(false);
  }, []);

  return { customDialogOpen, handleCustomDialogOpen, handleCustomDialogClose };
};

export default useCustomDialog;
