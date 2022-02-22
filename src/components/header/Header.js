import './header.css';

function Header (props)  {
    return (
        <>
            <div>RATE OF THE UAH TO THE EUR:<span> {props.EUR}</span></div>
            <div>RATE OF THE UAH TO THE USD:<span> {props.USD}</span></div>
        </>

    )
}

export default Header;