// Black-Scholes Option Pricing Model
document.addEventListener('DOMContentLoaded', function() {
    // Register the annotation plugin
    Chart.register(ChartAnnotation);
    // Set default dates when the page loads
    const today = new Date();
    
    // Set default expiration date to 1 year from now
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    // Set default interim date to 6 months from now
    const sixMonths = new Date(today);
    sixMonths.setMonth(today.getMonth() + 6);
    
    // Format dates for the date inputs (YYYY-MM-DD)
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    // Set the default values
    document.getElementById('expirationDate').value = formatDate(nextYear);
    document.getElementById('interimDate').value = formatDate(sixMonths);
    
    // Initialize the chart with default values
    setTimeout(() => calculateOption(), 500);
});

// Global chart reference
let priceChart = null;

function calculateOption() {
    console.log("Calculating option prices...");
    
    try {
        // Get input values
        const S = parseFloat(document.getElementById('stockPrice').value);
        const K = parseFloat(document.getElementById('strikePrice').value);
        const expirationDate = new Date(document.getElementById('expirationDate').value);
        const today = new Date();
        const timeToExpiration = calculateTimeBetweenDates(today, expirationDate);
        const r = parseFloat(document.getElementById('riskFreeRate').value) / 100;
        const sigma = parseFloat(document.getElementById('volatility').value) / 100;
        const optionType = document.getElementById('optionType').value;
        const interimDate = new Date(document.getElementById('interimDate').value);
        const interimStockPrice = parseFloat(document.getElementById('interimStockPrice').value);
        const timeToInterim = calculateTimeBetweenDates(today, interimDate);
        
        console.log("Inputs:", { 
            S, 
            K, 
            timeToExpiration, 
            r, 
            sigma, 
            optionType,
            interimStockPrice,
            timeToInterim
        });
        
        // Validate inputs
        if (isNaN(S) || isNaN(K) || S <= 0 || K <= 0) {
            document.getElementById('optionPrice').textContent = "Invalid stock or strike price";
            return;
        }
        
        // Validate expiration date
        if (isNaN(expirationDate.getTime()) || timeToExpiration <= 0) {
            document.getElementById('optionPrice').textContent = "Invalid expiration date";
            return;
        }
        
        // Validate volatility
        if (isNaN(sigma) || sigma <= 0) {
            document.getElementById('optionPrice').textContent = "Invalid volatility";
            return;
        }
        
        // Validate interim date and price
        if (isNaN(interimDate.getTime()) || timeToInterim < 0 || timeToInterim > timeToExpiration) {
            document.getElementById('interimOptionPrice').textContent = "Invalid interim date";
            return;
        }
        
        if (isNaN(interimStockPrice) || interimStockPrice <= 0) {
            document.getElementById('interimOptionPrice').textContent = "Invalid interim stock price";
            return;
        }
        
        // Calculate d1 and d2 for expiration
        const d1 = (Math.log(S/K) + (r + 0.5 * sigma * sigma) * timeToExpiration) / (sigma * Math.sqrt(timeToExpiration));
        const d2 = d1 - sigma * Math.sqrt(timeToExpiration);
        
        console.log("d1:", d1, "d2:", d2);
        
        // Calculate option price at expiration
        const callPrice = S * normCDF(d1) - K * Math.exp(-r * timeToExpiration) * normCDF(d2);
        const putPrice = K * Math.exp(-r * timeToExpiration) * normCDF(-d2) - S * normCDF(-d1);
        
        const optionPrice = optionType === 'call' ? callPrice : putPrice;
        console.log("Option price at expiration:", optionPrice);
        
        // Update display for current option price
        document.getElementById('optionPrice').textContent = optionPrice.toFixed(4);
        
        // Calculate Greeks
        calculateGreeks(S, K, timeToExpiration, r, sigma, d1, d2, optionType);
        
        // Calculate option price at interim date
        if (timeToInterim > 0) {
            // Time remaining from interim date to expiration
            const remainingTime = timeToExpiration - timeToInterim;
            
            // Calculate d1 and d2 for interim
            const d1Interim = (Math.log(interimStockPrice/K) + (r + 0.5 * sigma * sigma) * remainingTime) / (sigma * Math.sqrt(remainingTime));
            const d2Interim = d1Interim - sigma * Math.sqrt(remainingTime);
            
            const callPriceInterim = interimStockPrice * normCDF(d1Interim) - K * Math.exp(-r * remainingTime) * normCDF(d2Interim);
            const putPriceInterim = K * Math.exp(-r * remainingTime) * normCDF(-d2Interim) - interimStockPrice * normCDF(-d1Interim);
            
            const interimOptionPrice = optionType === 'call' ? callPriceInterim : putPriceInterim;
            console.log("Option price at interim date:", interimOptionPrice);
            
            document.getElementById('interimOptionPrice').textContent = interimOptionPrice.toFixed(4);
        } else {
            document.getElementById('interimOptionPrice').textContent = "Invalid date";
        }
        
        // Create chart data showing price trajectory with changing stock price
        createPriceTrajectoryChart(S, K, interimStockPrice, timeToExpiration, timeToInterim, r, sigma, optionType);
        
    } catch (error) {
        console.error("Error in option calculation:", error);
        document.getElementById('optionPrice').textContent = "Calculation error";
    }
}

function calculateTimeBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return timeDiff / (1000 * 60 * 60 * 24 * 365); // Convert to years
}

function normCDF(x) {
    // Standard normal cumulative distribution function
    if (x < -8) return 0;
    if (x > 8) return 1;
    
    // Use the approximation formula
    let sum = x;
    let term = x;
    for (let i = 1; i < 100; i++) {
        term = term * x * x / (2 * i + 1);
        sum += term;
    }
    return 0.5 + sum * Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
}

function calculateGreeks(S, K, T, r, sigma, d1, d2, optionType) {
    const sqrtT = Math.sqrt(T);
    const N = normCDF;
    const NPrime = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    
    // Delta
    const delta = optionType === 'call' 
        ? N(d1) 
        : N(d1) - 1;
    
    // Gamma
    const gamma = NPrime(d1) / (S * sigma * sqrtT);
    
    // Theta
    const theta = optionType === 'call' 
        ? (-S * sigma * NPrime(d1) / (2 * sqrtT) 
           - r * K * Math.exp(-r * T) * N(d2))
        : (-S * sigma * NPrime(d1) / (2 * sqrtT) 
           + r * K * Math.exp(-r * T) * N(-d2));
    
    // Vega
    const vega = S * NPrime(d1) * sqrtT;
    
    // Rho
    const rho = optionType === 'call' 
        ? K * T * Math.exp(-r * T) * N(d2)
        : -K * T * Math.exp(-r * T) * N(-d2);
    
    // Update display
    document.getElementById('delta').textContent = delta.toFixed(4);
    document.getElementById('gamma').textContent = gamma.toFixed(4);
    document.getElementById('theta').textContent = theta.toFixed(4);
    document.getElementById('vega').textContent = vega.toFixed(4);
    document.getElementById('rho').textContent = rho.toFixed(4);
}

