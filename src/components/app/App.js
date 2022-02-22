import './App.css';
import Header from '../header/Header';
import CurrencyInput from '../currencyInput/CurrencyInput';
import {useHttp} from '../../hooks/http.hook';
import {useState, useEffect} from "react";

function App() {

    // Я подумал что сюда не стоит добавлять редакс, т.к. проект небольшой и это бы только усложнило код.
    
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [currency1, setCurrency1] = useState('EUR');
    const [currency2, setCurrency2] = useState('UAH');
    const [index, setIndex] = useState([]);
    const [EUR, setEUR] = useState('');
    const [USD, setUSD] = useState('');
    const {request} = useHttp();

    useEffect(() => {
        request('https://freecurrencyapi.net/api/v2/latest?apikey=b99cca00-93e3-11ec-aa40-d5c1dc947cab')
            .then(response => {
            setIndex(response.data);
        })
        request('https://freecurrencyapi.net/api/v2/latest?apikey=b99cca00-93e3-11ec-aa40-d5c1dc947cab&base_currency=EUR')
        .then(response => {
            setEUR(format(response.data.UAH));
        })
        request("https://freecurrencyapi.net/api/v2/latest?apikey=b99cca00-93e3-11ec-aa40-d5c1dc947cab&base_currency=USD")
        .then(response => {
            setUSD(format(response.data.UAH));
        })
    }, []);

    // useEffect(() => {
    // if (index) {
    //         handleAmount1Change(1);
    //     }
    // },[index]);

    function format(number) {
        return number.toFixed(2);
    }

    function handleAmount1Change(amount1) {
        setAmount2(format(amount1 * index[currency2] / index[currency1]));
        setAmount1(amount1);
    }

    function handleCurrency1Change(currency1) {
        setAmount2(format(amount1 * index[currency2] / index[currency1]));
        setCurrency1(currency1);
    }

    function handleAmount2Change(amount2) {
        setAmount1(format(amount2 * index[currency1] / index[currency2]));
        setAmount2(amount2);
    }

    function handleCurrency2Change(currency2) {
        setAmount1(format(amount2 * index[currency1] / index[currency2]));
        setCurrency2(currency2);
    }

    return (
        <div className="App">
            <Header EUR={EUR} USD={USD}/>
            <div className="wrapper">
                <CurrencyInput
                onAmountChange={handleAmount1Change}
                onCurrencyChange={handleCurrency1Change}
                currencies={Object.keys(index)}
                amount={amount1}
                currency={currency1} />
            <CurrencyInput
                onAmountChange={handleAmount2Change}
                onCurrencyChange={handleCurrency2Change}
                currencies={Object.keys(index)}
                amount={amount2}
                currency={currency2} />
            </div>
        </div>
    );
}

export default App;
