import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SwapZonesContainer from "./SwapZonesContainer";
import CompatibilityScore from "./CompatibilityScore";
import ItemBrowser from "./ItemBrowser";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, HelpCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  ownerId: string;
}

interface SwapWorkspaceProps {
  userItems?: any[];
  communityItems?: any[];
  onSwapProposalSubmit?: (offerItems: Item[], requestItems: Item[]) => void;
  className?: string;
}

const SwapWorkspace = ({
  userItems = [],
  communityItems = [],
  onSwapProposalSubmit = () => {},
  className = "",
}: SwapWorkspaceProps) => {
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [requestItems, setRequestItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState("my-items");
  const [compatibilityScore, setCompatibilityScore] = useState(65);
  const [feedbackItems, setFeedbackItems] = useState([
    { text: "Items are of similar value", type: "positive" as const },
    { text: "Categories match user preferences", type: "positive" as const },
    { text: "Location distance is significant", type: "negative" as const },
  ]);

  // Handle adding items to offer zone
  const handleOfferItemDrop = (item: any) => {
    // Convert from ItemBrowser format to DropZone format if needed
    const dropZoneItem: Item = {
      id: item.id,
      name: item.title || item.name,
      description: item.description,
      imageUrl: item.image || item.imageUrl,
      value: item.value || Math.floor(Math.random() * 100) + 20, // Placeholder value if not provided
      ownerId: item.owner?.name || "current-user",
    };

    // Check if item already exists in offer items
    if (!offerItems.some((i) => i.id === dropZoneItem.id)) {
      setOfferItems([...offerItems, dropZoneItem]);
      updateCompatibilityScore([...offerItems, dropZoneItem], requestItems);
    }
  };

  // Handle adding items to request zone
  const handleRequestItemDrop = (item: any) => {
    // Convert from ItemBrowser format to DropZone format if needed
    const dropZoneItem: Item = {
      id: item.id,
      name: item.title || item.name,
      description: item.description,
      imageUrl: item.image || item.imageUrl,
      value: item.value || Math.floor(Math.random() * 100) + 20, // Placeholder value if not provided
      ownerId: item.owner?.name || "other-user",
    };

    // Check if item already exists in request items
    if (!requestItems.some((i) => i.id === dropZoneItem.id)) {
      setRequestItems([...requestItems, dropZoneItem]);
      updateCompatibilityScore(offerItems, [...requestItems, dropZoneItem]);
    }
  };

  // Handle removing items from offer zone
  const handleOfferItemRemove = (itemId: string) => {
    const updatedItems = offerItems.filter((item) => item.id !== itemId);
    setOfferItems(updatedItems);
    updateCompatibilityScore(updatedItems, requestItems);
  };

  // Handle removing items from request zone
  const handleRequestItemRemove = (itemId: string) => {
    const updatedItems = requestItems.filter((item) => item.id !== itemId);
    setRequestItems(updatedItems);
    updateCompatibilityScore(offerItems, updatedItems);
  };

  // Update compatibility score based on items in both zones
  const updateCompatibilityScore = (
    offerItems: Item[],
    requestItems: Item[],
  ) => {
    // Simple scoring algorithm based on number of items and total value
    if (offerItems.length === 0 || requestItems.length === 0) {
      setCompatibilityScore(0);
      setFeedbackItems([
        {
          text: "Add items to both zones to see compatibility",
          type: "neutral" as const,
        },
      ]);
      return;
    }

    const offerValue = offerItems.reduce((sum, item) => sum + item.value, 0);
    const requestValue = requestItems.reduce(
      (sum, item) => sum + item.value,
      0,
    );
    const valueDifference = Math.abs(offerValue - requestValue);
    const valueRatio =
      Math.min(offerValue, requestValue) / Math.max(offerValue, requestValue);

    // Calculate base score (0-100)
    let score = Math.min(100, Math.max(0, 100 - valueDifference / 10));

    // Adjust score based on number of items
    if (offerItems.length >= 2 && requestItems.length >= 2) {
      score += 5; // Bonus for multiple items
    }

    // Cap the score
    score = Math.min(100, Math.round(score));
    setCompatibilityScore(score);

    // Generate feedback items
    const newFeedbackItems = [];

    if (valueRatio > 0.8) {
      newFeedbackItems.push({
        text: "Items are of similar value",
        type: "positive" as const,
      });
    } else if (valueRatio > 0.5) {
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

    if (offerItems.length > 1) {
      newFeedbackItems.push({
        text: "Multiple items offered increases appeal",
        type: "positive" as const,
      });
    }

    if (requestItems.length > 1) {
      newFeedbackItems.push({
        text: "Requesting multiple items may reduce acceptance chance",
        type: "neutral" as const,
      });
    }

    setFeedbackItems(newFeedbackItems);
  };

  // Handle adding items to swap zones from the browser
  const handleAddToSwap = (item: any, zone: "offer" | "request") => {
    if (zone === "offer") {
      handleOfferItemDrop(item);
    } else {
      handleRequestItemDrop(item);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`w-full max-w-7xl mx-auto bg-gray-50 p-4 md:p-6 rounded-xl ${className}`}
      >
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-800">Swap Builder</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-400 hover:text-gray-600">
                    <HelpCircle size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Drag items from the browser below into the offer and request
                    zones to create your swap proposal.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-gray-600">
            Create your swap proposal by dragging items between zones
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Getting Started</AlertTitle>
          <AlertDescription className="text-blue-700">
            Drag your items to the "Your Offer" zone and items you want to the
            "Your Request" zone. The compatibility score will update
            automatically.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SwapZonesContainer
              offerItems={offerItems}
              requestItems={requestItems}
              onOfferItemDrop={handleOfferItemDrop}
              onRequestItemDrop={handleRequestItemDrop}
              onOfferItemRemove={handleOfferItemRemove}
              onRequestItemRemove={handleRequestItemRemove}
            />
          </div>
          <div>
            <CompatibilityScore
              score={compatibilityScore}
              maxScore={100}
              feedbackItems={feedbackItems}
            />
          </div>
        </div>

        <Separator className="my-8" />

        <Card className="bg-white shadow-sm">
          <CardContent className="p-0">
            <ItemBrowser
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onAddToSwap={handleAddToSwap}
            />
          </CardContent>
        </Card>
      </div>
    </DndProvider>
  );
};

export default SwapWorkspace;
