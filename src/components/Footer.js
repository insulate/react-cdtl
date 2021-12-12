import React from 'react'
import propTypes from 'prop-types'

const Footer = ({ title, website, postCode, isOpen }) => {
    // const { title, website, postCode } = props;
    return (
        <div>
            <h3>{title} &copy; {new Date().getFullYear()}</h3>
            <p>{website} {postCode} isOpen: {isOpen.toString()}</p>
        </div>
    )
}

Footer.propTypes = {
    title: propTypes.string,
    website: propTypes.string,
    postCode: propTypes.number,
    isOpen: propTypes.bool
}

export default Footer
