import { useModal, Modal } from './components';

function App() {
    const { isOpen, openModal, closeModal, onConfirm, onCancel } = useModal();

    return (
        <div>
            <button onClick={openModal}>동영상 첨부</button>
            <Modal isOpen={isOpen} onClose={closeModal} onConfirm={onConfirm} onCancel={onCancel} />
        </div>
    );
}

export default App;
