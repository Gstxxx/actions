# Actions

## Overview
Actions is a comprehensive stock portfolio management application that helps users track and manage their stock investments. The platform provides real-time monitoring of stock prices, portfolio valuation, and detailed analytics for each holding. Users can easily add stocks to their watchlist, view key metrics like P/E ratios and earnings per share, and track their total portfolio value over time. With an intuitive interface and robust features, Actions aims to give investors a clear view of their stock holdings and market performance in one centralized dashboard.

## Prerequisites
- Node.js (version 18.x.x)
- npm (version 9.x.x)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Gstxxx/actions
   cd actions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma Client:
   ```bash
   npm run generate
   npm run migrate
   npm run seed
   ```

## Running the Development Server
To start the development server, run:
```
npm run dev
```
Open your browser and navigate to `http://localhost:3000` to view the application.

## Building for Production
To build the project
```
cd client
npm install
npm run dev
```

```
open http://localhost:3000
```
## Landing Page   
![Screenshot 1](preview/landing.png)

## Login Page
![Screenshot 2](preview/login.png)

## Stocks Page
![Screenshot 3](preview/stocks.png)

## Create Quote Page
![Screenshot 4](preview/create.png)

## Quote Details Page
![Screenshot 5](preview/details.png)