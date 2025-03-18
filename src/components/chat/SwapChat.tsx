import React, { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface SwapChatProps {
  swapId?: string;
  otherUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  currentUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  initialMessages?: Message[];
  onSendMessage?: (message: string) => void;
  onAttachFile?: (file: File) => void;
  onFinalizeSwap?: () => void;
  onCancelSwap?: () => void;
}

const SwapChat = ({
  swapId = "swap-123",
  otherUser = {
    id: "user-2",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  currentUser = {
    id: "user-1",
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  initialMessages = [
    {
      id: "msg-1",
      sender: {
        id: "user-2",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
      content:
        "Hi! I'm interested in swapping my vintage camera for your guitar. Is it still available?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
    },
    {
      id: "msg-2",
      sender: {
        id: "user-1",
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
      content:
        "Yes, it's still available! The guitar is in great condition. When would you like to meet for the swap?",
      timestamp: new Date(Date.now() - 1800000),
      isOwn: true,
    },
    {
      id: "msg-3",
      sender: {
        id: "user-2",
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      },
      content:
        "Great! How about this weekend? I can meet you at the community center.",
      timestamp: new Date(Date.now() - 900000),
      isOwn: false,
    },
  ],
  onSendMessage = () => {},
  onAttachFile = () => {},
  onFinalizeSwap = () => {},
  onCancelSwap = () => {},
}: SwapChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    onSendMessage(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto rounded-lg border border-border shadow-md bg-background">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>
              {otherUser.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{otherUser.name}</h3>
            <p className="text-xs text-muted-foreground">Swap ID: {swapId}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onCancelSwap}>
            Cancel Swap
          </Button>
          <Button size="sm" onClick={onFinalizeSwap}>
            Finalize Swap
          </Button>
        </div>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className="h-8 w-8 mt-1 mx-2">
                  <AvatarImage
                    src={message.sender.avatar}
                    alt={message.sender.name}
                  />
                  <AvatarFallback>
                    {message.sender.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) onAttachFile(file);
              };
              input.click();
            }}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            className="shrink-0"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-5 w-5 mr-2" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SwapChat;
