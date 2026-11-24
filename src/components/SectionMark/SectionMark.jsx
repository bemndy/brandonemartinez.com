import './SectionMark.css';

/**
 * A section header drawn instead of written: a small piece of ASCII art (or
 * any child graphic) beside a lowercase serif caption styled like .section-title.
 *
 * The real heading text still exists for screen readers and the document
 * outline; the art is aria-hidden because box-drawing characters read aloud
 * are noise.
 */
function SectionMark({ title, art, caption, sub, children }) {
    return (
        <div className="smark">
            <h2 className="smark-title">{title}</h2>
            {art && <pre className="smark-art" aria-hidden="true">{art}</pre>}
            {children}
            <div className="smark-caption" aria-hidden="true">
                <span className="smark-caption-main">{caption}</span>
                {sub && <span className="smark-caption-sub">{sub}</span>}
            </div>
        </div>
    );
}

export default SectionMark;
