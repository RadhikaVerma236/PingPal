import { useState } from "react";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import ChatTextarea from "./components/ui/ChatTextarea";

function App() {
  const [message, setMessage] = useState("");

   const handleSend = () => {
    console.log("Sent:", message);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-surface">
      
      <h1 className="text-4xl font-bold text-primary tracking-tight">
        PingPal 🚀
      </h1>

      <div className="flex gap-4">
        <Button variant="primary">
          Primary
        </Button>

        <Button variant="secondary">
          Secondary
        </Button>

        <Button variant="ghost">
          Ghost
        </Button>

        <Button variant="danger">
          Danger
        </Button>
      </div>

      <Button loading>
        Loading State
      </Button>

      <div className="w-80 flex flex-col gap-4">
        <Input 
          label="Email"
          placeholder="Enter your email"
          fullWidth
        />

        <Input 
          label="Password"
          type="password"
          placeholder="Enter your password"
          fullWidth
        />

        <Input 
          label="With Error"
          placeholder="Something went wrong"
          error="This field is required"
          fullWidth
        />

        <Button fullWidth>
          Submit
        </Button>
      </div>

      <ChatTextarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSend={handleSend}
      />


    </div>
  );
}

export default App;
