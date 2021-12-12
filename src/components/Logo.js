import React from 'react'

const Logo = () => {
    const logoImage = {
        url: './logo192.png'
    }
    return (
        <div>
            {/* <img src='./logo192.png' width="100" alt="logo" /> */}
            <img src={logoImage.url} width="100" alt="logo" />
        </div>
    )
}

export default Logo
