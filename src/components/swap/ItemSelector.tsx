import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  owner: string;
  category: string;
}

interface ItemSelectorProps {
  userItems?: Item[];
  communityItems?: Item[];
  onDragStart?: (item: Item, type: "user" | "community") => void;
}

const ItemSelector = ({
  userItems = [
    {
      id: "1",
      title: "Vintage Camera",
      description: "A well-maintained film camera from the 1980s",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&q=80",
      owner: "You",
      category: "Electronics",
    },
    {
      id: "2",
      title: "Leather Jacket",
      description: "Classic black leather jacket, size M",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80",
      owner: "You",
      category: "Clothing",
    },
    {
      id: "3",
      title: "Acoustic Guitar",
      description: "Beginner acoustic guitar in good condition",
      image:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=300&q=80",
      owner: "You",
      category: "Musical Instruments",
    },
  ],
  communityItems = [
    {
      id: "4",
      title: "Mountain Bike",
      description: "Trek mountain bike, barely used",
      image:
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=300&q=80",
      owner: "Alex",
      category: "Sports",
    },
    {
      id: "5",
      title: "Drone",
      description: "DJI Mini 2 with extra batteries",
      image:
        "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=300&q=80",
      owner: "Maria",
      category: "Electronics",
    },
    {
      id: "6",
      title: "Cookbook Collection",
      description: "Set of 5 international cuisine cookbooks",
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80",
      owner: "Sam",
      category: "Books",
    },
    {
      id: "7",
      title: "Yoga Mat",
      description: "Premium yoga mat with carrying strap",
      image:
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=300&q=80",
      owner: "Taylor",
      category: "Fitness",
    },
  ],
  onDragStart = () => {},
}: ItemSelectorProps) => {
  const [activeTab, setActiveTab] = useState("my-items");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredUserItems = categoryFilter
    ? userItems.filter((item) => item.category === categoryFilter)
    : userItems;

  const filteredCommunityItems = categoryFilter
    ? communityItems.filter((item) => item.category === categoryFilter)
    : communityItems;

  const categories = [
    ...new Set([...userItems, ...communityItems].map((item) => item.category)),
  ];

  const handleDragStart = (
    e: React.DragEvent,
    item: Item,
    type: "user" | "community",
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.setData("itemType", type);
    e.dataTransfer.effectAllowed = "move";
    onDragStart(item, type);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <Tabs defaultValue="my-items" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="community-items">Community Items</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCategoryFilter(null)}
              className={!categoryFilter ? "bg-slate-100" : ""}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setCategoryFilter(category)}
                className={categoryFilter === category ? "bg-slate-100" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <TabsContent value="my-items" className="mt-0">
          <ScrollArea className="h-36">
            <div className="flex gap-4 p-1">
              {filteredUserItems.map((item) => (
                <DraggableItemCard
                  key={item.id}
                  item={item}
                  onDragStart={(e) => handleDragStart(e, item, "user")}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="community-items" className="mt-0">
          <ScrollArea className="h-36">
            <div className="flex gap-4 p-1">
              {filteredCommunityItems.map((item) => (
                <DraggableItemCard
                  key={item.id}
                  item={item}
                  onDragStart={(e) => handleDragStart(e, item, "community")}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DraggableItemCardProps {
  item: Item;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DraggableItemCard = ({ item, onDragStart }: DraggableItemCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="cursor-grab"
      draggable
      onDragStart={onDragStart}
    >
      <Card className="w-48 h-32 relative overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative p-3 flex flex-col h-full justify-between">
          <div>
            <h3 className="text-white font-medium text-sm truncate">
              {item.title}
            </h3>
            <p className="text-white/80 text-xs line-clamp-2">
              {item.description}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
            <span className="text-white/90 text-xs">{item.owner}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ItemSelector;
