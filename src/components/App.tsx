import React, {useEffect, useRef, useState} from 'react';
import { Transition } from '@headlessui/react';
import {useTransition} from "../hooks/useTransition.ts";

interface AerialBatch {
    id: string;
    assets: AerialAsset[]
}

interface AerialAsset {
    url: string;
    accessibilityLabel: string;
    type: string;
    id: string;
    timeOfDay: string;
}

export const App = () => {
    const container = useRef();

    // http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json
    const [videos, setVideos] = useState<AerialBatch[]|null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
    const [selectedVideoStyle, setSelectedVideoStyle] = useState("any");
    const [controlsShown, setControlsShown] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await fetch("/videos");
            const responseJson = await response.json();
            setVideos(responseJson);
        })();
    }, []);

    const selectVideo = () => {
        if (isTransitioning) {
            return;
        }

        setIsTransitioning(true);
        const videoUrls = videos
            .map(batch => {
                batch.assets = batch.assets.filter(asset => (selectedVideoStyle === 'any' || asset.timeOfDay === selectedVideoStyle))
                return batch
            })
            .map(batch => batch.assets.map(asset => asset.url))
            .reduce((acc, cur) => {
                acc.push(...cur)
                return acc;
            }, [])
        const randomUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
        setSelectedVideos([...selectedVideos, randomUrl]);

        setTimeout(() => setIsTransitioning(false), 5000);
    }

    useEffect(() => {
        if (videos) {
            selectVideo();
        }
    }, [videos, selectedVideoStyle])

    // const transition = useTransition({
    //     enter: "transition-opacity transition-5000",
    //     enterFrom: "opacity-0",
    //     enterTo: "opacity-100", // unneeded, default is `opacity: 1`
    //     leaveTo: "opacity-0",
    // });
    // useEffect(() => {
    //     console.log(transition.toString(), new Date().getTime());
    // }, [transition])

    const handleTimeUpdate = (event: Event) => {
        const video: HTMLVideoElement = event.currentTarget;
        if (video.duration - video.currentTime < 5) {
            selectVideo();
        }
    }

    const handleEnded = (event: Event) => {
        const video = HTMLVideoElement = event.currentTarget;
        const filteredVideos = selectedVideos.filter(selectedVideoUrl => video.src !== selectedVideoUrl)
        setSelectedVideos([...filteredVideos]);
    }

    const handleFullScreen = (event: Event) => {
        if (container.current) {
            console.log(container.current);
            container.current.webkitRequestFullscreen();
        }
    }

    let timeout: number|null = null;
    useEffect(() => {
        if (container.current) {
            container.current.addEventListener('mousemove', () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
                if (!controlsShown) {
                    setControlsShown(true);
                }
                timeout = setTimeout(() => {
                    setControlsShown(false);
                }, 5000)
            });
        }
    }, [container])

   // className={transition.add('fixed inset w-screen h-screen bg-black')}
    return <div className="fixed inset-0 z-0 bg-black" ref={container}>
        {selectedVideos.map(videoUrl => (
            <Transition
                key={videoUrl}
                appear={true}
                show={true}
                className="filter-opacity-0"
                enter="transition-all duration-5000"
                enterFrom="filter-opacity-0"
                enterTo=""
                leave="transition-all duration-5000"
                leaveFrom=""
                leaveTo="filter-opacity-0"
            >
                {<video className="absolute inset-0 w-screen h-screen"
                       muted
                       playsInline
                       autoPlay
                       controls={false}
                       src={videoUrl}
                       onEnded={handleEnded}
                       onTimeUpdate={handleTimeUpdate}
                />}
            </Transition>
        ))}
        <Transition
            className="z-10 fixed inset-0"
            show={controlsShown}
            enter="transition-all duration-200"
            enterFrom="filter-opacity-0"
            enterTo=""
            leave="transition-all duration-200"
            leaveFrom=""
            leaveTo="filter-opacity-0"
        >
            <button className="bg-white" onClick={handleFullScreen}>Full Screen</button>
            <select className="appearance-none bg-white" onChange={e => setSelectedVideoStyle(e.currentTarget.value)} value={selectedVideoStyle}>
                <option value="any">Any time</option>
                <option value="day">Day</option>
                <option value="night">Night</option>
            </select>
        </Transition>
    </div>
}
