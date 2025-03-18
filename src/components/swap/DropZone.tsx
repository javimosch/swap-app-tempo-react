import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  ownerId: string;
}

interface DropZoneProps {
  title: string;
  type: "offer" | "request";
  items: Item[];
  onItemDrop?: (item: Item) => void;
  onItemRemove?: (itemId: string) => void;
  className?: string;
}

const DropZone = ({
  title = "Drop Items Here",
  type = "offer",
  items = [
    {
      id: "1",
      name: "Vintage Camera",
      description: "A well-preserved film camera from the 1970s",
      imageUrl:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
      value: 120,
      ownerId: "user1",
    },
    {
      id: "2",
      name: "Leather Jacket",
      description: "Genuine leather jacket in excellent condition",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
      value: 85,
      ownerId: "user1",
    },
  ],
  onItemDrop = () => {},
  onItemRemove = () => {},
  className = "",
}: DropZoneProps) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: Item) => {
      onItemDrop(item);
      return { name: title };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  const backgroundColor = type === "offer" ? "bg-teal-50" : "bg-amber-50";
  const borderColor = type === "offer" ? "border-teal-300" : "border-amber-300";
  const activeColor = type === "offer" ? "bg-teal-100" : "bg-amber-100";

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <h3
        className={`text-lg font-medium mb-2 ${type === "offer" ? "text-teal-700" : "text-amber-700"}`}
      >
        {title}
      </h3>
      <div
        ref={drop}
        className={`
          flex-1 p-4 rounded-lg border-2 border-dashed transition-colors
          ${backgroundColor} ${borderColor}
          ${isActive ? activeColor : ""}
          ${items.length === 0 ? "flex items-center justify-center" : ""}
        `}
      >
        {items.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Drag and drop items here</p>
            <p className="text-sm mt-2">
              {type === "offer"
                ? "Items you want to offer"
                : "Items you want to receive"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden relative group">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onItemRemove(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative h-32">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {item.name}
                    </h4>
                    <Badge variant="outline" className="ml-1 shrink-0">
                      ${item.value}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
