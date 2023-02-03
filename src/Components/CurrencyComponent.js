import './CurrencyComponent.css'

const CurrencyComponent = (props) => {

    const { currencyChoice, selectCurrency } = props //รับ props ตามชื่อที่ตั้ง

    return (
        <div className="currency">
            <select value={selectCurrency}>
                {currencyChoice.map((choice) =>
                    <option key={choice} value={choice}>{choice}</option>
                )}
            </select>
            <input type="number" />
        </div>
    )
}


export default CurrencyComponent