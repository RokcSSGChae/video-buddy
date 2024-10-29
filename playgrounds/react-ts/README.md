# 🌈 React + TypeScript + Vite

로컬 테스트를 위한 `React` + `TypeScript` + `Vite` 환경입니다.

## 🛠 설치 방법

### 패키지 빌드

플레이그라운드 환경 종속성 설치 이전에 패키지 빌드 스크립트 실행이 필요합니다.

패키지 별 빌드 산출물이 로컬 환경에 이미 있다면 건너뛰어도 됩니다.

```bash
cd video-buddy
pnpm install
pnpm run build
```

### 플레이그라운드 종속성 설치

`npm`을 사용해 모든 종속성을 설치합니다.

플레이그라운드 환경은 `pnpm workspace` 설정과 분리하여 `pnpm` 설치가 불가능합니다.

```bash
cd video-buddy/playgrounds/react-ts
npm install
```

워크스페이스의 패키지는 Local File Path로 설치를 진행합니다.

```json
...
"devDependencies": {
    "@video-buddy/modal": "file:../../packages/modal",
}
```

## 📂 실행

`npm` 명령어로 개발 환경을 실행합니다.

```bash
npm run dev
```
