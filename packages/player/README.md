# @video-buddy/player

`@video-buddy/player`는 HTML 비디오 엘리먼트를 간편하게 제어하고, 썸네일을 생성 기능을 제공하는 플레이어 라이브러리입니다.

### 주요 기능 🙆‍♂️

-   **비디오 재생 및 제어** : 비디오 재생, 일시 정지와 같은 기본 제어 기능을 지원합니다.
-   **썸네일 생성** : 특정 시간의 썸네일을 캡처할 수 있는 기능을 제공합니다.
-   **유연한 설정 옵션** : 비디오 소스, 음소거 상태, 컨트롤 여부 등의 옵션을 설정할 수 있습니다.

<br>

## 설치

패키지 레지스트리 게시 이전으로 설치 가이드 예시입니다.

```bash
npm install @video-buddy/player
```

<br>

## 사용 방법

### 1. Player 인스턴스 생성 및 옵션 설정

`Player` 클래스를 사용하여 비디오를 표시하고 옵션을 설정할 수 있습니다.

#### Player 인스턴스 생성 예제

```javascript
import { Player } from "@video-buddy/player";

const player = new Player("#video-container", {
    src: "path/to/video.mp4",
    controls: true,
    muted: false,
});
```

### 2. 비디오 재생 및 제어

`Player` 인스턴스를 통해 비디오를 재생하거나 일시 정지할 수 있습니다.

```javascript
// 비디오 재생
player.play();

// 비디오 일시 정지
player.pause();
```

### 3. 현재 시간 썸네일 캡처

`getThumbnail` 메서드를 사용하여 특정 시간대의 썸네일을 캡처할 수 있습니다.

```javascript
async function captureThumbnail() {
    const thumbnailDataURL = await player.getThumbnail(10); // 10초 지점의 썸네일 캡처
    console.log("썸네일 데이터 URL:", thumbnailDataURL);
}
```

<br>

## PlayerOptions

`Player` 클래스는 인스턴스를 생성할 때 `PlayerOptions`를 통해 여러 설정 옵션을 제공할 수 있습니다.

| 옵션       | 타입      | 기본값 | 설명                                          |
| ---------- | --------- | ------ | --------------------------------------------- |
| `src`      | `string`  | `''`   | 비디오 소스 URL입니다.                        |
| `controls` | `boolean` | `true` | 비디오 컨트롤러를 표시할지 여부를 설정합니다. |
| `muted`    | `boolean` | `true` | 비디오의 음소거 상태를 설정합니다.            |

<br>

## Player 클래스 메서드

### 1. play

비디오 재생을 시작합니다.

```typescript
player.play();
```

### 2. pause

비디오 재생을 일시 정지합니다.

```typescript
player.pause();
```

### 3. getVideoElement

내부의 `HTMLVideoElement` 요소를 반환합니다.

```typescript
const videoElement = player.getVideoElement();
```

### 4. getCurrentTime

비디오의 현재 재생 시간을 반환합니다.

```typescript
const currentTime = player.getCurrentTime();
```

### 5. getThumbnail

비디오의 특정 시간대에 대한 썸네일을 생성하여 `data URL` 형식으로 반환합니다.

```typescript
// 현재 시간의 썸네일 캡처
const thumbnail = await player.getThumbnail();

// 특정 시간(초 단위)의 썸네일 캡처
const thumbnailAt10Seconds = await player.getThumbnail(10);
```

<br>

## Issues

문의 사항이나 버그 제보는 자유롭게 [이슈](https://github.com/RokcSSGChae/video-buddy/issues)로 남겨주시기 바랍니다.
