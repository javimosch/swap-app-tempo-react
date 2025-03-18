import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface CompatibilityScoreProps {
  score?: number;
  maxScore?: number;
  feedbackItems?: {
    text: string;
    type: "positive" | "negative" | "neutral";
  }[];
}

const CompatibilityScore = ({
  score = 75,
  maxScore = 100,
  feedbackItems = [
    { text: "Items are of similar value", type: "positive" },
    { text: "Categories match user preferences", type: "positive" },
    { text: "Location distance is significant", type: "negative" },
  ],
}: CompatibilityScoreProps) => {
  // Calculate percentage for progress bar
  const percentage = (score / maxScore) * 100;

  // Determine score category
  const getScoreCategory = () => {
    if (percentage >= 80)
      return { label: "Excellent Match", color: "bg-green-500" };
    if (percentage >= 60)
      return { label: "Good Match", color: "bg-emerald-400" };
    if (percentage >= 40)
      return { label: "Fair Match", color: "bg-yellow-400" };
    return { label: "Poor Match", color: "bg-red-500" };
  };

  const scoreCategory = getScoreCategory();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Compatibility Score
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-gray-600">
                <InfoIcon size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm max-w-xs">
                This score indicates how well-matched your swap proposal is
                based on item value, category preferences, and other factors.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-3xl font-bold text-teal-600">
            {score}/{maxScore}
          </span>
          <Badge className={`${scoreCategory.color} text-white`}>
            {scoreCategory.label}
          </Badge>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
        <ul className="space-y-1">
          {feedbackItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span
                className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${
                  item.type === "positive"
                    ? "bg-green-500"
                    : item.type === "negative"
                      ? "bg-red-500"
                      : "bg-gray-400"
                }`}
              />
              <span className="text-sm text-gray-600">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompatibilityScore;
