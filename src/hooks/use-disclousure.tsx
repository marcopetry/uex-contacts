import { useState } from "react";

export const useDisclousure = (defaultIsOpen?: boolean) => {
  const [isOpen, setIsOpen] = useState(!!defaultIsOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((old) => !old);

  return {
    isOpen,
    onClose,
    onOpen,
    onToggle,
  };
};
