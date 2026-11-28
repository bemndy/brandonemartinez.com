import './WeekInSound.css';

/**
 * Number of cells in an ASCII meter. Twelve reads as a bar rather than a
 * handful of blocks, and still fits the mono measure on a phone.
 */
const METER_CELLS = 12;

/** Eight heights of block, lowest to tallest, for the listening clock. */
const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const PERIODS = [
    { name: 'night', from: 22, to: 4, line: 'Mostly a night listener' },
    { name: 'morning', from: 5, to: 11, line: 'Mostly a morning listener' },
    { name: 'afternoon', from: 12, to: 16, line: 'Mostly an afternoon listener' },
    { name: 'evening', from: 17, to: 21, line: 'Mostly an evening listener' },
];

/**
 * The week's mood, in one word.
 *
 * A headline over the reads below rather than a sixth read: the sentences in
 * `conclusions` each state the number they rest on, and this is the label that
 * sits on top of them. It is derived from the same stats the rest of the
 * section already has — nothing extra is fetched, and nothing is guessed from
 * data that isn't here (there is no tempo or energy in this payload, so no
 * mood here claims any).
 *
 * Ordered rather than scored: the first rule that matches wins. A week that is
 * both nocturnal and repetitive reads as nocturnal, which is the more unusual
 * of the two and so the more worth saying. The thresholds are the ones
 * `conclusions` already leans on, so the headline cannot contradict the
 * sentences underneath it.
 *
 * The last entry matches unconditionally — this always returns a word.
 */
const MOODS = [
    { name: 'nocturnal', when: s => s.nightRate >= 0.4 },
    { name: 'on a loop', when: s => s.repeatRate >= 0.35 },
    { name: 'one artist deep', when: s => s.topArtist && s.topArtist.plays / s.plays >= 0.4 },
    { name: 'restless', when: s => s.distinctArtists / s.plays >= 0.5 },
    { name: 'steady', when: () => true },
];

/** Characters in the rule between the label and the mood. */
const MOOD_RULE_CELLS = 4;

const moodFor = stats => MOODS.find(m => m.when(stats)).name;

const inPeriod = (h, { from, to }) => (from <= to ? h >= from && h <= to : h >= from || h <= to);
const pad = (h) => String(h).padStart(2, '0');

/**
 * Turn the week's raw counts into a few plain-language conclusions. Each one
 * states the number it rests on, so nothing reads as a guess.
 */
function conclusions(stats) {
    const { plays, distinctTracks, distinctArtists, topArtist, repeatRate, hours } = stats;
    const lines = [];

    const period = PERIODS
        .map(p => ({ ...p, n: hours.reduce((s, c, h) => s + (inPeriod(h, p) ? c : 0), 0) }))
        .sort((a, b) => b.n - a.n)[0];
    if (period.n / plays >= 0.4) {
        lines.push(`${period.line}: ${Math.round((period.n / plays) * 100)}% of plays land between ${pad(period.from)}:00 and ${pad(period.to)}:59.`);
    }

    if (repeatRate >= 0.35) {
        lines.push(`On repeat. ${Math.round(repeatRate * 100)}% of plays were songs already played this week.`);
    } else if (distinctArtists / plays >= 0.5) {
        lines.push(`Wandering. ${distinctArtists} different artists across ${plays} plays, with little repetition.`);
    } else {
        lines.push(`A steady rotation of ${distinctTracks} songs from ${distinctArtists} artists.`);
    }

    if (topArtist && topArtist.plays >= 3) {
        lines.push(`Leaning on ${topArtist.name}: ${topArtist.plays} of ${plays} plays.`);
    }

    return lines;
}

/**
 * Bare ASCII bar — filled and empty block characters in the mono face, no
 * border, no fill colour, no SVG. Hidden from assistive tech because the
 * percentage beside it already carries the same number.
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
 * Listening clock: one block per hour of the day, height scaled to the
 * busiest hour. Empty hours are a dot, so the baseline still shows.
 */
function ListeningClock({ hours }) {
    const max = Math.max(...hours, 1);
    const busiest = hours.indexOf(Math.max(...hours));
    return (
        <figure className="wis-clock">
            <div className="wis-clock-bars" role="img" aria-label={`Plays by hour of day, busiest around ${pad(busiest)}:00.`}>
                {hours.map((count, h) => (
                    <span
                        key={h}
                        className={`wis-clock-bar${h === busiest ? ' is-peak' : ''}`}
                        title={`${pad(h)}:00 · ${count} play${count === 1 ? '' : 's'}`}
                    >
                        {count === 0 ? '·' : BLOCKS[Math.min(BLOCKS.length - 1, Math.ceil((count / max) * BLOCKS.length) - 1)]}
                    </span>
                ))}
            </div>
            <div className="wis-clock-axis" aria-hidden="true">
                <span>00</span><span>06</span><span>12</span><span>18</span><span>23</span>
            </div>
            <figcaption className="wis-clock-caption">when the week was played · philadelphia time</figcaption>
        </figure>
    );
}

/**
 * What the past week of listening says, in a few sentences, a listening clock
 * and three meters. Fed by /api/recent-tracks (via the Music page) so it
 * always describes the same plays as the track list above it.
 */
function WeekInSound({ stats }) {
    if (!stats) {
        return (
            <p className="wis-note">
                The breakdown fills in once this week&apos;s plays come through.
            </p>
        );
    }

    const meters = [
        { label: 'repeat', value: 'replayed songs', level: stats.repeatRate },
        { label: 'variety', value: `${stats.distinctArtists} artists`, level: stats.distinctArtists / stats.plays },
        { label: 'late', value: '22:00 – 04:59', level: stats.nightRate },
    ];

    return (
        <div className="wis">
            <p className="wis-mood">
                <span className="wis-mood-label">mood</span>
                <span className="wis-mood-rule" aria-hidden="true">{'\u2500'.repeat(MOOD_RULE_CELLS)}</span>
                <span className="wis-mood-name">{moodFor(stats)}</span>
            </p>
            <ul className="wis-reads">
                {conclusions(stats).map(line => <li key={line}>{line}</li>)}
            </ul>
            <ListeningClock hours={stats.hours} />
            <div className="wis-rows section-list">
                {meters.map(({ label, value, level }) => (
                    <div className="wis-row" key={label}>
                        <span className="wis-label">{label}</span>
                        <span className="wis-value">{value}</span>
                        <Meter level={level} />
                        <span className="wis-pct">{Math.round(level * 100)}</span>
                    </div>
                ))}
            </div>
            <p className="wis-note">Based on the last {stats.plays} plays from the past 7 days.</p>
        </div>
    );
}

export default WeekInSound;
