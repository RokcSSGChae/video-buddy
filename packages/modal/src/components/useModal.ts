import { useState, useCallback } from 'react';

function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    const onConfirm = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const onCancel = useCallback(() => {
        closeModal();
    }, [closeModal]);

    return {
        isOpen,
        openModal,
        closeModal,
        onConfirm,
        onCancel
    };
}

export default useModal;
