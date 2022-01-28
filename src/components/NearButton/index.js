import React from 'react'
import { useEffect, useState } from 'react'
import * as nearAPI from 'near-api-js';
import { parseContract } from 'near-contract-parser';
import getConfig from './config.js';
import { Button, Text, View, StyleSheet } from 'react-native'
const { keyStores, KeyPair } = nearAPI


const NearButton = (props) => {
	const { iconIn, iconOut, signInTitle, signOutTitle, backgroundColor, onConnect, netType, contractName, contractMethods, addMethod } = props
	const [connect, setConnect] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const configParametr = {
				env: process.env.NODE_ENV || netType,
				contractName: contractName,
				netType: netType
			}
			const nearConfig = getConfig(configParametr);
			const keyStore = new keyStores.InMemoryKeyStore()
			const accessKey = KeyPair.fromRandom('ed25519')
			const keyPair = KeyPair.fromString(accessKey.toString())
			await keyStore.setKey(netType, contractName, keyPair)

			const near = await nearAPI.connect({ keyStore, ...nearConfig });
			const walletConnection = new nearAPI.WalletConnection(near);
			let currentUser;

			if (walletConnection.getAccountId()) {
				currentUser = {
					accountId: walletConnection.getAccountId(),
					balance: (await walletConnection.account().state()).amount/1e24,
				};
			}
			const account_id = nearConfig.contractName
			const { code_base64 } = await near.connection.provider.query({
				account_id,
				finality: 'final',
				request_type: 'view_code',
			});
			const parsedContract = await parseContract(code_base64);
			console.log(parsedContract.methodNames);
			const contract = await new nearAPI.Contract(
				walletConnection.account(),
				nearConfig.contractName,
				{
					viewMethods: parsedContract.methodNames,
					changeMethods: [],
					sender: walletConnection.getAccountId(),
				}
			);
			if (contractMethods&&contractMethods.length == 0) {
						parsedContract.methodNames.map((method) => {
							addMethod(method)
						})
			}
			return { contract, currentUser, nearConfig, walletConnection, near }
		}

		fetchData().then(async ({ contract, currentUser, nearConfig, walletConnection, near }) => {
			setConnect({ contract, currentUser, nearConfig, walletConnection, near })
			global.nearConnect = { contract, currentUser, nearConfig, walletConnection, near }
console.log(await global.nearConnect);
			return true
		}
		).then(async (res) => {
			let promise = new Promise((resolve, reject) => {
				setTimeout(() => resolve("get global"), 200)
			});

			let resultPromise = await promise;
			if (resultPromise && global.nearConnect.currentUser) {
				


				let balance = global.nearConnect.currentUser.balance
				let userId = global.nearConnect.currentUser.accountId.toString()
				if (onConnect && balance && userId) {
					onConnect(Number(balance), userId, "json")
				}
			}
		})
	}, [])

	const signIn = async () => {
		await connect.walletConnection.requestSignIn(
			connect.contract.accountId,
			null, //optional URL to redirect to if the sign in was successful
			null //optional URL to redirect to if the sign in was NOT successful
		);
		console.log("in");
	};

	const signOut = () => {
		console.log("signOut", connect);
		connect.walletConnection.signOut();
		window.location.replace(window.location.origin + window.location.pathname);
		console.log("out");
		if (onConnect) {
			onConnect(0, "")
		}
	};

	if (connect) {
		return (
			<View>
				{connect.currentUser ? <Button
					icon={iconOut ? iconOut : null}
					color={backgroundColor}
					title={signOutTitle}
					onPress={signOut}></Button> :
					<Button
						icon={iconIn ? iconIn : null}
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
