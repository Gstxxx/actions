import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Quote } from "@/../../server/src/Types/Quote";
import Image from "@/components/ui/image";
import { Button } from "@/components/ui/button";

interface StockCardProps {
  quote: Quote;
  onClick: () => void;
}

export function StockCard({ quote, onClick }: StockCardProps) {
  const isPositive = (quote.regularMarketChangePercent || 0) >= 0;
  const totalInvestment = quote.quoteAmount ? (quote.price * quote.quoteAmount) : undefined;

  return (
    <Button
      variant="ghost"
      className="p-0 h-auto w-full hover:bg-transparent"
      onClick={onClick}
    >
      <Card className="w-full bg-white hover:shadow-lg transition-shadow border-2 hover:border-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            {quote.logoUrl ? (
              <Image
                src={quote.logoUrl}
                alt={quote.shortName}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <TrendingUpIcon className="h-6 w-6 text-muted-foreground" />
            )}
            <div>
              <h3 className="font-bold text-lg">{quote.ticker}</h3>
              <p className="text-sm text-muted-foreground">{quote.shortName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">
              {formatCurrency(quote.price, quote.currency)}
            </p>
            <span className={cn(
              "text-sm font-medium flex items-center justify-end gap-1",
              isPositive ? "text-green-500" : "text-red-500"
            )}>
              {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              {Math.abs(quote.regularMarketChangePercent || 0).toFixed(2)}%
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Day Range</p>
              <p className="text-sm">
                {formatCurrency(quote.regularMarketDayLow || 0, quote.currency)} - {formatCurrency(quote.regularMarketDayHigh || 0, quote.currency)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Volume</p>
              <p className="text-sm">{formatNumber(quote.regularMarketVolume || 0)}</p>
            </div>
            {quote.quoteAmount && (
              <div className="space-y-1 col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Investment</p>
                <p className="text-sm font-semibold">
                  {formatCurrency(totalInvestment || 0, quote.currency)} ({quote.quoteAmount} shares)
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Button>
  );
}