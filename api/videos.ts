import { VercelRequest, VercelResponse } from '@vercel/node'

export default function (req: VercelRequest, res: VercelResponse) {
    const { name = 'World' } = req.query
    fetch('http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json').then(data => {
        res.send(data)
    })
}
