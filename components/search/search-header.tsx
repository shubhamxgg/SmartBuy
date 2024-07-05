import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SearchHeaderProps {
  resultCount: number;
  onBack: () => void;
}

const SearchHeader = ({ resultCount, onBack }: SearchHeaderProps) => (
  <div className="relative flex items-center justify-start p-4 md:p-6 font-bold mt-3 mb-2 lg:mt-5 lg:mb-2 text-lg md:text-xl">
    <span className="pl-12">{resultCount} results found</span>
    <Button
      variant="outline"
      size="icon"
      onClick={onBack}
      className="absolute left-4"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  </div>
);

export default SearchHeader;
