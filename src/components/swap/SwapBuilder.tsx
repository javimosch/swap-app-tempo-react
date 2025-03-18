import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, RefreshCw, Send } from "lucide-react";
import DropZone from "./DropZone";
import CompatibilityScore from "./CompatibilityScore";
import ItemSelector from "./ItemSelector";

export interface SwapItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  ownerId: string;
}

interface SwapBuilderProps {
  onSubmitProposal?: (offerItems: SwapItem[], requestItems: SwapItem[]) => void;
  initialOfferItems?: SwapItem[];
  initialRequestItems?: SwapItem[];
}

const SwapBuilder = ({
  onSubmitProposal = () => {},
  initialOfferItems = [],
  initialRequestItems = [],
}: SwapBuilderProps) => {
  const [offerItems, setOfferItems] = useState<SwapItem[]>(initialOfferItems);
  const [requestItems, setRequestItems] =
    useState<SwapItem[]>(initialRequestItems);
  const [compatibilityScore, setCompatibilityScore] = useState(75);
  const [feedbackItems, setFeedbackItems] = useState([
    { text: "Items are of similar value", type: "positive" as const },
    { text: "Categories match user preferences", type: "positive" as const },
    { text: "Location distance is significant", type: "negative" as const },
  ]);

  // Calculate compatibility score whenever items change
  const calculateCompatibilityScore = useCallback(() => {
    // This would be a more complex algorithm in a real application
    // For now, we'll use a simple calculation based on the number of items
    const offerValue = offerItems.reduce((sum, item) => sum + item.value, 0);
    const requestValue = requestItems.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    // Base score starts at 50
    let score = 50;

    // Add up to 30 points based on value balance
    const valueDifference = Math.abs(offerValue - requestValue);
    const maxValue = Math.max(offerValue, requestValue);
    const valueBalance = maxValue > 0 ? 1 - valueDifference / maxValue : 1;
    score += valueBalance * 30;

    // Add up to 20 points based on number of items (more items = more interesting swap)
    const totalItems = offerItems.length + requestItems.length;
    score += Math.min(totalItems * 5, 20);

    // Cap score at 100
    score = Math.min(Math.round(score), 100);

    // Update feedback items based on the score components
    const newFeedbackItems = [];

    if (valueBalance > 0.8) {
      newFeedbackItems.push({
        text: "Items are of similar value",
        type: "positive" as const,
      });
    } else if (valueBalance > 0.5) {
      newFeedbackItems.push({
        text: "Item values are somewhat balanced",
        type: "neutral" as const,
      });
    } else {
      newFeedbackItems.push({
        text: "Significant value imbalance",
        type: "negative" as const,
      });
    }

    if (totalItems >= 4) {
      newFeedbackItems.push({
        text: "Good variety of items",
        type: "positive" as const,
      });
    } else if (totalItems > 0) {
      newFeedbackItems.push({
        text: "Consider adding more items",
        type: "neutral" as const,
      });
    } else {
      newFeedbackItems.push({
        text: "No items added yet",
        type: "negative" as const,
      });
    }

    if (offerItems.length > 0 && requestItems.length > 0) {
      newFeedbackItems.push({
        text: "Both sides of the swap have items",
        type: "positive" as const,
      });
    } else {
      newFeedbackItems.push({
        text: "Complete both sides of the swap",
        type: "negative" as const,
      });
    }

    setCompatibilityScore(score);
    setFeedbackItems(newFeedbackItems);
  }, [offerItems, requestItems]);

  // Update compatibility score when items change
  React.useEffect(() => {
    calculateCompatibilityScore();
  }, [offerItems, requestItems, calculateCompatibilityScore]);

  // Handle item drop in offer zone
  const handleOfferItemDrop = (item: SwapItem) => {
    if (!offerItems.some((i) => i.id === item.id)) {
      setOfferItems([...offerItems, item]);
    }
  };

  // Handle item drop in request zone
  const handleRequestItemDrop = (item: SwapItem) => {
    if (!requestItems.some((i) => i.id === item.id)) {
      setRequestItems([...requestItems, item]);
    }
  };

  // Handle item removal from offer zone
  const handleOfferItemRemove = (itemId: string) => {
    setOfferItems(offerItems.filter((item) => item.id !== itemId));
  };

  // Handle item removal from request zone
  const handleRequestItemRemove = (itemId: string) => {
    setRequestItems(requestItems.filter((item) => item.id !== itemId));
  };

  // Reset the swap builder
  const handleReset = () => {
    setOfferItems([]);
    setRequestItems([]);
  };

  // Submit the swap proposal
  const handleSubmit = () => {
    onSubmitProposal(offerItems, requestItems);
  };

  // Convert ItemSelector items to SwapItems
  const handleItemDragStart = (item: any, type: string) => {
    // This function is just a placeholder for the drag start event
    // The actual item data transfer is handled by the DnD library
    console.log(`Started dragging ${type} item: ${item.title || item.name}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Swap Builder</h2>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="mb-6">
        <ItemSelector onDragStart={handleItemDragStart} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <DropZone
          title="What You're Offering"
          type="offer"
          items={offerItems}
          onItemDrop={handleOfferItemDrop}
          onItemRemove={handleOfferItemRemove}
        />

        <DropZone
          title="What You Want"
          type="request"
          items={requestItems}
          onItemDrop={handleRequestItemDrop}
          onItemRemove={handleRequestItemRemove}
        />
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2">
          <CompatibilityScore
            score={compatibilityScore}
            maxScore={100}
            feedbackItems={feedbackItems}
          />
        </div>

        <Card className="w-full md:w-1/2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Swap Summary</h3>

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">You're offering:</p>
                <p className="font-medium">{offerItems.length} item(s)</p>
                <p className="text-sm text-gray-600">
                  Total value: $
                  {offerItems.reduce((sum, item) => sum + item.value, 0)}
                </p>
              </div>

              <ArrowRight className="h-6 w-6 text-gray-400 self-center" />

              <div>
                <p className="text-sm text-gray-500">You're requesting:</p>
                <p className="font-medium">{requestItems.length} item(s)</p>
                <p className="text-sm text-gray-600">
                  Total value: $
                  {requestItems.reduce((sum, item) => sum + item.value, 0)}
                </p>
              </div>
            </div>

            <Button
              className="w-full"
              disabled={
                offerItems.length === 0 ||
                requestItems.length === 0 ||
                compatibilityScore < 40
              }
              onClick={handleSubmit}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Swap Proposal
            </Button>

            {compatibilityScore < 40 && (
              <p className="text-xs text-red-500 mt-2 text-center">
                Improve your compatibility score to submit this proposal
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwapBuilder;
