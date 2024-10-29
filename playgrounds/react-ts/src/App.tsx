import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect, useRef, useState, useCallback } from 'react';

// @video-buddy/modal
import { Modal, useModal } from '@video-buddy/modal';
import '@video-buddy/modal/style.css';

function App() {
    const { isOpen, openModal, closeModal, onConfirm, onCancel } = useModal();
    const [logs, setLogs] = useState('');
    const logRef = useRef<HTMLTextAreaElement | null>(null);

    const addLog = useCallback((message: string) => {
        setLogs((prevLogs) => `${prevLogs}\n${message}`);
    }, []);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [logs]);

    const handleOpenModal = useCallback(() => {
        openModal();
        addLog('Modal opened');
    }, [openModal, addLog]);

    const handleCloseModal = useCallback(() => {
        closeModal();
        addLog('Modal closed');
    }, [closeModal, addLog]);

    const handleConfirm = useCallback(() => {
        onConfirm();
        addLog('Modal confirmed');
    }, [onConfirm, addLog]);

    const handleCancel = useCallback(() => {
        onCancel();
        addLog('Modal canceled');
    }, [onCancel, addLog]);

    const handleDragEnter = useCallback(() => {
        addLog('File dropzone dragEnter');
    }, [addLog]);

    const handleDragOver = useCallback(() => {
        addLog('File dropzone dragOver');
    }, [addLog]);

    const handleDragLeave = useCallback(() => {
        addLog('File dropzone dragLeave');
    }, [addLog]);

    const handleFileChange = useCallback((file: File | null) => {
        addLog(`File changed: \nname: ${file?.name}`);
    }, [addLog]);

    const handleThumbnailsChange = useCallback(
        (thumbnails: Array<{ src: string; time: string }>) => {
            const count = thumbnails.length;
            addLog(`Thumbnails changed: \ncount: ${count}`);
        },
        [addLog]
    );

    return (
        <div id="root">
            <div className="left-content">
                <div>
                    <a href="https://vite.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img
                            src={reactLogo}
                            className="logo react"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1>Vite + React</h1>
                <button onClick={handleOpenModal}>동영상 첨부</button>
                <textarea
                    ref={logRef}
                    value={logs}
                    readOnly
                    rows={10}
                    style={{ width: '100%', marginTop: '1rem' }}
                />
            </div>
            <div className="right-content">
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onFileChange={handleFileChange}
                    onThumbnailsChange={handleThumbnailsChange}
                />
            </div>
        </div>
    );
}

export default App;
