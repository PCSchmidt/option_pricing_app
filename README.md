# Option Pricing App (Black-Scholes Model)

A web-based tool for calculating option prices, Greeks, and visualizing price evolution over time using the Black-Scholes model with modern "Wall Street" styling.

## Features
- **Black-Scholes Pricing**: Calculate call/put option prices with real-time updates
- **Greek Metrics**: Delta, Gamma, Theta, Vega, and Rho calculations
- **Interim Price Analysis**: Calculate option value at any date between now and expiration
- **Dynamic Price Trajectory**: Interactive chart showing option price evolution with stock price movements
- **Wall Street Aesthetic**: Professional dark theme with gold accents for a premium financial look
- **Responsive UI**: Clean interface with form validation and error handling

## How to Use
1. **Start the Server**:
   ```bash
   cd c:/Users/pchri/Documents/Experiments/option-pricing-app
   python -m http.server 8000
   ```

2. **Access the App**:
   Open your browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```

3. **Input Parameters**:
   - Stock Price: Current stock price
   - Strike Price: Option strike price
   - Expiration Date: Future expiration date
   - Interim Date: Date to check option value (optional)
   - Interim Stock Price: Stock price at interim date (optional)
   - Option Type: Call or Put
   - Risk-Free Rate: Annual risk-free interest rate (%)
   - Volatility: Annual volatility of the underlying stock (%)

4. **View Results**:
   - Option price at expiration
   - Greek metrics
   - Interim option price (if date provided)
   - Interactive chart showing price evolution with stock price movement

## Example Scenario
**Input**:
- Stock Price: $40
- Strike Price: $95
- Expiration Date: January 1, 2027
- Interim Date: November 1, 2025
- Interim Stock Price: $100
- Option Type: Call
- Risk-Free Rate: 5%
- Volatility: 20%

**Output**:
- Option price at current date based on $40 stock price
- Option price at November 2025 based on $100 stock price
- Chart showing price trajectory with stock price movement from $40 to $100
- Greek metrics for risk analysis

## Requirements
- Python 3.x (for serving the app)
- Modern web browser (Chrome, Edge, Firefox, etc.)
- No additional libraries required (all JavaScript libraries loaded via CDN)

## Technical Details
- Pure JavaScript implementation with Chart.js for visualizations
- Black-Scholes model with continuous compounding
- Time calculations use actual calendar days (365-day year)
- Dynamic chart updates based on input parameters
- All calculations performed client-side in the browser

## Mobile App Version
A detailed plan for converting this web app to a mobile application for iOS and Android platforms is available in the [MobileAppPlan.md](MobileAppPlan.md) file.
