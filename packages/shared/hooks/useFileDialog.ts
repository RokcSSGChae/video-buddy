import { useState, useRef, useCallback } from 'react';

interface UseFileDialogOptions {
    multiple?: boolean;
    accept?: string;
    capture?: string;
    reset?: boolean;
    directory?: boolean;
}

const DEFAULT_OPTIONS: UseFileDialogOptions = {
    multiple: true,
    accept: '*',
    reset: false,
    directory: false
};

interface UseFileDialogReturn {
    files: FileList | null;
    open: (localOptions?: Partial<UseFileDialogOptions>) => void;
    reset: () => void;
    onChange: (callback: (files: FileList | null) => void) => void;
    onCancel: (callback: () => void) => void;
}

export function useFileDialog(options: UseFileDialogOptions = {}): UseFileDialogReturn {
    const [files, setFiles] = useState<FileList | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const changeCallbacks = useRef<((files: FileList | null) => void)[]>([]);
    const cancelCallbacks = useRef<(() => void)[]>([]);

    const onChange = useCallback((callback: (files: FileList | null) => void) => {
        changeCallbacks.current.push(callback);
    }, []);

    const onCancel = useCallback((callback: () => void) => {
        cancelCallbacks.current.push(callback);
    }, []);

    const triggerChange = useCallback((fileList: FileList | null) => {
        changeCallbacks.current.forEach(callback => callback(fileList));
    }, []);

    const triggerCancel = useCallback(() => {
        cancelCallbacks.current.forEach(callback => callback());
    }, []);

    const reset = useCallback(() => {
        setFiles(null);
        if (inputRef.current) {
            inputRef.current.value = '';
            triggerChange(null);
        }
    }, [triggerChange]);

    const open = useCallback((localOptions?: Partial<UseFileDialogOptions>) => {
        if (!inputRef.current) {
            inputRef.current = document.createElement('input');
            inputRef.current.type = 'file';

            inputRef.current.onchange = (event: Event) => {
                const result = event.target as HTMLInputElement;
                setFiles(result.files);
                triggerChange(result.files);
            };

            inputRef.current.oncancel = () => {
                triggerCancel();
            };
        }

        const mergedOptions = { ...DEFAULT_OPTIONS, ...options, ...localOptions };
        inputRef.current.multiple = mergedOptions.multiple || false;
        inputRef.current.accept = mergedOptions.accept || '*';
        inputRef.current.webkitdirectory = mergedOptions.directory || false;

        if (mergedOptions.capture) {
            inputRef.current.capture = mergedOptions.capture;
        }

        if (mergedOptions.reset) {
            reset();
        }

        inputRef.current.click();
    }, [options, reset, triggerChange, triggerCancel]);

    return {
        files,
        open,
        reset,
        onChange,
        onCancel
    };
}
