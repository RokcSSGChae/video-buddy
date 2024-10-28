import { useEffect, useRef, useState } from 'react';
import downloadIcon from '../assets/download-icon.svg';
import './index.css';
import { noop, useFileDialog } from '@video-buddy/shared';
import { Player } from '@video-buddy/player';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (file: File | null) => void;
    onCancel: () => void;
}
  
const Modal = ({
    isOpen = false,
    onClose = noop,
    onConfirm = noop,
    onCancel = noop
}: ModalProps) => {
    const { open: openFileDialog, onChange } = useFileDialog({ accept: 'video/*' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [thumbnails, setThumbnails] = useState<Array<{ src: string, time: string }>>([]);
    const playerRef = useRef<Player | null>(null);

    useEffect(() => {
        if (selectedFile) {
            if (playerRef.current) playerRef.current = null;
            playerRef.current = new Player('#video-container', {
                src: URL.createObjectURL(selectedFile),
                controls: true
            });
            setThumbnails([]);
        }
    }, [selectedFile]);

    onChange((selectedFiles) => {
        if (selectedFiles?.length) setSelectedFile(selectedFiles[0]);
    });

    const captureThumbnail = async () => {
        if (playerRef.current && thumbnails.length < 4) {
            const thumbnailSrc = await playerRef.current.getThumbnail();
            const videoElement = playerRef.current.getVideoElement();
            const currentTime = videoElement.currentTime;

            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            setThumbnails([...thumbnails, { src: thumbnailSrc, time: timeString }]);
        }
    };

    const deleteThumbnail = (index: number) => setThumbnails(thumbnails.filter((_, i) => i !== index));

    if (!isOpen) return null;
  
    return (
        <div className="modal">
            {
                selectedFile ? (
                    <>
                        <div className="modal-header">
                            <h2>사진 올리기</h2>
                        </div>
                        <div>
                            <div id="video-container"></div>
                            <div className="thumbnail-container">
                                {
                                    thumbnails.map((thumb, index) => (
                                        <div key={index} className="thumbnail-slot">
                                            <img src={thumb.src} alt={`Thumbnail ${index + 1}`} />
                                            <span className="thumbnail-time">{thumb.time}</span>
                                            <button className="delete-button" onClick={() => deleteThumbnail(index)}>X</button>
                                        </div>
                                    ))
                                }
                                {
                                    thumbnails.length < 4 && 
                            (
                                <div className="thumbnail-slot add-thumbnail" onClick={captureThumbnail}>
                                    <span>+</span>
                                </div>
                            )
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="modal-header">
                            <h2>동영상 업로드</h2>
                        </div>
                        <div
                            className="upload-area"
                            role="button"
                            aria-label="동영상 파일을 선택하거나 드래그 앤 드롭하여 첨부하세요"
                            onClick={() => openFileDialog()}
                        >
                            <div className="upload-icon">
                                <img src={downloadIcon} alt="Download Icon" />
                            </div>
                            <p>
                                <strong>동영상 파일을 선택</strong>하거나 이곳으로 드래그 앤 드롭하세요.
                            </p>
                        </div>
                    </>
                )
            }

            <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={onCancel || onClose}>
                    취소
                </button>
                <button type="button" className="confirm-button" onClick={() => onConfirm(selectedFile)}>
                    확인
                </button>
            </div>
        </div>
    );
};
  
export default Modal;
