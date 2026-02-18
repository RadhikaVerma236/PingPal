import React, { useRef, useEffect, useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import EmojiPicker, {Theme} from  "emoji-picker-react";

interface ChatTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const ChatTextarea: React.FC<ChatTextareaProps> = ({
  value,
  onChange,
  onSend,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 150) + "px";
  }, [value]);

  // Enter to Send / Shift+Enter New Line
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add emoji to message
 const handleEmojiClick = (emojiData: { emoji: string }) => {
  const textarea = textareaRef.current;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  const newValue =
    value.substring(0, start) +
    emojiData.emoji +
    value.substring(end);

  const event = {
    target: { value: newValue },
  } as React.ChangeEvent<HTMLTextAreaElement>;

  onChange(event);

  // restore cursor
  setTimeout(() => {
    textarea.focus();
    textarea.selectionStart =
      textarea.selectionEnd = start + emojiData.emoji.length;
  }, 0);

  setShowPicker(false);
};

  return (
    <div className="relative">
      <div className="flex items-end gap-2 bg-surface border border-default rounded-2xl px-3 py-2 shadow-soft">

        {/* Attachment */}
        <button
          type="button"
          className="text-muted hover:text-primary transition"
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="
            flex-1
            bg-transparent
            text-primary
            placeholder:text-muted
            resize-none
            outline-none
            max-h-[150px]
            overflow-y-auto
          "
        />

        {/* Emoji Toggle */}
        <button
          type="button"
          onClick={() => setShowPicker((prev) => !prev)}
          className="text-muted hover:text-primary transition"
        >
          <Smile size={18} />
        </button>

        {/* Send */}
        <button
          type="button"
          onClick={onSend}
          disabled={!value.trim()}
          className="
            bg-primary
            text-white
            rounded-full
            p-2
            shadow-soft
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          <Send size={16} />
        </button>
      </div>

      {/* Emoji Picker Popup */}
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute bottom-16 right-0 z-50"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={Theme.AUTO}
          />
        </div>
      )}
    </div>
  );
};

export default ChatTextarea;
