# Weather Forecast Scraper

A comprehensive web scraper built with Playwright that fetches detailed weather forecast data from TimeAndDate.com. This scraper provides extended weather information including temperature, conditions, humidity, precipitation, UV index, and sunrise/sunset times.

## Overview

This scraper automates a browser to visit TimeAndDate.com's extended weather forecast pages and extracts detailed weather data for any city worldwide. It returns structured JSON data with comprehensive weather metrics for multiple days.

## Features

- 🌤️ Extended weather forecast data (multiple days)
- 🌡️ Comprehensive metrics (temperature, humidity, UV, wind, etc.)
- 🌍 Global city support
- 🎯 Command-line interface
- 📊 Structured JSON output
- ⏰ Sunrise and sunset times
- 🌧️ Precipitation forecasts
- 🚀 Fast scraping using Playwright

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Navigate to the scrapers directory
2. Install dependencies:

```bash
npm install playwright
```

3. Install Playwright browsers:

```bash
npx playwright install chromium
```

## Usage

### Basic Usage

```bash
node weather-play.js [COUNTRY] [CITY]
```

**Important**: Both country and city parameters are required.

#### Examples

```bash
# Weather forecast for London, UK
node weather-play.js uk london

# Weather forecast for New York, USA
node weather-play.js usa new-york

# Weather forecast for Tokyo, Japan
node weather-play.js japan tokyo

# Weather forecast for Paris, France
node weather-play.js france paris
```

### URL Format

The scraper constructs URLs in the format:
```
https://www.timeanddate.com/weather/{country}/{city}/ext
```

### Output Format

The scraper returns a JSON array with weather data for multiple days:

```json
[
  {
    "day": "Today",
    "temperature": "22°C",
    "weather": "Partly cloudy",
    "feels_like": "24°C",
    "wind": "W 15 km/h",
    "humidity": "65%",
    "precipitation_chance": "10%",
    "precipitation_amount": "0 mm",
    "uv": "6",
    "sunrise": "05:47",
    "sunset": "20:21"
  },
  {
    "day": "Tomorrow",
    "temperature": "19°C",
    "weather": "Light rain",
    "feels_like": "21°C",
    "wind": "SW 12 km/h",
    "humidity": "78%",
    "precipitation_chance": "80%",
    "precipitation_amount": "3 mm",
    "uv": "4",
    "sunrise": "05:48",
    "sunset": "20:20"
  }
]
```

## Data Fields

Each forecast entry includes:

| Field | Description | Example |
|-------|-------------|---------|
| `day` | Day identifier | "Today", "Tomorrow", "Sat 28 Jun" |
| `temperature` | Current/forecasted temperature | "22°C" |
| `weather` | Weather condition description | "Partly cloudy", "Light rain" |
| `feels_like` | Apparent temperature | "24°C" |
| `wind` | Wind direction and speed | "W 15 km/h" |
| `humidity` | Relative humidity percentage | "65%" |
| `precipitation_chance` | Probability of precipitation | "10%" |
| `precipitation_amount` | Expected rainfall amount | "0 mm" |
| `uv` | UV index value | "6" |
| `sunrise` | Sunrise time | "05:47" |
| `sunset` | Sunset time | "20:21" |

## Supported Locations

The scraper supports cities from around the world. Use the country and city names as they appear in TimeAndDate.com URLs:

### Country Examples:
- `uk` - United Kingdom
- `usa` - United States
- `canada` - Canada
- `australia` - Australia
- `germany` - Germany
- `france` - France
- `japan` - Japan
- `italy` - Italy

### City Name Format:
- Use lowercase
- Replace spaces with hyphens
- Examples: `new-york`, `los-angeles`, `san-francisco`

### Finding Correct Names:
1. Visit timeanddate.com/weather
2. Search for your city
3. Note the country and city format in the URL

## Configuration

### Browser Settings

Current configuration:
- **Headless mode**: Disabled (for debugging)
- **Viewport**: 1280x800 pixels
- **Timeout**: 20 seconds for page elements

### Enable Headless Mode

For production use, modify the `setBrowser()` function:

```javascript
const browser = await chromium.launch({ headless: true });
```

### Adjust Timeout

To change the timeout for element waiting:

```javascript
await page.waitForSelector("#wt-ext", { timeout: 30000 }); // 30 seconds
```

## Error Handling

The scraper includes robust error handling for:

- **Invalid country/city combinations**
- **Network connectivity issues**
- **Page loading timeouts**
- **Missing weather data**
- **Browser launch failures**

### Common Error Scenarios:

1. **City not found**: Returns empty array or null
2. **Network timeout**: Logs "Scraping failed" with error details
3. **Invalid URL format**: Page fails to load weather data

## Technical Details

### Architecture

The scraper consists of three main functions:

1. **`setBrowser()`** - Initializes Playwright browser
2. **`navigateAndScrape()`** - Handles navigation and data extraction  
3. **`main()`** - Orchestrates the process and error handling

### Data Extraction Strategy

The scraper targets the extended weather table (`#wt-ext`) and extracts data from:
- Table rows (`tbody tr`)
- Cell data (`th, td` elements)
- Specific column mappings for each weather metric

### Performance Optimization

- Waits for DOM content loaded (faster than full page load)
- Uses efficient CSS selectors
- Extracts all data in a single page evaluation

## Troubleshooting

### Common Issues

1. **"City not found" errors**
   - Verify country and city spelling
   - Check TimeAndDate.com for exact URL format
   - Use lowercase and hyphens for city names

2. **Timeout errors**
   - Increase timeout value
   - Check internet connection
   - Verify TimeAndDate.com accessibility

3. **Empty results**
   - Confirm the city has weather data on TimeAndDate.com
   - Check for recent website structure changes

4. **Browser launch issues**
   - Run: `npx playwright install chromium`
   - Ensure sufficient system resources

### Debug Mode

The scraper runs with visible browser by default. Watch the automation to identify:
- Incorrect URL construction
- Page loading issues
- Missing weather table elements

### Testing Locations

Test with known working combinations:
```bash
node weather-play.js uk london
node weather-play.js usa new-york
node weather-play.js australia sydney
```

## Rate Limiting & Ethics

- Built-in delays through Playwright
- Respectful scraping practices
- Single request per execution
- No concurrent requests

**Note**: Always respect website terms of service and implement appropriate delays for production use.

## Performance Metrics

- **Average execution time**: 4-8 seconds
- **Memory usage**: ~60-120MB (including browser)
- **Data accuracy**: Real-time from TimeAndDate.com
- **Forecast range**: Typically 7-10 days

## Dependencies

- **Playwright**: Web automation framework
- **Chromium**: Browser engine for scraping

See the parent directory's `package.json` for complete dependency information.

## License

This project is part of the TripGenie application. Please refer to the main project license.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Test with multiple cities/countries
4. Ensure error handling works properly
5. Submit a pull request

---

*Last updated: June 2025*
