# Microfrontend-Blueprint

Frontend template for creating a new host webapp with guest microfrontends.

Please read the Wiki documentation for more information about the basic concepts:
[Raisin Wiki Page: Frontend Composition Strategy](https://raisin-jira.atlassian.net/wiki/x/TABOGQ)

# Tutorial

Technologies used

- Yarn
- Recoil
- React Hooks
- Webpack
- Webpack Module Federation

## Getting Started

1 - Clone the _Microfrontend Blueprint_ repository:

```
$ git clone git@gitlab.raisin.systems:frontend/tools/microfrontend-blueprint.git
```

2 - Install the depencies (Remember to use Yarn instead of NPM, to avoid conflicts):

```
$ cd microfrontend-blueprint
$ yarn install
```

3 - Create a `.env` file to store the environment variables:

```
$ touch .env
```

```
// .env

// The port will define where your application will run locally, make sure to use a unique port to avoid conflicts across applications.

PORT=3000
```

## Exposing a component

For instance in this tutorial we are going to create a button that will be exposed/shared across other applications.

1- Create a new button:

```
// src

$ mkdir components && mkdir button && touch index.js
```

```
// src/components/button/index.js

import React from "react";

export const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);
```

2 - Expose the button:

```
//  webpack/webpack.config.js

const webpackBaseConfig = {
    ...otherWebpackConfigs,

  plugins: [
    new ModuleFederationPlugin({
      exposes: {
        "./Button": "./src/component/button",
      },
    }),
  ],

};

```