function createPriceTrajectoryChart(initialStockPrice, strikePrice, interimStockPrice, timeToExpiration, timeToInterim, riskFreeRate, volatility, optionType) {
    console.log("Creating price trajectory chart with stock price movement...");
    
    // Get the canvas element
    const canvas = document.getElementById('priceChart');
    if (!canvas) {
        console.error("Canvas element not found");
        return;
    }
    
    // Calculate number of points based on time periods
    const totalPoints = 100;
    
    // Calculate interim point index
    const interimIndex = Math.floor((timeToInterim / timeToExpiration) * totalPoints);
    console.log("Interim point at index:", interimIndex, "out of", totalPoints);
    
    // Generate chart data
    const labels = [];  // Time points
    const data = [];    // Option prices
    
    // Helper function to calculate option price
    const calculateOptionPrice = (stockPrice, timeRemaining, strikePrice, r, sigma, optionType) => {
        // Ensure valid parameters
        const adjustedSigma = Math.max(sigma, 0.0001);
        const adjustedTime = Math.max(timeRemaining, 0.0001);
        
        // Calculate d1 and d2
        const d1 = (Math.log(stockPrice/strikePrice) + (r + 0.5 * adjustedSigma * adjustedSigma) * adjustedTime) / 
                   (adjustedSigma * Math.sqrt(adjustedTime));
        const d2 = d1 - adjustedSigma * Math.sqrt(adjustedTime);
        
        // Calculate option price
        if (optionType === 'call') {
            return stockPrice * normCDF(d1) - strikePrice * Math.exp(-r * adjustedTime) * normCDF(d2);
        } else {
            return strikePrice * Math.exp(-r * adjustedTime) * normCDF(-d2) - stockPrice * normCDF(-d1);
        }
    };
    
    // Generate data points for the trajectory
    for (let i = 0; i <= totalPoints; i++) {
        // Calculate time remaining until expiration at this point
        const timeRatio = i / totalPoints;
        const timeRemaining = timeToExpiration * (1 - timeRatio);
        
        // Calculate the stock price at this point
        // Before interim: linear interpolation from initial to interim
        // After interim: maintain interim price
        let stockPrice;
        if (i <= interimIndex) {
            // Linear interpolation from initial to interim stock price
            const progress = (i === 0) ? 0 : i / interimIndex;
            stockPrice = initialStockPrice + progress * (interimStockPrice - initialStockPrice);
        } else {
            // After interim date, use the interim stock price
            stockPrice = interimStockPrice;
        }
        
        // Calculate option price at this point
        const optionPrice = calculateOptionPrice(
            stockPrice, 
            timeRemaining, 
            strikePrice, 
            riskFreeRate, 
            volatility, 
            optionType
        );
        
        // Format the time as "X.XX years remaining"
        // But near the ends, use "Today" and "Expiration"
        let timeLabel;
        if (timeRatio < 0.01) {
            timeLabel = "Today";
        } else if (timeRatio > 0.99) {
            timeLabel = "Expiration";
        } else if (Math.abs(timeRatio - (timeToInterim / timeToExpiration)) < 0.01) {
            timeLabel = "Interim";
        } else {
            timeLabel = timeRemaining.toFixed(2) + " yrs";
        }
        
        labels.push(timeLabel);
        data.push(optionPrice.toFixed(2));
        
        // Log the values at important points
        if (i === 0 || i === interimIndex || i === totalPoints) {
            const pointName = i === 0 ? "Start" : (i === interimIndex ? "Interim" : "Expiration");
            console.log(`${pointName} point: time=${timeLabel}, stock=$${stockPrice.toFixed(2)}, option=$${optionPrice.toFixed(2)}`);
        }
    }
    
    console.log("Chart data prepared:", data.length, "points");
    
    // Try to create the chart
    try {
        // Destroy existing chart if it exists
        if (priceChart) {
            priceChart.destroy();
            console.log("Destroyed existing chart");
        }
        
        // Get the 2D context
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Could not get 2D context from canvas");
            return;
        }
        
        // Create new chart
        priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: optionType === 'call' ? 'Call Option Price' : 'Put Option Price',
                    data: data,
                    borderColor: '#ffd700',
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    pointRadius: (point, opt) => {
                        // Mark important points (today, interim, expiration)
                        const idx = opt.dataIndex;
                        return (idx === 0 || idx === interimIndex || idx === totalPoints) ? 5 : 0;
                    },
                    pointBackgroundColor: '#ffd700',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const idx = context.dataIndex;
                                let stockPrice;
                                
                                if (idx <= interimIndex) {
                                    const progress = (idx === 0) ? 0 : idx / interimIndex;
                                    stockPrice = initialStockPrice + progress * (interimStockPrice - initialStockPrice);
                                } else {
                                    stockPrice = interimStockPrice;
                                }
                                
                                return [
                                    `Option Price: $${context.raw}`,
                                    `Stock Price: $${stockPrice.toFixed(2)}`
                                ];
                            }
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: '#ffd700',
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Option Price with Stock Price Movement',
                        color: '#ffd700',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    annotation: {
                        annotations: {
                            interimLine: {
                                type: 'line',
                                xMin: interimIndex,
                                xMax: interimIndex,
                                borderColor: 'rgba(255, 215, 0, 0.5)',
                                borderWidth: 2,
                                borderDash: [5, 5],
                                label: {
                                    content: 'Interim Date',
                                    enabled: true,
                                    position: 'top',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    color: '#ffd700'
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                            color: '#ddd'
                        },
                        ticks: {
                            color: '#ddd'
                        },
                        grid: {
                            color: '#333'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Option Price ($)',
                            color: '#ddd'
                        },
                        ticks: {
                            color: '#ddd',
                            callback: function(value) {
                                return '$' + value;
                            }
                        },
                        grid: {
                            color: '#333'
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
        
        console.log("Chart created successfully");
        
    } catch (error) {
        console.error("Error creating chart:", error);
    }
}
