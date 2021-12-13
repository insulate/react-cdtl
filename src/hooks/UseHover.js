import React from 'react';

function useHover() {
    const [hover, setHover] = React.useState(false);

    function mouseOver() {
        setHover(true);
    }
    function mouseOut() {
        setHover(false)
    }

    return [hover, mouseOver, mouseOut]
}

export default useHover