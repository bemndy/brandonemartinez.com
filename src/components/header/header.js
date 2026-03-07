import './Header.css'

function Header() {
    return (
        <>
            <div className='header-wrapper'>
                <div className='header-box'>
                    <div className='header-text'>Contact Me</div>
                    <a className='header-text header-email'
                        href="mailto:brandonprvbox@gmail.com">
                        brandonprvbox@gmail.com
                    </a>
                </div>
            </div>
        </>
    )
}

export default Header