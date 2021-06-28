import {useEffect, useLayoutEffect, useRef, useState} from "react";

class ClassList {
    classList: string[]

    constructor(className='') {
        this.classList = [className];
    }

    add(className: string) {
        this.classList.push(className);
        return this;
    }

    toString() {
        return this.classList.join(' ');
    }
}

type UseTransitionParams = {
    shouldShow?: boolean;
    enter?: string,
    enterFrom?: string,
    enterTo?: string,
    leaveTo?: string,
}

export const useTransition = (params: UseTransitionParams): ClassList => {
    const defaults = {
        shouldShow: true,
        enter: '',
        enterFrom: '',
        enterTo: '',
        leaveTo: '',
    }
    const opts = { ...defaults, ...params };
    const [isShown, setIsShown] = useState(false);
    const [classList, setClassList] = useState(new ClassList(opts.enterFrom));

    // const [isNextRender, setIsNextRender] = useState(false);
    // useEffect(() => {
    //     if (isNextRender) {
    //         console.log('do it?');
    //     }
    //     setIsNextRender(false);
    // });
    //
    // const [nextRenders, setNextRenders] = useState([]);
    // const onNextRender = (cb: () => unknown) => {
    //     setNextRenders([...nextRenders, cb]);
    //     setIsNextRender(true);
    // }

    // const waiting = useRef(false);
    // useEffect(() => {
    //     if (waiting.current) {
    //         console.log('waiting');
    //     }
    // }, [waiting.current])

    const [foo, setFoo] = useState(false)
    useEffect(() => {
        console.log('yuesss');
    }, [foo]);

    useEffect(() => {
        if (!isShown && opts.shouldShow) {
            // entering
            console.log('entering');
            setClassList(new ClassList().add('filter-opacity-0 transition-all duration-5000'));
            // onNextRender(() => setClassList(new ClassList().add('filter-opacity-100 transition-all duration-5000')));
            // waiting.current = true;
        }

        if (isShown && !opts.shouldShow) {
            // leaving
            console.log('leaving');
        }

        setIsShown(opts.shouldShow);

        return () => {
            // console.log('unmount?', isShown, opts.shouldShow);
            setClassList(new ClassList().add('filter-opacity-100 transition-all duration-5000'));
            // setTimeout(() => setClassList(new ClassList().add('filter-opacity-100 transition-all duration-5000')), 1000);
        }
    }, [isShown, opts.shouldShow]);

    // useLayoutEffect(() => {
    //     console.log('layout effect');
    //     setClassList(new ClassList().add('filter-opacity-100 transition-all duration-5000'))
    // }, [isShown, opts.shouldShow]);

    return classList;
}
