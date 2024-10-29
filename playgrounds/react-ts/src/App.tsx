import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

// @video-buddy/modal
import { Modal, useModal } from '@video-buddy/modal';
import '@video-buddy/modal/style.css';

function App() {
    const { isOpen, openModal, closeModal, onConfirm, onCancel } = useModal();
    const [logs, setLogs] = useState('');
    const logRef = useRef<HTMLTextAreaElement | null>(null);

    const addLog = (message: string) => {
        setLogs((prevLogs) => `${prevLogs}\n${message}`);
    };

    useEffect(() => {
        if (logRef.current)
            logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [logs]);

    const handleOpenModal = () => {
        openModal();
        addLog('Modal opened');
    };

    const handleCloseModal = () => {
        closeModal();
        addLog('Modal closed');
    };

    const handleConfirm = () => {
        onConfirm();
        addLog('Modal confirmed');
    };

    const handleCancel = () => {
        onCancel();
        addLog('Modal canceled');
    };

    const handleDragEnter = () => {
        addLog('File dropzone dragEnter');
    };

    const handleDragOver = () => {
        addLog('File dropzone dragOver');
    };

    const handleDragLeave = () => {
        addLog('File dropzone dragLeave');
    };

    const handleFileChange = (file: File | null) => {
        addLog(`File changed: \nname: ${file?.name}`);
    };

    const handleThumbnailsChange = (
        thumbnails: Array<{
            src: string;
            time: string;
        }>
    ) => {
        const count = thumbnails.length;
        addLog(`Thumbnails changed: \ncount: ${count}`);
    };

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
                    onDragover={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onFileChange={handleFileChange}
                    onThumbnailsChange={handleThumbnailsChange}
                />
            </div>
        </div>
    );
}

export default App;
