# Contribution

## Prerequisites

You need to have installed package manager `yarn`.

## Development

* #### ⚙️ Install dependencies

    ```sh
    yarn bootstrap
    ```

* #### 🔎 Watch source changes

    Start watcher that check for changes and transpiles typescript into javascript

    ```sh
    yarn onchange
    ```

    Start watcher that checks using correct types in code

    ```sh
    yarn type-check:watch
    ```

    > Note: You can read about reaason why transpilation and type checking is separated [in the article](https://iamturns.com/typescript-babel/).

* #### ✅ Check tests pass

    When doing changes, be sure that all tests still pass.

    ```sh
    yarn test:watch
    ```

---

## Release process

This is a guide for those responsible for publishing new package versions.

* #### ⬆️ Bump package version
    ```sh
    yarn release
    ```

    * Choose correct version of each changed package and confirm
    * New commit will be created, tagged and pushed to the repository 

* #### 🚀 Package is published automatically from CI server

    Travis publish packages to npm registry for us, you can check it at [builds history](https://travis-ci.com/AckeeCZ/resizin-js/builds).
