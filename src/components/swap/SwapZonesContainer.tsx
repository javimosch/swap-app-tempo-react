import React from "react";
import DropZone from "./DropZone";
import { Item } from "../../types/item";

interface SwapZonesContainerProps {
  offerItems?: Item[];
  requestItems?: Item[];
  onOfferItemDrop?: (item: Item) => void;
  onRequestItemDrop?: (item: Item) => void;
  onOfferItemRemove?: (itemId: string) => void;
  onRequestItemRemove?: (itemId: string) => void;
  className?: string;
}

const SwapZonesContainer = ({
  offerItems = [],
  requestItems = [],
  onOfferItemDrop = () => {},
  onRequestItemDrop = () => {},
  onOfferItemRemove = () => {},
  onRequestItemRemove = () => {},
  className = "",
}: SwapZonesContainerProps) => {
  return (
    <div className={`w-full bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-teal-800 mb-4 text-center">
            Your Offer
          </h2>
          <DropZone
            title="Items You're Offering"
            type="offer"
            items={offerItems}
            onItemDrop={onOfferItemDrop}
            onItemRemove={onOfferItemRemove}
          />
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500"
            >
              <path d="M17 1l4 4-4 4"></path>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <path d="m7 23-4-4 4-4"></path>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </div>
        </div>

        <div className="flex-1 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-amber-800 mb-4 text-center">
            Your Request
          </h2>
          <DropZone
            title="Items You Want"
            type="request"
            items={requestItems}
            onItemDrop={onRequestItemDrop}
            onItemRemove={onRequestItemRemove}
          />
        </div>
      </div>
    </div>
  );
};

export default SwapZonesContainer;
