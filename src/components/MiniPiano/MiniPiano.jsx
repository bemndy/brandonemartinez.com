import { useCallback, useEffect, useRef, useState } from 'react';
import './MiniPiano.css';

/*
 * One playable octave (C4 to C5), drawn as thin outlines to sit in the page's
 * line-art style.
 *
 * Sound is synthesised, not sampled: a triangle wave with a quiet sine an
 * octave up, through a low-pass, with a fast attack and a long exponential
 * decay. That's enough to read as a soft felt piano without shipping any
 * audio files. The AudioContext is created on the first press, since browsers
 * won't start audio before a user gesture.
 *
 * Computer-key shortcuts follow the usual DAW layout (A S D F G H J K on the
 * white keys, W E T Y U on the black ones). They only fire while the keyboard
 * has focus, so they never take over typing elsewhere on the page.
 */
const WHITE = [
    { note: 'C4', freq: 261.63, key: 'a' },
    { note: 'D4', freq: 293.66, key: 's' },
    { note: 'E4', freq: 329.63, key: 'd' },
    { note: 'F4', freq: 349.23, key: 'f' },
    { note: 'G4', freq: 392.0, key: 'g' },
    { note: 'A4', freq: 440.0, key: 'h' },
    { note: 'B4', freq: 493.88, key: 'j' },
    { note: 'C5', freq: 523.25, key: 'k' },
];

// `after` is the index of the white key the black key sits to the right of.
const BLACK = [
    { note: 'C#4', freq: 277.18, key: 'w', after: 0 },
    { note: 'D#4', freq: 311.13, key: 'e', after: 1 },
    { note: 'F#4', freq: 369.99, key: 't', after: 3 },
    { note: 'G#4', freq: 415.3, key: 'y', after: 4 },
    { note: 'A#4', freq: 466.16, key: 'u', after: 5 },
];

const ALL = [...WHITE, ...BLACK];
const BY_KEY = Object.fromEntries(ALL.map(k => [k.key, k]));

const DECAY_S = 1.6;
const PRESS_MS = 160;

function MiniPiano() {
    const ctxRef = useRef(null);
    const [pressed, setPressed] = useState(() => new Set());

    const play = useCallback(({ note, freq }) => {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!ctxRef.current) ctxRef.current = new AudioCtx();
        const ctx = ctxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        const t = ctx.currentTime;
        const out = ctx.createGain();
        out.gain.setValueAtTime(0.0001, t);
        out.gain.exponentialRampToValueAtTime(0.22, t + 0.006);
        out.gain.exponentialRampToValueAtTime(0.0001, t + DECAY_S);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(freq * 6, t);
        filter.frequency.exponentialRampToValueAtTime(freq * 1.5, t + DECAY_S);

        const body = ctx.createOscillator();
        body.type = 'triangle';
        body.frequency.value = freq;

        const shimmer = ctx.createOscillator();
        shimmer.type = 'sine';
        shimmer.frequency.value = freq * 2;
        const shimmerGain = ctx.createGain();
        shimmerGain.gain.value = 0.18;

        body.connect(filter);
        shimmer.connect(shimmerGain).connect(filter);
        filter.connect(out).connect(ctx.destination);

        body.start(t);
        shimmer.start(t);
        body.stop(t + DECAY_S + 0.05);
        shimmer.stop(t + DECAY_S + 0.05);

        setPressed(prev => new Set(prev).add(note));
        setTimeout(() => {
            setPressed(prev => {
                const next = new Set(prev);
                next.delete(note);
                return next;
            });
        }, PRESS_MS);
    }, []);

    const onKeyDown = (e) => {
        if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
        const k = BY_KEY[e.key.toLowerCase()];
        if (!k) return;
        e.preventDefault();
        play(k);
    };

    useEffect(() => () => { ctxRef.current?.close(); }, []);

    return (
        <div
            className="mini-piano"
            role="group"
            aria-label="Playable piano, one octave. Focus it and use A to K for white keys, W E T Y U for black keys."
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            {WHITE.map(k => (
                <button
                    type="button"
                    key={k.note}
                    className={`mp-key mp-white${pressed.has(k.note) ? ' is-pressed' : ''}`}
                    aria-label={k.note}
                    tabIndex={-1}
                    onPointerDown={() => play(k)}
                >
                    <span className="mp-hint" aria-hidden="true">{k.key}</span>
                </button>
            ))}
            {BLACK.map(k => (
                <button
                    type="button"
                    key={k.note}
                    className={`mp-key mp-black${pressed.has(k.note) ? ' is-pressed' : ''}`}
                    style={{ '--after': k.after }}
                    aria-label={k.note}
                    tabIndex={-1}
                    onPointerDown={() => play(k)}
                />
            ))}
        </div>
    );
}

export default MiniPiano;
