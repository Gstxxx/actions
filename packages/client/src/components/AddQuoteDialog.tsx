import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";

interface AddQuoteDialogProps {
  onAdd: (ticker: string, amount: number) => Promise<void>;
}

export function AddQuoteDialog({ onAdd }: AddQuoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [ticker, setTicker] = useState("");
  const [amount, setAmount] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim() && amount >= 1) {
      await onAdd(ticker.trim(), amount);
      setTicker("");
      setAmount(1);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 text-white hover:bg-green-500 hover:transition-all hover:duration-300 hover:text-white hover:shadow-lg hover:shadow-green-500/50">
          <PlusCircleIcon className="h-4 w-4 text-white" />
          Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="bg-gray-100 shadow-lg p-4 rounded-lg space-y-4">
          <Input
            placeholder="Enter stock symbol (e.g., PETR4)"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <Input
            type="number"
            min={1}
            placeholder="Enter amount of shares"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
          />
          <Button type="submit" className="w-full">Add Stock</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}