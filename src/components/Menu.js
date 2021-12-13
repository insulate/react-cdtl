import React from 'react'
import useHover from '../hooks/UseHover'

const Menu = () => {
    // without custom hook
    // const [hover, setHover] = React.useState(false);
    // const mouseOver = () => {
    //     setHover(true);
    // }
    // function mouseOut() {
    //     setHover(false)
    // }
    const [hover, mouseOver, mouseOut] = useHover();

    return (
        <div>
            <h1>Menu</h1>
            {
                hover ? <h3>Main Menu</h3> : null
            }
            <img onMouseOver={mouseOver} onMouseOut={mouseOut} src='./logo192.png' />
        </div>
    )
}

export default Menu
