# @featurescope/react-sdk

Featurescope ...

React SDK for [featurescope](https://www.featurescope.io "featurescope").

## Installation

```sh
npm install @featurescope/react-sdk

# or ...

yarn add @featurescope/react-sdk
```

## Setup

In order to use the featurescope React SDK, you'll also have to create a featurescope account.

Visit [featurescope.io](https://www.featurescope.io "featurescope.io") and register for a new account.

Next, follow the [quickstart instructions](https://www.featurescope.io/quickstart "quickstart instructions") to get setup on featurescope. These steps will walk you through creating your first feature and fetching it with a featurescope SDK.

## Usage

The featurescope React SDK is a thin, React wrapper on top of the featurescope isomorphic Node.js SDK. It exposes a context and a provider, as well as some helpful hooks.

To integrate with the React SDK, include the `FeaturesProvider` as high up in your React root as possible:

```js
import { FeaturesProvider } from "@featurescope/react-sdk"

const App = ({ children }) => {
  return (
    <FeaturesProvider apiKey="<YOUR KEY HERE>">{children}</FeaturesProvider>
  )
}
```

All of the props available to the `FeaturesProvider` are described below. You may use these props to control which feature variations are provided by the `FeaturesContext`.

Next, use your feature in any nested component using the `useFeature` hook:

```js
const Navigation = ({ children }) => {
  const showVerticalLayout = useFeature("showVerticalLayout")
  const styles = {
    display: "flex",
    flexDirection: showVerticalLayout ? "column" : "row",
  }

  return <div styles={styles}>{children}</div>
}
```

Where "showVerticalLayout" is the name of a feature you created while following the setup instructions above.

Additionally, there is a hook that allows you to fetch all features for a given scope, `useFeatures`:

```js
const Navigation = ({ children }) => {
  const { showVerticalLayout } = useFeatures()
  const styles = {
    display: "flex",
    flexDirection: showVerticalLayout ? "column" : "row",
  }

  return <div styles={styles}>{children}</div>
}
```

### Using Context

The `FeaturesContext` is also exported, for ease of use, and in case you prefer to use the legacy context consumer:

```js
import { FeaturesContext } from "@featurescope/react-sdk"

const Navigation = ({ children }) => {
  return (
    <FeaturesContext.Consumer>
      {({ showVerticalLayout }) => {
        const styles = {
          display: "flex",
          flexDirection: showVerticalLayout ? "column" : "row",
        }

        return <div styles={styles}>{children}</div>
      }}
    </FeaturesContext.Consumer>
  )
}
```

### Provider Props

Here are all of the available props on the `FeaturesProvider`:

| name            | description                                                                                                                                          | type           | default                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------- |
| apiKey          | The key to use to connect to the featurescope API.                                                                                                   | string \| null | null                          |
| apiUrl          | The URL of the featurescope API. Mainly used for testing purposes.                                                                                   | string         | "https://www.featurescope.io" |
| children        | React children                                                                                                                                       | React.node     | undefined                     |
| defaultFeatures | Default values to provide for any potential features. If the API does not return a matching feature by name, then these values will not be replaced. | Features       | {}                            |
| demographics    | Demographics inform the API which feature variations should be served.                                                                               | Demographics   | {}                            |
| featureIds      | A list of features to which the providers should be limited.                                                                                         | Array<string>  |                               |
| scope           | The scope of features which should be loaded by the SDK.                                                                                             | string         | "\_"                          |
