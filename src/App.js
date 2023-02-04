import CurrencyComponent from './Components/CurrencyComponent';
import money from './img/money.png'
import { useEffect, useState } from 'react'

function App() {

  const [currencyChoice, setCurrencyChoice] = useState([])
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("THB")

  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState(0)

  const [checkFromCurrency, setCheckFromCurrency] = useState(true)
  let fromAmount, toAmount

  if (checkFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  }
  else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  const amountFromCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFromCurrency(true)
  }

  const amountToCurrency = (e) => {
    setAmount(e.target.value)
    setCheckFromCurrency(false)
  }

  useEffect(() => {
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}` //set ค่าเริ่มต้นเป็น fromCurrency
    fetch(url)
      .then(res => res.json())//แปลงสิ่งที่ได้ให้เป็นไฟล์.json เพื่อใช้งานบนหน้าเว็บ
      .then(data => {
        setCurrencyChoice([...Object.keys(data.rates)])//setCurrencyChoice = ค่าของ Key ใน data.rates //Object.keys เอามาเเค่เฉพาะ Key ไม่ใช่ค่าใน Key
        setExchangeRate(data.rates[toCurrency])
      })
  }, [fromCurrency, toCurrency])//[] เพื่อให้ fetch เมื่อเกิดการเปลี่ยนแปลงใน fromCurrency

  return (
    <div>
      <img src={money} alt="Logo" className="money-img"></img>
      <h1>Convert Currency (API)</h1>
      <div>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={fromCurrency}
          changeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={amountFromCurrency} />
        <div className="equal"> = </div>
        <CurrencyComponent
          currencyChoice={currencyChoice}
          selectCurrency={toCurrency}
          changeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={amountToCurrency} />
      </div>
    </div>
  );
}

export default App;
