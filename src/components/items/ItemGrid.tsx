import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Search, Filter, Grid3X3, List } from "lucide-react";

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

interface ItemGridProps {
  items?: Item[];
  onViewDetails?: (id: string) => void;
  onInitiateSwap?: (id: string) => void;
}

const ItemGrid = ({
  items = [
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
        name: "Sam Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        rating: 4.9,
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
        name: "Jamie Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
        rating: 4.5,
      },
    },
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
  onViewDetails = (id) => console.log(`View details for item ${id}`),
  onInitiateSwap = (id) => console.log(`Initiate swap for item ${id}`),
}: ItemGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("all-categories");
  const [condition, setCondition] = useState<string>("any-condition");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter items based on search term, category, and condition
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "all-categories" || item.category === category;
    const matchesCondition =
      condition === "any-condition" || item.condition === condition;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(items.map((item) => item.category)));

  // Conditions for filter dropdown
  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 bg-gray-50">
      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-condition">Any Condition</SelectItem>
                {conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "item" : "items"} found
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
            >
              <TabsList className="h-8">
                <TabsTrigger value="grid" className="px-2">
                  <Grid3X3 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-2">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Items Grid/List */}
      <Tabs value={viewMode} className="w-full">
        <TabsContent value="grid" className="mt-0">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  category={item.category}
                  condition={item.condition}
                  owner={item.owner}
                  onViewDetails={onViewDetails}
                  onInitiateSwap={onInitiateSwap}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No items found
              </h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any items matching your search criteria. Try
                adjusting your filters or search term.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          {filteredItems.length > 0 ? (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow"
                >
                  <div className="sm:w-48 h-40 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800">
                            {item.category}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${getConditionColor(item.condition)}`}
                          >
                            {item.condition}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={item.owner.avatar}
                            alt={item.owner.name}
                          />
                          <AvatarFallback>
                            {item.owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">
                          {item.owner.name}
                        </span>
                        <span className="text-xs font-medium text-amber-600 ml-1">
                          {item.owner.rating.toFixed(1)}
                        </span>
                        <span className="text-amber-500">★</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 flex-grow mb-4">
                      {item.description}
                    </p>
                    <div className="flex gap-2 justify-end mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(item.id)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={() => onInitiateSwap(item.id)}
                      >
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        Swap
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No items found
              </h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any items matching your search criteria. Try
                adjusting your filters or search term.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function for condition color in list view
const getConditionColor = (condition: string) => {
  switch (condition) {
    case "New":
      return "bg-green-100 text-green-800";
    case "Like New":
      return "bg-emerald-100 text-emerald-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Fair":
      return "bg-amber-100 text-amber-800";
    case "Poor":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Import missing components for list view
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Eye, MessageCircle } from "lucide-react";

export default ItemGrid;
