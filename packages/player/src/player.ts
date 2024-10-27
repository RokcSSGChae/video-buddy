export interface PlayerOptions {
    src?: string;
    controls?: boolean;
}

export default class Player {
    private video: HTMLVideoElement;

    constructor(selector: string, options: PlayerOptions = {}) {
        this.video = document.createElement('video');

        const { src = '', controls = true } = options;

        this.video.src = src;
        this.video.controls = controls;

        const container = document.querySelector(selector);
        if (!container) throw new Error('Invalid selector. Element not found.');
    
        container.appendChild(this.video);
    }

    src(source: string): void {
        this.video.src = source;
    }
  
    play(): void {
        this.video.play();
    }
  
    pause(): void {
        this.video.pause();
    }
  
    getVideoElement(): HTMLVideoElement {
        return this.video;
    }
}