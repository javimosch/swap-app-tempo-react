import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import ItemCard from "./ItemCard";

interface Item {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  condition: "New" | "Like New" | "Good" | "Fair" | "Poor";
  status: "active" | "swapped" | "inactive";
  owner: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface ItemManagementProps {
  userItems?: Item[];
  onAddItem?: (item: Omit<Item, "id" | "owner" | "status">) => void;
  onEditItem?: (id: string, item: Partial<Item>) => void;
  onDeleteItem?: (id: string) => void;
  onChangeStatus?: (id: string, status: Item["status"]) => void;
}

const ItemManagement = ({
  userItems = [
    {
      id: "1",
      title: "Vintage Camera",
      description:
        "A well-maintained vintage film camera from the 1970s. Perfect for photography enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      category: "Electronics",
      condition: "Good",
      status: "active",
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
        "Trek mountain bike in excellent condition. Has been used for light trail riding only.",
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80",
      category: "Sports",
      condition: "Like New",
      status: "active",
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
    {
      id: "3",
      title: "Leather Jacket",
      description:
        "Genuine leather jacket, size M. Worn only a few times, in great condition.",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      category: "Clothing",
      condition: "Good",
      status: "swapped",
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
    {
      id: "4",
      title: "Antique Desk Lamp",
      description:
        "Beautiful brass desk lamp from the 1940s. Working condition with original wiring.",
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&q=80",
      category: "Home",
      condition: "Fair",
      status: "inactive",
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
  ],
  onAddItem = () => {},
  onEditItem = () => {},
  onDeleteItem = () => {},
  onChangeStatus = () => {},
}: ItemManagementProps) => {
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    condition: "Good" as const,
  });

  const activeItems = userItems.filter((item) => item.status === "active");
  const swappedItems = userItems.filter((item) => item.status === "swapped");
  const inactiveItems = userItems.filter((item) => item.status === "inactive");

  const handleAddItem = () => {
    onAddItem(newItem);
    setNewItem({
      title: "",
      description: "",
      image: "",
      category: "",
      condition: "Good" as const,
    });
    setIsAddItemDialogOpen(false);
  };

  const handleEditItem = () => {
    if (currentItem) {
      onEditItem(currentItem.id, {
        title: currentItem.title,
        description: currentItem.description,
        category: currentItem.category,
        condition: currentItem.condition,
        image: currentItem.image,
      });
      setIsEditItemDialogOpen(false);
    }
  };

  const handleDeleteItem = () => {
    if (currentItem) {
      onDeleteItem(currentItem.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleStatusChange = (id: string, status: Item["status"]) => {
    onChangeStatus(id, status);
  };

  const getStatusIcon = (status: Item["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "swapped":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "inactive":
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: Item["status"]) => {
    switch (status) {
      case "active":
        return "Active";
      case "swapped":
        return "Swapped";
      case "inactive":
        return "Inactive";
    }
  };

  const renderItemGrid = (items: Item[]) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No items in this category</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white shadow-md"
                  onClick={() => {
                    setCurrentItem(item);
                    setIsEditItemDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setCurrentItem(item);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 z-10">
                <Badge
                  className="flex items-center gap-1 px-2 py-1"
                  variant={item.status === "active" ? "default" : "secondary"}
                >
                  {getStatusIcon(item.status)}
                  {getStatusText(item.status)}
                </Badge>
              </div>
              <ItemCard
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={item.category}
                condition={item.condition}
                owner={item.owner}
              />
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Items</h1>
        <Dialog
          open={isAddItemDialogOpen}
          onOpenChange={setIsAddItemDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" /> Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new item for swapping.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  placeholder="Enter item title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  placeholder="Describe your item"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Select
                    value={newItem.condition}
                    onValueChange={(value) =>
                      setNewItem({
                        ...newItem,
                        condition: value as
                          | "New"
                          | "Like New"
                          | "Good"
                          | "Fair"
                          | "Poor",
                      })
                    }
                  >
                    <SelectTrigger id="condition">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    value={newItem.image}
                    onChange={(e) =>
                      setNewItem({ ...newItem, image: e.target.value })
                    }
                    placeholder="Enter image URL"
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {newItem.image && (
                  <div className="relative mt-2 h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={newItem.image}
                      alt="Item preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80";
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setNewItem({ ...newItem, image: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddItemDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddItem}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Add Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="active" className="flex gap-2">
            <CheckCircle2 className="h-4 w-4" /> Active
            <Badge variant="secondary" className="ml-1">
              {activeItems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="swapped" className="flex gap-2">
            <Clock className="h-4 w-4" /> Swapped
            <Badge variant="secondary" className="ml-1">
              {swappedItems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex gap-2">
            <AlertCircle className="h-4 w-4" /> Inactive
            <Badge variant="secondary" className="ml-1">
              {inactiveItems.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">{renderItemGrid(activeItems)}</TabsContent>
        <TabsContent value="swapped">
          {renderItemGrid(swappedItems)}
        </TabsContent>
        <TabsContent value="inactive">
          {renderItemGrid(inactiveItems)}
        </TabsContent>
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog
        open={isEditItemDialogOpen}
        onOpenChange={setIsEditItemDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update your item details below.
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={currentItem.title}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={currentItem.description}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={currentItem.category}
                    onValueChange={(value) =>
                      setCurrentItem({ ...currentItem, category: value })
                    }
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-condition">Condition</Label>
                  <Select
                    value={currentItem.condition}
                    onValueChange={(value) =>
                      setCurrentItem({
                        ...currentItem,
                        condition: value as
                          | "New"
                          | "Like New"
                          | "Good"
                          | "Fair"
                          | "Poor",
                      })
                    }
                  >
                    <SelectTrigger id="edit-condition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="edit-image"
                    value={currentItem.image}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, image: e.target.value })
                    }
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {currentItem.image && (
                  <div className="relative mt-2 h-32 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={currentItem.image}
                      alt="Item preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80";
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentItem.status}
                  onValueChange={(value) =>
                    setCurrentItem({
                      ...currentItem,
                      status: value as "active" | "swapped" | "inactive",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      value="active"
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> Active
                    </SelectItem>
                    <SelectItem
                      value="swapped"
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4 text-blue-500" /> Swapped
                    </SelectItem>
                    <SelectItem
                      value="inactive"
                      className="flex items-center gap-2"
                    >
                      <AlertCircle className="h-4 w-4 text-gray-500" /> Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditItemDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditItem}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentItem && (
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-16 w-16 rounded overflow-hidden bg-gray-100">
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80";
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{currentItem.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {currentItem.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Delete Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemManagement;
