import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Aman Rawat — ML Engineer & Full Stack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    backgroundColor: '#000000',
                    padding: '60px 72px',
                    fontFamily: 'monospace',
                    position: 'relative',
                }}
            >
                {/* Grid background */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* Green ambient glow top-left */}
                <div
                    style={{
                        position: 'absolute',
                        top: -100,
                        left: -100,
                        width: 500,
                        height: 500,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,255,135,0.12), transparent 70%)',
                    }}
                />

                {/* Cyan glow bottom-right */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: -80,
                        right: -80,
                        width: 350,
                        height: 350,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0,194,255,0.08), transparent 70%)',
                    }}
                />

                {/* Top-right corner bracket */}
                <div
                    style={{
                        position: 'absolute',
                        top: 48,
                        right: 72,
                        width: 48,
                        height: 48,
                        borderTop: '2px solid rgba(0,255,135,0.3)',
                        borderRight: '2px solid rgba(0,255,135,0.3)',
                    }}
                />

                {/* Bottom-left corner bracket */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 48,
                        left: 72,
                        width: 48,
                        height: 48,
                        borderBottom: '2px solid rgba(0,255,135,0.3)',
                        borderLeft: '2px solid rgba(0,255,135,0.3)',
                    }}
                />

                {/* Boot lines */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                        marginBottom: 32,
                        zIndex: 1,
                    }}
                >
                    <span style={{ color: 'rgba(0,255,135,0.5)', fontSize: 16, letterSpacing: 2 }}>
                        {'> booting system...'}
                    </span>
                    <span style={{ color: 'rgba(0,255,135,0.5)', fontSize: 16, letterSpacing: 2 }}>
                        {'> status: online'}
                    </span>
                </div>

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', zIndex: 1 }}>
                    <span
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            color: '#00FF87',
                            letterSpacing: -4,
                            lineHeight: 1,
                        }}
                    >
                        AMAN
                    </span>
                    <span
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            color: '#EDEDED',
                            letterSpacing: -4,
                            lineHeight: 1,
                        }}
                    >
                        RAWAT
                    </span>
                </div>

                {/* Role tagline */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        marginTop: 24,
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            height: 1,
                            width: 32,
                            backgroundColor: 'rgba(0,255,135,0.4)',
                        }}
                    />
                    <span
                        style={{
                            color: '#667788',
                            fontSize: 18,
                            letterSpacing: 3,
                        }}
                    >
                        ML ENGINEER 
                    </span>
                </div>

                {/* Available badge */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginTop: 28,
                        border: '1px solid rgba(0,255,135,0.25)',
                        borderRadius: 6,
                        padding: '6px 14px',
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#00FF87',
                        }}
                    />
                    <span
                        style={{
                            color: '#00FF87',
                            fontSize: 12,
                            letterSpacing: 3,
                        }}
                    >
                        AVAILABLE FOR HIRE
                    </span>
                </div>

                {/* Domain — bottom right */}
                <span
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        right: 72,
                        color: 'rgba(0,255,135,0.4)',
                        fontSize: 16,
                        letterSpacing: 2,
                        zIndex: 1,
                    }}
                >
                    https://asr-work.netlify.app/
                </span>
            </div>
        ),
        { ...size }
    )
}