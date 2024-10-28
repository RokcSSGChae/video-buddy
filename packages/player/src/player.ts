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

    play(): void {
        this.video.play();
    }

    pause(): void {
        this.video.pause();
    }
  
    getVideoElement(): HTMLVideoElement {
        return this.video;
    }

    getCurrentTime(): number {
        return this.video.currentTime;
    }

    async getThumbnail(time = this.getCurrentTime()): Promise<string> {
        return new Promise((resolve, reject) => {
            const isAtCurrentTime = time === this.getCurrentTime();

            const captureThumbnail = () => {
                const canvas = document.createElement('canvas');
                canvas.width = this.video.videoWidth;
                canvas.height = this.video.videoHeight;
    
                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    reject(new Error('Failed to get 2D context.'));
                }
            };
    
            if (isAtCurrentTime) captureThumbnail();
            else {
                const onSeeked = () => {
                    this.video.removeEventListener('seeked', onSeeked);
                    captureThumbnail();
                };
                this.video.addEventListener('seeked', onSeeked, { once: true });
                this.video.currentTime = time;
            }
        });
    }
}