/**
 * Extracts dominant / vibrant RGB from an image using offscreen canvas sampling.
 * Falls back smoothly to default neutral glow on error / CORS blocks.
 */
export function extractAmbientColor(imageSrc: string): Promise<string> {
  const fallbackColor = 'rgba(244, 63, 94, 0.18)' // Default rose ambient glow

  return new Promise((resolve) => {
    if (!imageSrc) {
      resolve(fallbackColor)
      return
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) {
          resolve(fallbackColor)
          return
        }

        // Downsample to 24x24 for performance
        const sampleSize = 24
        canvas.width = sampleSize
        canvas.height = sampleSize

        ctx.drawImage(img, 0, 0, sampleSize, sampleSize)
        const imgData = ctx.getImageData(0, 0, sampleSize, sampleSize).data

        let rSum = 0
        let gSum = 0
        let bSum = 0
        let count = 0

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i]
          const g = imgData[i + 1]
          const b = imgData[i + 2]
          const a = imgData[i + 3]

          // Ignore fully transparent or near white/black pixels to get richer tones
          if (a > 128) {
            const brightness = (r * 299 + g * 587 + b * 114) / 1000
            if (brightness > 20 && brightness < 240) {
              rSum += r
              gSum += g
              bSum += b
              count++
            }
          }
        }

        if (count === 0) {
          resolve(fallbackColor)
          return
        }

        const avgR = Math.round(rSum / count)
        const avgG = Math.round(gSum / count)
        const avgB = Math.round(bSum / count)

        resolve(`rgba(${avgR}, ${avgG}, ${avgB}, 0.22)`)
      } catch (err) {
        // Handled cross-origin taint or canvas error
        resolve(fallbackColor)
      }
    }

    img.onerror = () => {
      resolve(fallbackColor)
    }

    img.src = imageSrc
  })
}
