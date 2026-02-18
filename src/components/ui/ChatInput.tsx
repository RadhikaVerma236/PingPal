import { Send } from "lucide-react";
import Button from "./Button";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
}) => {
  return (
    <div className="flex items-center gap-3 bg-surface border border-default rounded-2xl px-3 py-2 shadow-soft">
      
      <input
        value={value}
        onChange={onChange}
        placeholder="Type a message..."
        className="
          flex-1
          bg-transparent
          outline-none
          text-primary
          placeholder:text-muted
        "
      />

      <Button
        onClick={onSend}
        className="rounded-full p-2"
      >
        <Send size={16} />
      </Button>

    </div>
  );
};
