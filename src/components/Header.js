import React from 'react'
import Logo from './Logo';
import Title from '../styles/title/Title';
import { Button } from '../styles/button/Button';

const Header = () => {
    let companyName = 'CCT';
    const companyAddress = <p>Udon</p>
    let num = 10;
    const showMessage = () => {
        return companyName + '.com'
    }
    const isLogin = false;
    const showMe = () => {
        alert('Hello React')
    }
    const products = [
        { id: 1, name: 'Coke' },
        { id: 2, name: 'Pepsi' }
    ]

    return (
        <>
            <Title>Hello React</Title>
            <h1>บริษัท {companyName}</h1>
            {companyAddress}
            {num + 100} <br />
            {showMessage()}
            {/* {isLogin && <p>ยินดีต้อนรับ</p>} ด้านล่างหมายถึง if(isLogin === true) */}
            {
                isLogin === true && (
                    <>
                        <p>ยินดีต้อนรับ</p>
                        <p>ยินดีต้อนรับ 2</p>
                    </>
                )
            }
            <br />
            {/* if else */}
            {
                isLogin ? <Logo /> : 'ไม่มีสิทธิดู logo'
            }
            <br />
            <Button primary onClick={showMe}>ClickMe</Button>
            <br />
            <ul>
                {
                    products.map((product, index) => {
                        return (
                            <li key={product.id}>{product.name} {index + 1}</li>
                        )
                    })
                }
            </ul>
            <hr />
        </>
    )
}

export default Header
