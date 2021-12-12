import React from 'react'
import propTypes from 'prop-types'

const Footer = ({ title, website, postCode, isOpen }) => {
    // const { title, website, postCode } = props;
    return (
        <div>
            <h3 style={styles.title}>{title} &copy; {new Date().getFullYear()}</h3>
            <p style={{ color: 'green', fontSize: 16 }}>{website} {postCode} isOpen: {isOpen.toString()}</p>
            <p style={styles.title}>Coding Thailand</p>
        </div>
    )
}

const styles = {
    title: {
        color: 'yellow',
    }
}

Footer.propTypes = {
    title: propTypes.string,
    website: propTypes.string,
    postCode: propTypes.number,
    isOpen: propTypes.bool
}

export default Footer
