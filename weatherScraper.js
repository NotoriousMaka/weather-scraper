import puppeteer from 'puppeteer';

const city = process.argv[2];

async function scrapeWeather(cityName) {
    const browser = await puppeteer.launch({ headless: true }); // Set headless to true to run without opening a browser
    const page = await browser.newPage();

    const url = `https://openweathermap.org/find?q=${cityName}`;

    await page.goto(url, { waitUntil: 'networkidle2' });

    try {
        await page.waitForSelector('.table td a', { timeout: 5000 });
        await page.click('.table td a');
    } catch (error) {
        await browser.close();
        return "City not found!";
    }

    try {
        await page.waitForSelector('.current-temp span', { timeout: 5000 });
        const temperature = await page.$eval('.current-temp span', el => el.textContent);
        await browser.close();
        return temperature.replace('°C', ''); // Remove the '°C' from the output
    } catch (error) {
        await browser.close();
        return "Weather data not found!";
    }
}

scrapeWeather(city).then(temp => {
    console.log(temp); // This will now only log the temperature
    process.exit();
}).catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
