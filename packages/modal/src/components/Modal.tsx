import { useCallback, useEffect, useRef, useState } from 'react';
import downloadIcon from '../assets/download.svg';
import closeIcon from '../assets/xmark.svg';
import './index.css';
import { noop, useFileDialog, useFileDropZone } from '@video-buddy/shared';
import { Player } from '@video-buddy/player';

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    onFileChange?: (file: File | null) => void;
    onThumbnailsChange?: (thumbnails: Array<{ src: string, time: string }>) => void;
    onDragEnter?: (event: DragEvent) => void;
    onDragLeave?: (event: DragEvent) => void;
    onDragOver?: (event: DragEvent) => void;
}

const Modal = ({
    isOpen = false,
    onClose = noop,
    onConfirm = noop,
    onCancel = noop,
    onFileChange = noop,
    onThumbnailsChange = noop,
    onDragEnter = noop,
    onDragLeave = noop,
    onDragOver = noop
}: ModalProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [thumbnails, setThumbnails] = useState<Array<{ src: string, time: string }>>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetState = () => {
        setSelectedFile(null);
        setThumbnails([]);
        setErrorMessage(null);
    };
    
    const playerRef = useRef<Player | null>(null);

    const { open: openFileDialog, onChange, reset } = useFileDialog();
    const { fileDropZoneRef } = useFileDropZone<HTMLDivElement>({
        onDrop: (droppedFiles) => {
            if (droppedFiles?.length) handleFileSelection(droppedFiles[0]);
        },
        onEnter: onDragEnter,
        onLeave: onDragLeave,
        onOver: onDragOver,
        multiple: false
    });

    const handleFileSelection = (file: File) => {
        const isVideoFileSelection = file.type.startsWith('video/');

        if (isVideoFileSelection) {
            setErrorMessage(null);
            setSelectedFile(file);
        } else {
            setErrorMessage('동영상 파일만 선택할 수 있습니다.');
            setSelectedFile(null);
        }
    };

    useEffect(() => {
        if (!selectedFile) return;

        if (playerRef.current) playerRef.current = null;
        playerRef.current = new Player('#vb-container', {
            src: URL.createObjectURL(selectedFile),
            controls: true
        });
        setThumbnails([]);
    }, [selectedFile]);

    useEffect(() => onFileChange(selectedFile), [selectedFile, onFileChange]);
    useEffect(() => onThumbnailsChange(thumbnails), [thumbnails, onThumbnailsChange]);

    onChange((selectedFiles) => {
        if (selectedFiles?.length) handleFileSelection(selectedFiles[0]);
        reset();
    });

    const captureThumbnail = async () => {
        if (playerRef.current && thumbnails.length < 4) {
            playerRef.current.pause();

            const thumbnailSrc = await playerRef.current.getThumbnail();
            const currentTime = playerRef.current.getCurrentTime();

            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            setThumbnails([...thumbnails, { src: thumbnailSrc, time: timeString }]);
        }
    };

    const deleteThumbnail = (index: number) => setThumbnails(thumbnails.filter((_, i) => i !== index));

    const handleClose = useCallback(() => {
        resetState();
        onClose();
    }, [onClose]);

    const handleCancel = useCallback(() => {
        resetState();
        onCancel();
    }, [onCancel]);

    const handleConfirm = useCallback(() => {
        resetState();
        onConfirm();
    }, [onConfirm]);

    if (!isOpen) return null;
    return (
        <div className="modal">
            <div className="modal-header">
                <div className="modal-header-start">
                    <span className="modal-header-title">
                        { selectedFile ? '동영상 업로드' : '사진 올리기' }
                    </span>
                </div>
                <div className="modal-header-end">
                    <button className="modal-header-button close-button" onClick={handleClose}>
                        <img src={closeIcon} alt="Close Icon" />
                    </button>
                </div>
            </div>

            <div className="modal-body">
                {
                    selectedFile ? (
                        <>
                            <div id="vb-container"></div>
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
                        </>
                    ) : (
                        <>
                            <div
                                ref={fileDropZoneRef}
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
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </>
                    )
                }
            </div>
            <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                    취소
                </button>
                <button type="button" className="confirm-button" onClick={handleConfirm}>
                    확인
                </button>
            </div>
        </div>
    );
};

export default Modal;
