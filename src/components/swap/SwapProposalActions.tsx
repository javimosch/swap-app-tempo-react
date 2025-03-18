import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SaveIcon, SendIcon, XIcon, HelpCircleIcon } from "lucide-react";

interface SwapProposalActionsProps {
  compatibilityScore?: number;
  onSubmit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  isSubmitDisabled?: boolean;
}

const SwapProposalActions = ({
  compatibilityScore = 75,
  onSubmit = () => console.log("Submit proposal"),
  onSave = () => console.log("Save proposal"),
  onCancel = () => console.log("Cancel proposal"),
  isSubmitDisabled = false,
}: SwapProposalActionsProps) => {
  // Determine if the proposal can be submitted based on compatibility score
  const canSubmit = !isSubmitDisabled && compatibilityScore >= 40;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full border border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700"
          >
            <XIcon className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button
            variant="secondary"
            onClick={onSave}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <HelpCircleIcon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm max-w-xs">
                  Submit your swap proposal when you're ready. A compatibility
                  score of at least 40 is required.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6"
          >
            <SendIcon className="mr-2 h-4 w-4" />
            Submit Proposal
          </Button>
        </div>
      </div>

      {!canSubmit && compatibilityScore < 40 && (
        <div className="mt-2 text-sm text-red-500">
          Compatibility score is too low. Try adding more items or adjusting
          your proposal.
        </div>
      )}
    </div>
  );
};

export default SwapProposalActions;
