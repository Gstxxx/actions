import { Hono } from "hono";
import { controller as createQuoteController } from '../Controllers/Quotes/CreateQuote';
import { controller as fetchQuotesFromUserController } from '../Controllers/Quotes/FetchQuotesFromUser';

const quotesApp = new Hono()
    .basePath("/")
    .route("/", createQuoteController)
    .route("/", fetchQuotesFromUserController);

export { quotesApp };
