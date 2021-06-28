import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch';

export default function (req: VercelRequest, res: VercelResponse) {
    const { name = 'World' } = req.query
    fetch('http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json')
        .then(data => data.text())
        .then(body => res.send(body))
}
