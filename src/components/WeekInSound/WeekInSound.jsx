import './WeekInSound.css';

/**
 * Number of cells in an ASCII meter. Twelve reads as a bar rather than a
 * handful of blocks, and still fits the mono measure on a phone.
 */
const METER_CELLS = 12;

/**
 * Placeholder insights.
 *
 * These are sample values, not real listening data — the section is labelled
 * as such in the UI so nothing here reads as a genuine stat. The shape is the
 * point: `{ label, value, level }` is what a later `/api/listening-insights`
 * route can return directly, with `level` a 0–1 fraction the meter renders and
 * `value` the human-readable summary beside it. Swapping the constant for a
 * fetch should not need any markup changes.
 */
const INSIGHTS = [
    { label: 'mood', value: 'mellow', level: 0.68 },
    { label: 'energy', value: 'low–mid', level: 0.41 },
    { label: 'tempo', value: '92 bpm median', level: 0.47 },
    { label: 'genre', value: 'neo-soul', level: 0.74 },
];

/**
 * Bare ASCII bar — filled and empty block characters in the mono face, no
 * border, no fill colour, no SVG. Hidden from assistive tech because the
 * percentage beside it already carries the same number, and a screen reader
 * reading twelve block glyphs aloud is noise.
 */
function Meter({ level }) {
    const filled = Math.round(level * METER_CELLS);
    return (
        <span className="wis-meter" aria-hidden="true">
            {'█'.repeat(filled)}
            {'░'.repeat(METER_CELLS - filled)}
        </span>
    );
}

/**
 * A compact summary of the past week's listening, as four labelled meters.
 *
 * Deliberately text-and-rules only, to sit alongside the other music sections
 * without competing with them.
 */
function WeekInSound() {
    return (
        <div className="wis">
            <p className="wis-note">
                Sample values — not yet wired to listening data.
            </p>
            <div className="wis-rows">
                {INSIGHTS.map(({ label, value, level }) => (
                    <div className="wis-row" key={label}>
                        <span className="wis-label">{label}</span>
                        <span className="wis-value">{value}</span>
                        <Meter level={level} />
                        <span className="wis-pct">{Math.round(level * 100)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WeekInSound;
