import { toast } from "sonner";
import { copyToClipboard } from "@/lib/clipboard";

interface UseConverterActionsProps {
  inputValue: string;
  outputValue: string;
  clearAll: () => void;
  swapPanels: () => void;
}

export const useConverterActions = ({
  inputValue,
  outputValue,
  clearAll,
  swapPanels,
}: UseConverterActionsProps) => {
  const handleCopy = async (text: string, type: string) => {
    if (!text) {
      toast.error("No content to copy");
      return;
    }

    const success = await copyToClipboard(text);
    if (success) {
      toast.success(`${type} copied to clipboard`, {
        duration: 2000,
      });
    } else {
      toast.error("Error copying to clipboard");
    }
  };

  const handleSwap = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to swap");
      return;
    }

    swapPanels();
    toast.success("Panels swapped");
  };

  const handleClear = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to clear");
      return;
    }

    clearAll();
    toast.success("Content cleared");
  };

  const handleInputCopy = () => handleCopy(inputValue, "Input");
  const handleOutputCopy = () => handleCopy(outputValue, "Output");

  return {
    handleInputCopy,
    handleOutputCopy,
    handleSwap,
    handleClear,
  };
};
