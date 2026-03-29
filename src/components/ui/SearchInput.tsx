import { Search } from "lucide-react";

export const SearchInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className = "", ...rest }) => {
  return (
    <div className="relative w-full">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />

      <input
        className="
          w-full
          pl-9 pr-4 py-2
          rounded-xl
          bg-surface
          border border-default
          text-primary
          placeholder:text-muted
          shadow-soft
          focus-ring
          transition
          duration-200
        "
        placeholder="Search..."
        {...rest}
      />
    </div>
  );
};
