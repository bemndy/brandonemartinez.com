import './ListeningInsights.css';

/**
 * Number of cells in an ASCII meter. Twelve reads as a bar rather than a
 * handful of blocks, and still fits the mono measure on a phone.
 */
const METER_CELLS = 12;

/**
 * Placeholder analysis of the last month's listening.
 *
 * These are sample values, not real listening data — the section says so in
 * the UI so nothing here reads as a genuine stat. The shape is the point: a
 * later `/api/listening-insights` route can return `{ period, summary, traits }`
 * directly and the markup needs no change.
 *
 * `summary` carries the actual conclusion; the traits below are the evidence
 * for it, not the point of the section. `level` is a 0–1 percentile against
 * the trailing year rather than a raw share, which is what makes a middling
 * tempo reading meaningful: 0.47 says "slightly slower than my usual", where
 * a bare "92 bpm" says nothing without knowing the baseline.
 */
const PERIOD = 'past 30 days';

const SUMMARY =
    'A slow, warm month. Neo-soul and jazz led the rotation, energy stayed low ' +
    'after dark, and there was less appetite for anything loud than usual.';

const TRAITS = [
    { label: 'mood', value: 'warm, unhurried', level: 0.68 },
    { label: 'energy', value: 'low', level: 0.41 },
    { label: 'tempo', value: '92 bpm median', level: 0.47 },
    { label: 'palette', value: 'neo-soul, jazz', level: 0.74 },
];

/**
 * Bare ASCII bar — filled and empty block characters in the mono face, no
 * border, no fill colour, no SVG. Hidden from assistive tech because the
 * reading beside it already carries the same number, and a screen reader
 * reading twelve block glyphs aloud is noise.
 */
function Meter({ level }) {
    const filled = Math.round(level * METER_CELLS);
    return (
        <span className="insights-meter" aria-hidden="true">
            {'█'.repeat(filled)}
            {'░'.repeat(METER_CELLS - filled)}
        </span>
    );
}

/**
 * A read on the last month's listening: one plain-language conclusion, then
 * the four traits it rests on.
 *
 * Deliberately text-and-rules only, to sit alongside the other music sections
 * without competing with them.
 */
function ListeningInsights() {
    return (
        <div className="insights">
            <p className="insights-note">
                Sample analysis — not yet wired to listening data.
            </p>

            {/* The conclusion leads. The meters underneath are supporting
                detail, so they are smaller and dimmer than this line. */}
            <p className="insights-summary">{SUMMARY}</p>

            <div className="insights-rows">
                {TRAITS.map(({ label, value, level }) => (
                    <div className="insights-row" key={label}>
                        <span className="insights-label">{label}</span>
                        <span className="insights-value">{value}</span>
                        <Meter level={level} />
                        <span className="insights-pct">{Math.round(level * 100)}</span>
                    </div>
                ))}
            </div>

            {/* Without this the trailing number is unreadable: 47 out of what,
                measured against whom? */}
            <p className="insights-legend">
                Each bar reads 0–100 for the {PERIOD}, against the trailing year
                of listening.
            </p>
        </div>
    );
}

export default ListeningInsights;
