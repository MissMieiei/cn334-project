"use client"

interface QueueStackProps {
  queueNumber: number
  onTap: () => void
  isAnimatingOut: boolean
}

function getCardColor(i: number, total: number): string {
  const t = total <= 1 ? 1 : i / (total - 1)
  const L = Math.round(82 - t * 52)
  const S = Math.round(55 + t * 20)
  return `hsl(350,${S}%,${L}%)`
}

const CARD_W = 220
const CARD_H = 220
const GAP = 28
const MAX_V = 5

const RX_FRONT = -18
const RX_STEP  = 9

export default function QueueStack({ queueNumber, onTap, isAnimatingOut }: QueueStackProps) {
  const n = queueNumber
  const vis = Math.min(n, MAX_V)
  const stackH = (vis - 1) * GAP + CARD_H

  return (
    <div
      style={{
        position: "relative",
        width: CARD_W,
        height: stackH,
        margin: "0 auto",
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {Array.from({ length: vis }).map((_, v) => {
        const isFront = v === vis - 1
        const layerFromFront = vis - 1 - v
        const realIdx = n - vis + v
        const topPx = v * GAP
        const color = getCardColor(realIdx, n)
        const rx = RX_FRONT - layerFromFront * RX_STEP

        return (
          <div
            key={v}
            onClick={isFront ? onTap : undefined}
            style={{
              position: "absolute",
              width: CARD_W,
              height: CARD_H,
              top: topPx,
              left: 0,
              zIndex: v + 1,
              background: color,
              borderRadius: 28,
              transformOrigin: "center top",
              transform: isFront && isAnimatingOut
                ? `rotateX(${rx}deg) translateY(80px) scale(0.85)`
                : `rotateX(${rx}deg)`,
              opacity: isFront && isAnimatingOut ? 0 : 1,
              transition: isFront ? "transform 0.35s ease, opacity 0.35s ease" : undefined,
              display: isFront ? "flex" : "block",
              flexDirection: "column" as const,
              alignItems: "center",
              justifyContent: "center",
              cursor: isFront ? "pointer" : "default",
            }}
          >
            {isFront && (
              <>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, letterSpacing: "0.15em", marginBottom: 8 }}>
                  คิวที่รอ
                </p>
                <p style={{ color: "#fff", fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
                  {queueNumber}
                </p>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}