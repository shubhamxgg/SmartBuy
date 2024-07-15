import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SearchHeaderProps {
  resultCount: number;
  onBack: () => void;
}

const SearchHeader = ({ resultCount, onBack }: SearchHeaderProps) => (
  <div className="border border-rounded-sm">
    <div className="px-4">
      <div className="flex items-center justify-between py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="font-semibold text-lg">
          {resultCount} results found
        </span>
        <div className="w-10" /> 
      </div>
    </div>
  </div>
);

export default SearchHeader;