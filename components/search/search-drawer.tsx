import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchSidebar from "./search-sidebar";
import { Filter, ArrowUpDown, X } from "lucide-react";

const SearchFilterDrawer = () => {
  const [activeTab, setActiveTab] = useState<'sort' | 'filter' | null>(null);
  const [selectedSort, setSelectedSort] = useState("Featured");

  const sortOptions = [
    { id: "featured", label: "Featured", icon: "⭐" },
    { id: "newest", label: "Newest", icon: "🆕" },
    { id: "priceHighToLow", label: "Price: High to Low", icon: "💰" },
    { id: "priceLowToHigh", label: "Price: Low to High", icon: "🏷️" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between bg-background/90 backdrop-blur-sm p-1.5 shadow-lg border-t border-border">
        <Button
          variant="ghost"
          className={`flex-1 rounded-full text-sm font-medium ${activeTab === 'sort' ? 'bg-accent text-accent-foreground' : ''}`}
          onClick={() => setActiveTab('sort')}
        >
          <ArrowUpDown className="w-4 h-4 mr-2" />
          Sort
        </Button>
        <div className="w-px h-6 bg-border mx-1"></div>
        <Button
          variant="ghost"
          className={`flex-1 rounded-full text-sm font-medium ${activeTab === 'filter' ? 'bg-accent text-accent-foreground' : ''}`}
          onClick={() => setActiveTab('filter')}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Sheet open={activeTab !== null} onOpenChange={() => setActiveTab(null)}>
        <SheetContent side="bottom" className="h-[50vh] p-0">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center w-full p-4 border-b">
              <h2 className="text-xl font-semibold">{activeTab === 'sort' ? 'Sort Products' : 'Filter Products'}</h2>
            </div>
            {activeTab === 'sort' ? (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-4">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      className={`p-4 rounded-lg border ${
                        selectedSort === option.label
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      } transition-colors duration-200 flex flex-col items-center justify-center`}
                      onClick={() => setSelectedSort(option.label)}
                    >
                      <span className="text-2xl mb-2">{option.icon}</span>
                      <span className="text-sm font-medium text-center">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <SearchSidebar />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchFilterDrawer;