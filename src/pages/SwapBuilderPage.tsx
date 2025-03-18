import React, { useState } from "react";
import Header from "../components/layout/Header";
import SwapWorkspace from "../components/swap/SwapWorkspace";
import SwapProposalActions from "../components/swap/SwapProposalActions";
import ProposalFeedback from "../components/swap/ProposalFeedback";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
  ownerId: string;
}

const SwapBuilderPage = () => {
  const [compatibilityScore, setCompatibilityScore] = useState(65);
  const [offerItems, setOfferItems] = useState<Item[]>([]);
  const [requestItems, setRequestItems] = useState<Item[]>([]);
  const [feedbackStatus, setFeedbackStatus] = useState<
    "accepted" | "rejected" | "pending" | "warning" | null
  >(null);

  // Mock user and community items
  const userItems = [
    {
      id: "1",
      title: "Vintage Camera",
      description:
        "A well-maintained vintage film camera from the 1970s. Perfect for photography enthusiasts.",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      category: "Electronics",
      condition: "Good",
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
      condition: "Like New",
      owner: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        rating: 4.7,
      },
    },
  ];

  const communityItems = [
    {
      id: "4",
      title: "Designer Handbag",
      description:
        "Authentic designer handbag in excellent condition. Barely used.",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
      category: "Fashion",
      condition: "New",
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
      condition: "Fair",
      owner: {
        name: "Morgan Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
        rating: 4.3,
      },
    },
  ];

  // Handle swap proposal submission
  const handleSubmitProposal = () => {
    // In a real app, this would send the proposal to the backend
    console.log("Submitting proposal with:", { offerItems, requestItems });
    setFeedbackStatus("pending");

    // Simulate a response after 3 seconds
    setTimeout(() => {
      // Randomly accept or reject for demo purposes
      const isAccepted = Math.random() > 0.5;
      setFeedbackStatus(isAccepted ? "accepted" : "rejected");
    }, 3000);
  };

  // Handle saving draft proposal
  const handleSaveProposal = () => {
    console.log("Saving proposal draft:", { offerItems, requestItems });
    // In a real app, this would save the draft to the backend or local storage
  };

  // Handle canceling proposal
  const handleCancelProposal = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel this proposal? All items will be cleared.",
      )
    ) {
      setOfferItems([]);
      setRequestItems([]);
      setCompatibilityScore(0);
      setFeedbackStatus(null);
    }
  };

  // Handle dismissing feedback
  const handleDismissFeedback = () => {
    setFeedbackStatus(null);
  };

  // Handle action based on feedback status
  const handleFeedbackAction = () => {
    if (feedbackStatus === "accepted") {
      // Navigate to chat or finalize swap
      console.log("Proceeding to finalize swap");
    } else if (feedbackStatus === "rejected") {
      // Clear request items to modify proposal
      setRequestItems([]);
      setFeedbackStatus(null);
    }
  };

  // Update compatibility score when items change
  const handleCompatibilityScoreChange = (score: number) => {
    setCompatibilityScore(score);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto pt-24 pb-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Swap Builder</h1>

        {feedbackStatus && (
          <div className="mb-6">
            <ProposalFeedback
              status={feedbackStatus}
              actionText={
                feedbackStatus === "accepted"
                  ? "Proceed to Chat"
                  : feedbackStatus === "rejected"
                    ? "Modify Proposal"
                    : ""
              }
              onAction={handleFeedbackAction}
              onDismiss={handleDismissFeedback}
            />
          </div>
        )}

        <div className="space-y-6">
          <SwapWorkspace
            userItems={userItems}
            communityItems={communityItems}
            onSwapProposalSubmit={(offer, request) => {
              setOfferItems(offer);
              setRequestItems(request);
              handleCompatibilityScoreChange(65); // This would be calculated based on the items
            }}
          />

          <SwapProposalActions
            compatibilityScore={compatibilityScore}
            onSubmit={handleSubmitProposal}
            onSave={handleSaveProposal}
            onCancel={handleCancelProposal}
            isSubmitDisabled={
              offerItems.length === 0 || requestItems.length === 0
            }
          />
        </div>
      </main>
    </div>
  );
};

export default SwapBuilderPage;
