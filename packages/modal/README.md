# @video-buddy/modal

`@video-buddy/modal`은 동영상 파일 첨부 및 썸네일 관리 기능을 제공하는 모달 라이브러리입니다.

### 주요 기능 🙆‍♂️

-   **동영상 파일 업로드** : 파일 선택 또는 드래그 앤 드롭을 통해 동영상 파일을 업로드할 수 있습니다.
-   **썸네일 생성 및 삭제** : 동영상에서 특정 위치의 썸네일을 추가, 삭제할 수 있습니다.
-   **커스텀 이벤트** : 동영상 파일 변경, 썸네일 변경, 드래그 이벤트 등 주요 이벤트를 지원합니다.
-   **모달 상태 관리** : `useModal` 훅을 통해 모달 상태를 편리하게 제어할 수 있습니다.

### 포함하지 않는 기능 🙅‍♂️

-   **백엔드 연동** : 동영상 저장을 위한 서버 API 연동은 포함되지 않습니다.

<br>

## 설치

패키지 레지스트리 게시 이전으로 설치 가이드 예시입니다.

```bash
npm install @video-buddy/modal
```

<br>

## 사용 방법

### 1. 모달 컴포넌트 불러오기 및 설정하기

모달 컴포넌트를 불러와 파일 업로드와 썸네일 기능을 설정합니다.

#### Modal 컴포넌트 예제

```javascript
import { BuddyModal } from "@video-buddy/modal";

<BuddyModal
    isOpen={isOpen}
    onClose={closeModal}
    onConfirm={onConfirm}
    onCancel={onCancel}
    onFileChange={(file) => console.log("파일 변경:", file)}
    onThumbnailsChange={(thumbnails) => console.log("썸네일 변경:", thumbnails)}
    onDragEnter={(e) => console.log("드래그 진입")}
    onDragLeave={(e) => console.log("드래그 종료")}
    onDragOver={(e) => console.log("드래그 오버")}
/>;
```

### 2. 모달 상태 관리 훅 사용하기

`useModal` 훅을 사용하여 모달의 열기/닫기 상태를 관리할 수 있습니다.

#### useModal 훅 사용 예제

```javascript
import useModal from "@video-buddy/modal/hooks/useModal";

function App() {
    const { isOpen, openModal, closeModal, onConfirm, onCancel } = useModal();

    return (
        <>
            <button onClick={openModal}>동영상 업로드</button>
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onFileChange={(file) => console.log("파일 변경:", file)}
                onThumbnailsChange={(thumbnails) =>
                    console.log("썸네일 변경:", thumbnails)
                }
            />
        </>
    );
}
```

<br>

## Props

### Modal Props

| Prop                 | Type                                                         | 설명                                               |
| -------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| `isOpen`             | `boolean`                                                    | 모달이 열려 있는지 여부를 결정하는 상태값입니다.   |
| `onClose`            | `() => void`                                                 | 모달을 닫을 때 실행할 함수입니다.                  |
| `onConfirm`          | `() => void`                                                 | 확인 버튼 클릭 시 실행할 함수입니다.               |
| `onCancel`           | `() => void`                                                 | 취소 버튼 클릭 시 실행할 함수입니다.               |
| `onFileChange`       | `(file: File \| null) => void`                               | 파일이 변경될 때 호출되는 함수입니다.              |
| `onThumbnailsChange` | `(thumbnails: Array<{ src: string, time: string }>) => void` | 썸네일이 추가되거나 삭제될 때 호출되는 함수입니다. |
| `onDragEnter`        | `(event: DragEvent) => void`                                 | 파일이 드롭존에 진입할 때 호출되는 함수입니다.     |
| `onDragLeave`        | `(event: DragEvent) => void`                                 | 파일이 드롭존에서 나갈 때 호출되는 함수입니다.     |
| `onDragOver`         | `(event: DragEvent) => void`                                 | 파일이 드롭존 위에 있을 때 호출되는 함수입니다.    |

### useModal 훅

`useModal` 훅은 모달 상태를 쉽게 관리할 수 있는 메서드를 제공합니다.

| Return Value | Type         | 설명                    |
| ------------ | ------------ | ----------------------- |
| `isOpen`     | `boolean`    | 모달이 열려 있는지 여부 |
| `openModal`  | `() => void` | 모달을 여는 함수        |
| `closeModal` | `() => void` | 모달을 닫는 함수        |
| `onConfirm`  | `() => void` | 확인 버튼 클릭 핸들러   |
| `onCancel`   | `() => void` | 취소 버튼 클릭 핸들러   |

<br>

## 이벤트 핸들링 예제

### 썸네일 추가 및 삭제 이벤트

`onThumbnailsChange`를 사용하여 썸네일 변경 이벤트를 처리할 수 있습니다.

```javascript
<Modal
    onThumbnailsChange={(thumbnails) => {
        console.log("새로운 썸네일 목록:", thumbnails);
    }}
/>
```

### 파일 변경 이벤트

`onFileChange`를 사용하여 파일이 변경될 때의 처리를 할 수 있습니다.

```javascript
<Modal
    onFileChange={(file) => {
        if (file) console.log("선택된 파일:", file.name);
    }}
/>
```

## Issues

문의 사항이나 버그 제보는 자유롭게 [이슈](https://github.com/RokcSSGChae/video-buddy/issues) 남겨주시거나 담당자에게 문의 부탁드리겠습니다.
