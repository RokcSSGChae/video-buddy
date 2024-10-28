import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isFunction } from '../utils';

interface UseFileDropZoneReturn<T extends HTMLElement> {
    files: Array<File> | null;
    isOverDropZone: boolean;
    fileDropZoneRef: React.MutableRefObject<T | null>;
}

interface UseFileDropZoneOptions {
    dataTypes?: Array<string> | ((types: Array<string>) => boolean);
    onDrop?: (files: Array<File> | null, event: DragEvent) => void;
    onEnter?: (event: DragEvent) => void;
    onLeave?: (event: DragEvent) => void;
    onOver?: (event: DragEvent) => void;
    multiple?: boolean;
}

const DEFAULT_OPTIONS: UseFileDropZoneOptions = {
    multiple: false
};

export function useFileDropZone<T extends HTMLElement = HTMLElement>(
    options: UseFileDropZoneOptions = {}
): UseFileDropZoneReturn<T> {
    const [isOverDropZone, setIsOverDropZone] = useState(false);
    const [files, setFiles] = useState<Array<File> | null>(null);
    const counter = useRef(0);
    const isValid = useRef(true);

    const mergedOptions = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);
    const multiple = mergedOptions.multiple ?? true;

    const getFiles = useCallback((event: DragEvent) => {
        const list = Array.from(event.dataTransfer?.files ?? []);
        return list.length === 0 ? null : (multiple ? list : [list[0]]);
    }, [multiple]);

    const checkDataTypes = useCallback((types: Array<string>) => {
        const dataTypes = mergedOptions.dataTypes;

        if (!dataTypes) return true;
        else if(isFunction(dataTypes)) return dataTypes(types);
        else return dataTypes.some(item => types.includes(item));
    }, [mergedOptions.dataTypes]);

    const checkValidity = useCallback((event: DragEvent) => {
        const items = Array.from(event.dataTransfer?.items ?? []);
        const types = items.map(item => item.type);

        const dataTypesValid = checkDataTypes(types);
        const multipleFilesValid = multiple || items.length <= 1;

        return dataTypesValid && multipleFilesValid;
    }, [checkDataTypes, multiple]);

    const handleDragEvent = useCallback((event: DragEvent, eventType: 'enter' | 'over' | 'leave' | 'drop') => {
        event.preventDefault();

        isValid.current = checkValidity(event);

        if (!isValid.current) {
            if (event.dataTransfer) event.dataTransfer.dropEffect = 'none';
            return;
        }
        
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';

        const currentFiles = getFiles(event);

        switch (eventType) {
            case 'enter':
                counter.current += 1;
                setIsOverDropZone(true);
                mergedOptions.onEnter?.(event);
                break;
            case 'over':
                mergedOptions.onOver?.(event);
                break;
            case 'leave':
                counter.current -= 1;
                if (counter.current === 0) setIsOverDropZone(false);
                mergedOptions.onLeave?.(event);
                break;
            case 'drop':
                counter.current = 0;
                setIsOverDropZone(false);
                if (isValid.current) {
                    setFiles(currentFiles);
                    mergedOptions.onDrop?.(currentFiles, event);
                }
                break;
        }
    }, [checkValidity, getFiles, mergedOptions]);

    const fileDropZoneRef = useRef<T | null>(null);

    useEffect(() => {
        const target = fileDropZoneRef.current;
        if (!target) return;

        const dragEnterHandler = (event: DragEvent) => handleDragEvent(event, 'enter');
        const dragOverHandler = (event: DragEvent) => handleDragEvent(event, 'over');
        const dragLeaveHandler = (event: DragEvent) => handleDragEvent(event, 'leave');
        const dropHandler = (event: DragEvent) => handleDragEvent(event, 'drop');

        target.addEventListener('dragenter', dragEnterHandler);
        target.addEventListener('dragover', dragOverHandler);
        target.addEventListener('dragleave', dragLeaveHandler);
        target.addEventListener('drop', dropHandler);

        return () => {
            target.removeEventListener('dragenter', dragEnterHandler);
            target.removeEventListener('dragover', dragOverHandler);
            target.removeEventListener('dragleave', dragLeaveHandler);
            target.removeEventListener('drop', dropHandler);
        };
    }, [handleDragEvent]);

    return {
        files,
        isOverDropZone,
        fileDropZoneRef
    };
}
