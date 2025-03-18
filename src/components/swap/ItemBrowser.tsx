import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import ItemGrid from "../items/ItemGrid";
import { useDrag } from "react-dnd";
import { Button } from "../ui/button";
import { Search, Filter, RefreshCw } from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface ItemBrowserProps {
  myItems?: Item[];
  communityItems?: Item[];
  onAddToSwap?: (item: Item, zone: "offer" | "request") => void;
  onRefresh?: () => void;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const DraggableItemCard = ({
  item,
  onAddToSwap,
}: {
  item: Item;
  onAddToSwap?: (item: Item, zone: "offer" | "request") => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "grab" }}
      className="transition-opacity duration-200"
    >
      <ItemGrid
        items={[item]}
        onInitiateSwap={() => onAddToSwap && onAddToSwap(item, "request")}
      />
    </div>
  );
};

const ItemBrowser = ({
  myItems = [
    {
      id: "1",
      title: "Vintage Camera",
      description:
        "A well-maintained vintage film camera from the 1970s. Perfect for photography enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      category: "Electronics",
      condition: "Good" as const,
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
    {
      id: "2",
      title: "Mountain Bike",
      description:
        "High-quality mountain bike with front suspension. Great for trails and off-road adventures.",
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
      category: "Sports",
      condition: "Like New" as const,
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
    {
      id: "3",
      title: "Acoustic Guitar",
      description:
        "Beautiful acoustic guitar with warm tone. Includes case and extra strings.",
      image:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&q=80",
      category: "Music",
      condition: "Good" as const,
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
  ],
  communityItems = [
    {
      id: "4",
      title: "Designer Handbag",
      description:
        "Authentic designer handbag in excellent condition. Barely used.",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      category: "Fashion",
      condition: "New" as const,
      owner: {
        name: "Taylor Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
        rating: 4.8,
      },
    },
    {
      id: "5",
      title: "Antique Desk Lamp",
      description:
        "Vintage brass desk lamp from the 1920s. Fully functional and restored.",
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80",
      category: "Home",
      condition: "Fair" as const,
      owner: {
        name: "Morgan Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
        rating: 4.3,
      },
    },
    {
      id: "6",
      title: "Drone with Camera",
      description:
        "High-definition drone with 4K camera. Includes extra batteries and controller.",
      image:
        "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&q=80",
      category: "Electronics",
      condition: "Like New" as const,
      owner: {
        name: "Riley Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
        rating: 4.6,
      },
    },
  ],
  onAddToSwap = (item, zone) =>
    console.log(`Add ${item.title} to ${zone} zone`),
  onRefresh = () => console.log("Refreshing items"),
  activeTab = "my-items",
  onTabChange = (value) => console.log(`Tab changed to ${value}`),
}: ItemBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredMyItems = myItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredCommunityItems = communityItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Browse Items</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items..."
                className="pl-8 pr-4 py-1 text-sm border rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              className="h-8"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue={activeTab}
          onValueChange={onTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="my-items">My Items</TabsTrigger>
            <TabsTrigger value="community-items">Community Items</TabsTrigger>
          </TabsList>

          <TabsContent value="my-items" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {filteredMyItems.length}{" "}
                    {filteredMyItems.length === 1 ? "item" : "items"} found
                  </span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  Drag items to add them to your swap
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredMyItems.map((item) => (
                  <DraggableItemCard
                    key={item.id}
                    item={item}
                    onAddToSwap={onAddToSwap}
                  />
                ))}

                {filteredMyItems.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                      No items found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community-items" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {filteredCommunityItems.length}{" "}
                    {filteredCommunityItems.length === 1 ? "item" : "items"}{" "}
                    found
                  </span>
                </div>
                <p className="text-sm text-gray-500 italic">
                  Drag items to add them to your swap
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredCommunityItems.map((item) => (
                  <DraggableItemCard
                    key={item.id}
                    item={item}
                    onAddToSwap={onAddToSwap}
                  />
                ))}

                {filteredCommunityItems.length === 0 && (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                      No items found matching your search.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ItemBrowser;
