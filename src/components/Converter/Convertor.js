import './Convertor.scss';
import { useState, useEffect } from 'react';
import { Block } from './Block';

function Convertor() {
  const [rates, setRates] = useState({});
  // const [fromCurrency, setFromCurrency] = useState('USD');
  // const [toCurrency, setToCurrency] = useState('RUB');
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [rub, setRub] = useState(0);

  // https://cdn.cur.su/api/latest.json
  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then(res => res.json())
    .then(json => {
      // console.log(json.rates, typeof json.rates);
      setRates(json.rates);

      setRub(json.base);
    })
    .catch(err => console.log(`Произошла ошибка: ${err.message}`))
  }, []);

  // левый инпут
  const onChangeFromPrice = (value) => {
    let res;
    if (fromCurrency === 'RUB') {
      res = value * rates[toCurrency];
    } else if (toCurrency === 'RUB') {
      res = value / rates[fromCurrency];
    } else {
      res = (value * rates[fromCurrency]) / rates[toCurrency];
    }
    setToPrice(res);
    setFromPrice(value);
  }

  // правый инпут
  const onChangeToPrice = (value) => {
    let res;
    if (toCurrency === 'RUB') {
      res = value * rates[fromCurrency];
    } else if (fromCurrency === 'RUB') {
      res = value / rates[toCurrency];
    } else {
      res = (value * rates[toCurrency]) / rates[fromCurrency];
    }
    setFromPrice(res);
    setToPrice(value);
  }

  // сброс предыдущих значений
  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency, fromPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency, toPrice]);

  useEffect(() => {
    if (fromCurrency === toCurrency) {
      onChangeFromPrice(0);
      onChangeToPrice(0);
    }
  }, [fromCurrency, toCurrency])

  return (
    <div className="Convertor">
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default Convertor;