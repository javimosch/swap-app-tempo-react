import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Navbar from "./layout/Navbar";
import ItemGrid from "./items/ItemGrid";
import SwapBuilder from "./swap/SwapBuilder";
import ItemManagement from "./items/ItemManagement";
import SwapChat from "./chat/SwapChat";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define SwapItem interface locally instead of importing it
interface SwapItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  ownerId: string;
}

const Home = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showSwapBuilder, setShowSwapBuilder] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Mock data for swap builder
  const myItems: SwapItem[] = [
    {
      id: "my-1",
      name: "Vintage Camera",
      description: "A well-maintained vintage film camera from the 1970s.",
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      value: 150,
      ownerId: "user-1",
    },
    {
      id: "my-2",
      name: "Acoustic Guitar",
      description:
        "Beautiful acoustic guitar with warm tone. Includes case and extra strings.",
      imageUrl:
        "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&q=80",
      value: 200,
      ownerId: "user-1",
    },
    {
      id: "my-3",
      name: "Leather Jacket",
      description: "Genuine leather jacket, size M. Worn only a few times.",
      imageUrl:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
      value: 120,
      ownerId: "user-1",
    },
  ];

  // Handle view details for an item
  const handleViewDetails = (id: string) => {
    setSelectedItemId(id);
    console.log(`Viewing details for item ${id}`);
  };

  // Handle initiating a swap
  const handleInitiateSwap = (id: string) => {
    setSelectedItemId(id);
    setShowSwapBuilder(true);
    setActiveTab("swap");
    console.log(`Initiating swap for item ${id}`);
  };

  // Handle submitting a swap proposal
  const handleSubmitProposal = (
    offerItems: SwapItem[],
    requestItems: SwapItem[],
  ) => {
    console.log("Swap proposal submitted:", { offerItems, requestItems });
    setShowChat(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          username="JohnDoe"
          avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          notificationCount={3}
        />

        <div className="pt-[70px] pb-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="browse">Browse Items</TabsTrigger>
              <TabsTrigger value="swap">Swap Builder</TabsTrigger>
              <TabsTrigger value="my-items">My Items</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Find Items to Swap
                </h1>
                <p className="text-gray-600 mb-4">
                  Browse through available items from the community and find
                  something you'd like to swap for.
                </p>
              </div>

              <ItemGrid
                onViewDetails={handleViewDetails}
                onInitiateSwap={handleInitiateSwap}
              />
            </TabsContent>

            <TabsContent value="swap" className="mt-0">
              {showSwapBuilder ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      Build Your Swap
                    </h1>
                    <p className="text-gray-600 mb-4">
                      Drag and drop items to create a balanced swap proposal.
                      The compatibility score helps ensure a fair exchange.
                    </p>
                    {!showChat && (
                      <Button
                        variant="outline"
                        onClick={() => setShowSwapBuilder(false)}
                        className="mr-2"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>

                  {showChat ? (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Discuss Swap Details
                      </h2>
                      <div className="h-[500px]">
                        <SwapChat />
                      </div>
                    </div>
                  ) : (
                    <SwapBuilder
                      initialOfferItems={[]}
                      initialRequestItems={[]}
                      onSubmitProposal={handleSubmitProposal}
                    />
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Swap Builder
                  </h1>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Create a new swap proposal by selecting items you want to
                    offer and items you'd like to receive in return.
                  </p>
                  <Button
                    onClick={() => setShowSwapBuilder(true)}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Start Building a Swap
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="my-items" className="mt-0">
              <ItemManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;