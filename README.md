# Bourse
Bourse is a Stock Exchange app built with [React](https://reactjs.org/), [Redux](https://redux.js.org/) and [D3](https://d3js.org/) that displays the randomly generated Stock Market indexes of CAC40 and NASDAQ.

## Getting Started

### Server side

Once you cloned the repository, you need to install the npm packages first:
```sh
cd server/
yarn
```

Then start the server:
```sh
yarn start
```

Then open [http://localhost:5000/](http://localhost:5000/) to check that your server is running. You should get something like this:
```sh
{"timestamp":1512039028531,"index":1,"stocks":{"NASDAQ":15.36050005263918,"CAC40":135.23506891562675}}
```

### Client side

Install the npm packages first:
```sh
cd ../ui/
yarn
```

To run the tests: 
```sh
yarn test
```

Then start your server:
```sh
yarn start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

## Technologies

### Server side

- Node.js

### Client side

- Jest
- Enzyme
- React
- Redux
- D3
- CSS Modules
- Webpack

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).