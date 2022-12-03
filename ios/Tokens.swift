//
//  Tokens.swift
//  boilerapp
//
//  Created by Vasileios  Gkreen on 03/12/22.
//

import Foundation
import BigInt
import web3swift
import Core

@objc(Tokens)
class Tokens: RCTEventEmitter {
  
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    return ["onTokensBalances"]
  }
  

  
  @objc
  func get(_ tokens: [String], address: String) -> Void {
    Task {
      await get(tokens:tokens, for: address)
    }
  }
  
  func get(tokens: [String], for address: String) async -> Void {
          
    let provider = await Web3(provider: Web3HttpProvider(
      URL(string: "https://polygon-mainnet.g.alchemy.com/v2/c2UXl9xyDGsmFW8yLal1KpwNsU5kgrrz")!,
      network: .Custom(networkID: 137))!
    )
    
    var balances: [String] = []
    let walletAddress = EthereumAddress(address)!
    
    for token in tokens {
      let contractAddress = EthereumAddress(token)!
      let contract = provider.contract(Web3.Utils.erc20ABI, at: contractAddress, abiVersion: 2)
      let op = contract?.createReadOperation("balanceOf", parameters: [walletAddress] as [AnyObject])
      op?.transaction.from = walletAddress
      let response = try? await op?.callContractMethod()
      guard let tokenBalance = response?["0"] as? BigUInt else { continue }
      balances.append(String(tokenBalance))
    }
    
    sendEvent(withName: "onTokensBalances", body: ["tokenBalances": balances])
  }
}




