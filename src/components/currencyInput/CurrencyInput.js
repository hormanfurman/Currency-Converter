import './currencyInput.css';

function CurrencyInput(props) {

    return (
        <div className="group">
            <input placeholder="ENTER THE NUMBER" type="number" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
            <select value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
            {props.currencies.map((currency => (
                <option key={currency} value={currency}>{currency}</option>
            )))}
            </select>
        </div>  
    );
}

export default CurrencyInput;