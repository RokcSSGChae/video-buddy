# 🎬 video-buddy 🎬

`video-buddy`는 동영상 업로드, 재생, 썸네일 관리 기능을 제공하는 모노레포 프로젝트입니다.

## 📦 Packages

| name   | description                                                 | links                                                                                                            |
| ------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| modal  | 동영상 첨부 및 썸네일 추출 기능 및 UI를 제공하는 라이브러리 | [code](https://github.com/RokcSSGChae/video-buddy/tree/main/packages/modal)  |
| player | 동영상 플레이어 인터페이스를 제공하는 패키지                | [code](https://github.com/RokcSSGChae/video-buddy/tree/main/packages/player) |
| shared | 워크스페이스 내 공통 모듈을 관리하는 패키지                 | [code](https://github.com/RokcSSGChae/video-buddy/tree/main/packages/shared) |

<br>

## 🛠 설치 방법

프로젝트를 클론한 후, `pnpm`을 사용해 모든 종속성을 설치합니다.

```bash
git clone https://github.com/RokcSSGChae/video-buddy.git
cd video-buddy
pnpm install
```

<br>

## 📂 사용 방법

루트 디렉토리에서 `pnpm` 명령어로 패키지별 스크립트를 실행할 수 있습니다.

```bash
# 모든 패키지 빌드
pnpm run build
```

### 개별 패키지 실행 예시

```bash
# modal 패키지 빌드
pnpm --filter modal build

# player 패키지 개발 모드
pnpm --filter player dev
```

<br>

## 🧰 개발 환경 설정

모든 패키지에서 일관된 개발 환경을 제공하기 위해 `pnpm workspaces`를 사용합니다. 공통으로 사용하는 모듈은 `shared` 패키지에 관리합니다.

<br>

## 🌐 링크 및 자료

- **문서 및 가이드** : 각 패키지의 README 파일을 참고해 설치 및 설정을 진행하세요.
- **이슈 및 피드백** : [Issues](https://github.com/RokcSSGChae/video-buddy/issues)를 통해 문의사항이나 버그를 제보할 수 있습니다.