# Adalo base custom component "near-button"

This is custom component for connection with any contract in Near Protocol Blockchain.

## Install

1. Code instructions
  - clone repo
  - set your own name, author and version of Component in package.json
  - install dependencies
    - `yarn`
  - login to Adalo [Adalo dev instruction](https://developers.adalo.com/docs/basics/introduction)
    - `npx adalo login`
  - run dev or prod mod
    - `npx adalo dev` or `npx adalo publish`

2. Adalo instructions
- Enable the developer mode in your Adalo profile
- Refresh page
- Find and add your Component library in Profile/Developers/Libraries
- Enjoy

## Usage

### If you have never before use Near blockchain you can learn it here [Near Education](https://near.org/ru/education/)

1. Create a smart contract using Rust or AssemblyScript or get an example contract from [Near Examples](https://examples.near.org/)
2. Build & deploy it with your own account.
3. You need to connect Adalo to contract - you can use my base component [Near Connection](https://github.com/Ellweb3/near-button).
4. Now you can set view methods.
5. Fill free to customize it for your contract

### Notice

Any sign Near operations in Adalo works after publishing only in full screen mode without frames, because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'". Full screen mode works only in prod mode.

## Addition components
1. [Near submit button](https://github.com/Ellweb3/near-submit-button)
2. [Near status](https://github.com/Ellweb3/near-status)
3. [Near View NFT button]()
