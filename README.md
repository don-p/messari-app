## Installation/running the project

### Clone the repo

Clone this git repository into a directory.

### Install dependencies

In the project directory, run:
`npm install`

### Run the application

In the project directory, run:
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Project requirements

### Objective

Build a React + TypeScript web app using the Messari API to display metrics and time-series data into a chart visualization.

### Details

Build an overview page for a given asset powered by the time-series endpoint for that specific asset as well as the metrics endpoint for that asset
Page should display a general chart visualizing the time-series for that given asset as well as some metrics alongside the chart
Asset data from the Messari APIs should be fetched directly from within the web application
[Bonus point] have the ability to switch the selection from one asset to another within the app, which in turns updates the chart visualization as well as the metrics, for a paginated list of assets try https://data.messari.io/api/v1/assets
Note: Styling and CSS will not be part of the grading criteria however any piece of the UI that blatantly takes away from the experience may be perceived negatively

### Docs

Time-series endpoint: https://data.messari.io/api/v1/assets/yfi/metrics/price/time-series?start=2021-01-01&end=2021-02-01&interval=1d
Metrics endpoint: https://data.messari.io/api/v1/assets/yfi/metrics
In both of the above cases { yfi } inside the URL is replaceable with the symbol/slug of another asset
Here are the detailed docs: https://messari.io/api/docs

### Libraries

Feel free to choose the libraries at will, the only requirements are building using React and TypeScript

### Duration

We know that your time is precious and don’t want to make you sink more than a few deep work hours into this.

### Deadline

In order to help you find a consecutive chunk of time to work on this, we’ll accept anything sent over within 6 days of receiving the challenge. If you receive it on a Monday, it will be expected to be submitted by EOD Sunday.

### Note

The problem statement is intentionally kept vague, feel free to loosely interpret the statements above and come up with a UI/UX that is to your liking. The main goal of this exercise is to showcase your proficiency in 1) connecting the FE pipelines over an API, 2) the React + TypeScript framework, and 3) producing a consumable web app.

### Code

Feel free to send the code in:

git repository where the code lives
codesandbox URL
.tar/.zip file over email
Basic instructions on how to run are welcomed 🙂

### Docs

API Docs: https://messari.io/api/docs
Landing page with examples: https://messari.io/api

### Rate limit

Feel free to create an account in Messari and generate an API token, if you run into any rate-limiting we’d be happy to up your account tier if you provide us with an userId
