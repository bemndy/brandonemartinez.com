import { Link } from 'react-router-dom';
import { FlipLink } from '../components/LinkWrap/LinkWrap';
import './NotFound.css'

function NotFound () {
    return (
        <>
        <div className="not-found-wrapper">
            <div className="not-found-code">404</div>
            <div className="not-found-message">this page doesn't exist</div>
            <Link to="/" className="not-found-link">
                <FlipLink>back home</FlipLink>
            </Link>
        </div>
        </>
    )
};
export default NotFound
