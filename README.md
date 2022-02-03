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
3. Now you can connect to your contract.
5. Fill free to customize it for your contract

### Example video
[Usage video](https://www.loom.com/share/86d99d35861f4b92800fd069e772ec1c)
### Notice

Any sign Near operations in Adalo works after publishing - `npx adalo publish`, only in full screen mode without frames, because an ancestor violates the following Content Security Policy directive: "frame-ancestors 'none'". Full screen mode works only in prod mode.

## Addition components
1. [Near submit button](https://github.com/Ellweb3/near-submit-button)
2. [Near status](https://github.com/Ellweb3/near-status)
3. [Near View NFT button](https://github.com/Ellweb3/near-view-nft)
