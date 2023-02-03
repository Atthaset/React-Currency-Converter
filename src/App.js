import CurrencyComponent from './Components/CurrencyComponent';
import money from './img/money.png'
import { useEffect, useState } from 'react'

function App() {

  const [currencyChoice, setCurrencyChoice] = useState([])
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("THB")

  const url = `https://api.exchangerate-api.com/v4/latest/USD`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())//แปลงสิ่งที่ได้ให้เป็นไฟล์.json เพื่อใช้งานบนหน้าเว็บ
      .then(data => setCurrencyChoice([...Object.keys(data.rates)]))//setCurrencyChoice = ค่าของ Key ใน data.rates //Object.keys เอามาเเค่เฉพาะ Key ไม่ใช่ค่าใน Key
  }, [])//[] เพื่อให้ fetch แค่ครั้งเดียว

  return (
    <div>
      <img src={money} alt="Logo" className="money-img"></img>
      <h1>Convert Currency (API)</h1>
      <div>
        <CurrencyComponent currencyChoice={currencyChoice} selectCurrency={fromCurrency} />
        <div className="equal"> = </div>
        <CurrencyComponent currencyChoice={currencyChoice} selectCurrency={toCurrency} />
      </div>
    </div>
  );
}

export default App;
