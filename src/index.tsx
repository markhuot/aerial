import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App.tsx';

ReactDOM.render(<App/>, document.getElementById('react-root'));

// import express, {Request} from "express";
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { App } from './components/App';
//
// const app = express();
//
// interface AerialBatch {
//     id: string;
//     assets: AerialAsset[]
// }
//
// interface AerialAsset {
//     url: string;
//     accessibilityLabel: string;
//     type: string;
//     id: string;
//     timeOfDay: string;
// }
//
// app.use(async (req, res) => {
//     const response = await fetch("http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json");
//     const videoBatches: AerialBatch[] = await response.json();
//     const videoUrls = videoBatches.map(batch => batch.assets.map(asset => asset.url)).flat(1);
//     const randomUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
//     const body = ReactDOMServer.renderToString(React.createElement(App, {videoUrl: randomUrl}, null));
//     res.send(body);
// });
//
// await app.listen({ port: 8000 });
