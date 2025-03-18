import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Heart, MessageCircle, Eye } from "lucide-react";

interface ItemCardProps {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  category?: string;
  condition?: "New" | "Like New" | "Good" | "Fair" | "Poor";
  owner?: {
    name: string;
    avatar: string;
    rating: number;
  };
  onViewDetails?: (id: string) => void;
  onInitiateSwap?: (id: string) => void;
}

const ItemCard = ({
  id = "1",
  title = "Vintage Camera",
  description = "A well-maintained vintage film camera from the 1970s. Perfect for photography enthusiasts.",
  image = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
  category = "Electronics",
  condition = "Good",
  owner = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    rating: 4.7,
  },
  onViewDetails = () => {},
  onInitiateSwap = () => {},
}: ItemCardProps) => {
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

  return (
    <Card className="w-[280px] h-[350px] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-40 overflow-hidden bg-gray-100">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <Badge
          className={`absolute top-2 right-2 ${getConditionColor(condition)}`}
        >
          {condition}
        </Badge>
        <Badge className="absolute top-2 left-2 bg-gray-800/70 text-white">
          {category}
        </Badge>
      </div>

      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4 text-gray-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent className="p-3 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="p-3 pt-0 flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={owner.avatar} alt={owner.name} />
              <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{owner.name}</span>
          </div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-amber-600">
              {owner.rating.toFixed(1)}
            </span>
            <span className="text-amber-500 ml-1">★</span>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8"
            onClick={() => onViewDetails(id)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 h-8 bg-teal-600 hover:bg-teal-700"
            onClick={() => onInitiateSwap(id)}
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1" />
            Swap
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
