import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Quote } from '@/../../src/Types/Quote';
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface StockDetailsDialogProps {
  quote: Quote;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: number) => void;
}

export function StockDetailsDialog({
  quote,
  open,
  onOpenChange,
  onDelete,
}: StockDetailsDialogProps) {
  const totalInvestment = (quote.price * (quote.wallet?.quotesAmount || 0));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-lg shadow-lg sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-4">
            <DialogTitle className="text-2xl font-bold">{quote.longName}</DialogTitle>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(quote.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">
                {formatCurrency(quote.price, quote.currency)}
              </p>
              <p className={`text-sm font-medium ${
                (quote.regularMarketChangePercent || 0) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
                {quote.regularMarketChange?.toFixed(2)} ({quote.regularMarketChangePercent?.toFixed(2)}%)
              </p>
            </div>
            {quote.wallet?.quotesAmount && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-2xl font-bold">{formatCurrency(totalInvestment, quote.currency)}</p>
                <p className="text-sm text-muted-foreground">{quote.wallet?.quotesAmount} shares</p>
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Market Open</p>
              <p className="font-medium">{formatCurrency(quote.regularMarketOpen || 0, quote.currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Previous Close</p>
              <p className="font-medium">{formatCurrency(quote.regularMarketPreviousClose || 0, quote.currency)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Day Range</p>
              <p className="font-medium">
                {formatCurrency(quote.regularMarketDayLow || 0, quote.currency)} - {formatCurrency(quote.regularMarketDayHigh || 0, quote.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">52 Week Range</p>
              <p className="font-medium">
                {formatCurrency(quote.fiftyTwoWeekLow || 0, quote.currency)} - {formatCurrency(quote.fiftyTwoWeekHigh || 0, quote.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-medium">{formatNumber(quote.regularMarketVolume || 0)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">P/E Ratio</p>
              <p className="font-medium">{quote.priceEarnings?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">EPS</p>
              <p className="font-medium">{quote.earningsPerShare?.toFixed(2) || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Update</p>
              <p className="font-medium">
                {quote.regularMarketTime ? formatDate(new Date(quote.regularMarketTime)) : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}