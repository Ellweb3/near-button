import React from 'react'
import { useEffect, useState } from 'react'
import * as nearAPI from 'near-api-js';
const { providers, utils, keyStores, KeyPair } = nearAPI
import getConfig from './config.js';
import { Button, Text, View, StyleSheet } from 'react-native'


const NearButton = (props) => {
	const {iconIn, iconOut, signInTitle, signOutTitle, backgroundColor, onConnect, netType, contractName } = props
	const [connect, setConnect] = useState(null)
	const [nfts, setNfts] = useState([])
	const [user, setUser] = useState(null)
	const [action, setAction] = useState(null)

	
if (connect && connect.currentUser && !action) {
	let balance = +connect.currentUser.balance
	let userId = connect.currentUser.accountId.toString()
	console.log(userId);
	onConnect(balance,userId)
	setAction(1)
}
	useEffect(() => {

		const fetchData = async () => {
			const configParametr = {
				env: process.env.NODE_ENV || netType,
				contractName: contractName,
				netType: netType
			}
			const nearConfig = getConfig(configParametr);
			console.log('conf', process.env.NODE_ENV);
			// const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
			const keyStore = new keyStores.InMemoryKeyStore()
			const accessKey = KeyPair.fromRandom('ed25519')
			
			console.log('access', accessKey.toString());
			const keyPair = KeyPair.fromString(accessKey.toString())
			await keyStore.setKey(netType, contractName, keyPair)




			const near = await nearAPI.connect({ keyStore, ...nearConfig });
			const walletConnection = new nearAPI.WalletConnection(near);
			let currentUser;

			if (walletConnection.getAccountId()) {
				currentUser = {
					accountId: walletConnection.getAccountId(),
					balance: (await walletConnection.account().state()).amount,
				};
			}
			const contract = await new nearAPI.Contract(
				walletConnection.account(),
				nearConfig.contractName,
				{
					viewMethods: ['getAllNFTsByOwner'],
					changeMethods: ['mintNewNFT',],
					sender: walletConnection.getAccountId(),
				}
			);
			
			// (async () => {
			// 	const account_id = 'one.nfts.testnet';
			// 	const { code_base64 } = await near.connection.provider.query({
			// 	  account_id,
			// 	  finality: 'final',
			// 	  request_type: 'view_code',
			// 	});
			  
			// 	console.log("parse contract",parseContract(code_base64));
			//   })();

			setConnect({ contract, currentUser, nearConfig, walletConnection, near })
			if (currentUser) {
	console.log("accoundID", currentUser.accountId);
	setUser(+currentUser.balance, currentUser.accountId )
	onConnect(user)
}

		}
		fetchData().then(() => {
			console.log("fetch");
		})
	}, [])
	const signIn = async () => {
		await connect.walletConnection.requestSignIn(
		  connect.contract.accountId,
		  null, //optional URL to redirect to if the sign in was successful
		  null //optional URL to redirect to if the sign in was NOT successful
		);
		console.log("in");
		setAction(null)
	  };
	
	  const signOut = () => {
		  console.log("signOut",connect);
		connect.walletConnection.signOut();
		window.location.replace(window.location.origin + window.location.pathname);
		console.log("out");
		onConnect(null,0)
	  };
	  

	if (connect !== null ) {
		console.log("if connect0",connect);
		// if (connect.currentUser){
		// onConnect(connect.currentUser.balance, connect.currentUser.accountId )
		// }

	return(
		<View>
      {connect.currentUser? <Button  
      icon={iconOut?iconOut:null}
	  color={backgroundColor}
      title={signOutTitle} 
      onPress={signOut}></Button>:
	  <Button  
      icon={iconIn?iconIn:null}
	  color={backgroundColor}
      title={signInTitle} 
      onPress={signIn}></Button>}
    </View>
  )
} else {
	return (
		<p>"Loading"</p>
	)
}
}



export default NearButton
