import React from 'react'
import Logo from './Logo';

const Header = () => {
    let companyName = 'CCT';
    const companyAddress = <p>Udon</p>
    let num = 10;
    const showMessage = () => {
        return companyName + '.com'
    }
    const isLogin = false;

    return (
        <>
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
            {/* if else */}
            {
                isLogin ? <Logo /> : 'ไม่มีสิทธิดู logo'
            }
            <hr />
        </>
    )
}

export default Header
