import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import lottery from './lottery'
import web3 from './web3';


const App = () => {

  const [balance,setbalance] = useState("")
  const [manager,setManager] = useState("")
  const [players,setPlayers] = useState([])
  const [value,setValue] = useState("")
  const [message,setMessage] = useState("")

  useEffect(()=>{
    getManagerAddress()
  },[])

  const getManagerAddress = async () => {
    const manager = await lottery.methods.manager().call()
    const players =  await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
    setManager(manager)
    setPlayers(players)
    setbalance(balance)
  }

  const fromWei = (weiValue,unit) => {
    return web3.utils.fromWei(weiValue,unit)
  }
  const toWei = (value,unit) => {
    return web3.utils.toWei(value,unit)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage("Waiting on transacton success...")

    const accounts = await web3.eth.getAccounts()

    await lottery.methods.enter().send({
      from:accounts[0],
      value: toWei(value,'ether')
    })

    setMessage("You have been entered!")
  }

  const handlePickWinner = async () => {
    setMessage("Waiting on transacton success...")
    const accounts = await web3.eth.getAccounts()

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    setMessage("A winner has been picked!")
  }


  return (
   <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}. 
        There are currently {players.length} people entered, competing to wind {fromWei(balance,'ether')} ether
      </p>
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={(e)=>{
              setValue(e.target.value)
            }}
          />
        </div>
        <button>
          Enter
        </button>
      </form>

      <hr />

      <h4>Ready to pick a winner?</h4>
      <button onClick={handlePickWinner}>Pick  a winner!</button>

      <hr/>
      <h4>{message}</h4>
   </div>
  );
}

export default App;
