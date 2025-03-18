import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ProposalFeedbackProps {
  status?: "accepted" | "rejected" | "pending" | "warning" | null;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

const ProposalFeedback = ({
  status = null,
  message = "",
  actionText = "",
  onAction = () => {},
  onDismiss = () => {},
}: ProposalFeedbackProps) => {
  if (!status) return null;

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getAlertConfig = () => {
    switch (status) {
      case "accepted":
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: "Proposal Accepted!",
          defaultMessage:
            "The other user has accepted your swap proposal. You can now proceed to finalize the details.",
          className: "border-green-200 bg-green-50",
        };
      case "rejected":
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          title: "Proposal Rejected",
          defaultMessage:
            "The other user has declined your swap proposal. You can modify your offer and try again.",
          className: "border-red-200 bg-red-50",
        };
      case "pending":
        return {
          icon: <Clock className="h-6 w-6 text-blue-500" />,
          title: "Proposal Pending",
          defaultMessage:
            "Your swap proposal has been sent and is awaiting a response from the other user.",
          className: "border-blue-200 bg-blue-50",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
          title: "Attention Required",
          defaultMessage:
            "There are some issues with your swap proposal that need to be addressed.",
          className: "border-amber-200 bg-amber-50",
        };
      default:
        return {
          icon: <AlertTriangle className="h-6 w-6 text-gray-500" />,
          title: "Proposal Status",
          defaultMessage: "Status information about your swap proposal.",
          className: "border-gray-200 bg-gray-50",
        };
    }
  };

  const config = getAlertConfig();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
      className="w-full bg-white p-4 rounded-lg"
    >
      <Alert className={`${config.className} flex items-start`}>
        <div className="mr-3 flex-shrink-0">{config.icon}</div>
        <div className="flex-grow">
          <AlertTitle className="text-lg font-semibold mb-1">
            {config.title}
          </AlertTitle>
          <AlertDescription className="text-sm">
            {message || config.defaultMessage}
          </AlertDescription>
          {(actionText || status === "rejected" || status === "accepted") && (
            <div className="mt-4 flex space-x-3">
              {actionText && (
                <Button
                  onClick={onAction}
                  variant={status === "accepted" ? "default" : "outline"}
                  className={
                    status === "accepted" ? "bg-teal-600 hover:bg-teal-700" : ""
                  }
                >
                  {actionText}
                </Button>
              )}
              <Button variant="ghost" onClick={onDismiss}>
                Dismiss
              </Button>
            </div>
          )}
        </div>
      </Alert>
    </motion.div>
  );
};

export default ProposalFeedback;
