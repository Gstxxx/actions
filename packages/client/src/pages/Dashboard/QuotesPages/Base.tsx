import { useState, useEffect } from 'react';
import { submit as createQuote } from '@/lib/api/QuoteService/Create';
import { submit as listQuotes } from '@/lib/api/QuoteService/List';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Quote } from '@/../../server/src/Types/Quote'
import { Loader2Icon } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { StockCard } from "@/components/StockCard";
import { StockDetailsDialog } from "@/components/StockDetailsDialog";
import { AddQuoteDialog } from "@/components/AddQuoteDialog";

export default function QuotesPages() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await listQuotes();
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.quotes)) {
            const transformedQuotes = data.quotes.map((quote: Quote) => ({
              ...quote,
              regularMarketTime: quote.regularMarketTime ? new Date(quote.regularMarketTime) : undefined,
              regularMarketDayHigh: quote.regularMarketDayHigh || quote.price,
              regularMarketDayLow: quote.regularMarketDayLow || quote.price,
              regularMarketVolume: quote.regularMarketVolume || undefined,
              regularMarketPreviousClose: quote.regularMarketPreviousClose ?? undefined,
              regularMarketOpen: quote.regularMarketOpen ?? undefined,
              fiftyTwoWeekLow: quote.fiftyTwoWeekLow ?? undefined,
              fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh ?? undefined,
              priceEarnings: quote.priceEarnings ?? undefined,
              earningsPerShare: quote.earningsPerShare ?? undefined,
              walletId: quote.walletId ?? undefined,
              amount: quote.quoteAmount,
              priceHistory: quote.priceHistory ? quote.priceHistory.map(history => ({
                ...history,
                date: new Date(history.date)
              })) : undefined,
            }));
            setQuotes(transformedQuotes);
            setLoading(false);
          }
          else if (data.message === "User wallet not found") {
            setLoading(false);
          }
          else {
            toast.error('Unexpected response format');
            setLoading(false);
          }
        } else {
          toast.error('Failed to fetch quotes');
          setLoading(false);
        }
      } catch {
        toast.error('An error occurred while fetching quotes');
        setLoading(false);
      }
    }
    const interval = setInterval(fetchQuotes, 30000);
    fetchQuotes();
    return () => clearInterval(interval);
  }, []);

  const handleAddQuote = async (ticker: string, amount: number) => {
    if (!ticker) {
      toast.error('Quote cannot be empty');
      return;
    }
    try {
      const response = await createQuote({ ticker, amount });
      if (response.ok) {
        const { quote: addedQuote } = await response.json();
        const transformedQuote = {
          ...addedQuote,
          regularMarketTime: addedQuote.regularMarketTime ? new Date(addedQuote.regularMarketTime) : undefined,
          regularMarketDayHigh: addedQuote.regularMarketDayHigh || addedQuote.price,
          regularMarketDayLow: addedQuote.regularMarketDayLow || addedQuote.price,
          regularMarketVolume: addedQuote.regularMarketVolume || undefined,
          regularMarketPreviousClose: addedQuote.regularMarketPreviousClose ?? undefined,
          regularMarketOpen: addedQuote.regularMarketOpen ?? undefined,
          fiftyTwoWeekLow: addedQuote.fiftyTwoWeekLow ?? undefined,
          fiftyTwoWeekHigh: addedQuote.fiftyTwoWeekHigh ?? undefined,
          priceEarnings: addedQuote.priceEarnings ?? undefined,
          earningsPerShare: addedQuote.earningsPerShare ?? undefined,
          amount: addedQuote.quoteAmount,
          priceHistory: addedQuote.priceHistory ? addedQuote.priceHistory.map((history: { date: string | number | Date }) => ({
            ...history,
            date: new Date(history.date)
          })) : undefined,
        };

        const exists = quotes.some(quote => quote.id === transformedQuote.id);
        if (!exists) {
          setQuotes([...quotes, transformedQuote]);
          toast.success('Quote added successfully');
        } else {
          toast.info('Quote already exists in your portfolio');
        }
      } else {
        toast.error('Failed to add quote');
      }
    } catch {
      toast.error('An error occurred while adding the quote');
    }
  };

  const handleDeleteQuote = (id: number) => {
    setQuotes(prev => prev.filter(quote => quote.id !== id));
    setSelectedQuote(null);
    toast.success('Stock removed successfully');
  };

  const totalPortfolioValue = quotes.reduce((total, quote) => {
    return total + (quote.price * quote.quoteAmount);
  }, 0);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto p-8 space-y-8">
          <div className="flex items-center justify-between sm:flex-row flex-col">
            <div>
              <h1 className="text-4xl font-bold text-white">Stock Dashboard</h1>
              <p className="text-muted-foreground text-gray-400">
                Total Portfolio Value: {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalPortfolioValue)}
              </p>
            </div>
            <div className="pl-4 flex items-center gap-4">
              <AddQuoteDialog onAdd={handleAddQuote} />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2Icon className="h-8 w-8 animate-spin" />
            </div>
          ) : quotes.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-xl text-gray-400">Add a quote</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote) => (
                <StockCard
                  key={quote.id}
                  quote={quote}
                  onClick={() => setSelectedQuote(quote)}
                />
              ))}
            </div>
          )}

          {selectedQuote && (
            <StockDetailsDialog
              quote={selectedQuote}
              open={!!selectedQuote}
              onOpenChange={(open) => !open && setSelectedQuote(null)}
              onDelete={handleDeleteQuote}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
