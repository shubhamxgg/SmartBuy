import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  currentIndex: number;
  totalItems: number;
  onIndexChange: (newIndex: number) => void;
}

export function CarouselControls({
  currentIndex,
  totalItems,
  onIndexChange,
}: CarouselControlsProps) {
  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4 z-10">
      <Button
        size="sm"
        variant="ghost"
        className="bg-black/20 text-white hover:bg-black/40 hover:text-white"
        onClick={() => onIndexChange(currentIndex - 1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-primary"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            onClick={() => onIndexChange(index)}
          />
        ))}
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="bg-black/20 text-white hover:bg-black/40 hover:text-white"
        onClick={() => onIndexChange(currentIndex + 1)}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
