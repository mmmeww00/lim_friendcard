# 아이프리 프렌카

아이프리버스 프렌드 카드(프렌카)를 등록하고, 검색해서 QR을 바로 띄워 쓰는 웹 앱입니다.
GitHub Pages로 배포하고, 데이터와 로그인은 Firebase(Firestore, Authentication)를 씁니다.
휴대폰에서 "홈 화면에 추가"하면 앱처럼 열립니다.

## 기능
- 프렌카 등록: 프렌카 이미지, QR 이미지(필수) / 캐릭터, 코디 이름(한·일), 이로치 코디, 기타사항(선택)
- 검색, 캐릭터별 보기, 같은 코디·이로치 프렌카 추천
- QR 크게 띄우기, QR 이미지 저장(휴대폰은 공유 시트)
- 숫자 번호(6~8자리) 로그인: 내가 등록한 프렌카만 보기, 수정·삭제
- 관리자 암호 로그인: 모든 프렌카 수정·삭제, 백업 파일 가져오기
- 테마 색 변경(기본: 사쿠라미쿠 헤어 연분홍), 밝게/어둡게

## 처음 설정 (한 번만)

### 1. Firebase 프로젝트
1. https://console.firebase.google.com 에서 새 프로젝트를 만듭니다. (무료 Spark 요금제로 충분)
2. 빌드 > Firestore Database > 데이터베이스 만들기 (위치: asia-northeast3 서울, 프로덕션 모드)
3. 빌드 > Authentication > 시작하기 > 로그인 방법에서 "이메일/비밀번호"를 사용 설정
4. Authentication > 사용자 > 사용자 추가
   - 이메일: `admin@ifri-frenka.app`
   - 비밀번호: 관리자 암호
5. Authentication > 설정 > 승인된 도메인에 `<GitHub 아이디>.github.io` 추가
6. Firestore Database > 규칙 탭에 `firestore.rules` 내용을 붙여 넣고 게시
7. 프로젝트 설정 > 일반 > 내 앱 > 웹 앱 추가(</>) 후 나오는 `firebaseConfig` 값을 `firebase-config.js`에 붙여 넣기

### 2. GitHub Pages
저장소 Settings > Pages > Source: Deploy from a branch, Branch: `main` / `(root)` 저장.
몇 분 뒤 `https://<GitHub 아이디>.github.io/<저장소 이름>/` 에서 열립니다.

### 3. 아티팩트 데이터 옮기기
1. 앱에서 로그인 > 맨 아래 "관리자" > 관리자 암호로 로그인
2. 다시 로그인 버튼 > "백업 파일 고르기"에서 아티팩트 백업 파일(`frenka-backup-*.json`) 선택
3. 아티팩트에서 쓰던 번호는 그대로 로그인할 수 있습니다. (처음 로그인할 때 계정이 자동으로 만들어짐)

## 파일
| 파일 | 내용 |
|---|---|
| `index.html` | 앱 화면과 동작 전체 |
| `firebase-config.js` | Firebase 연결 설정 |
| `firestore.rules` | Firestore 보안 규칙 (본인·관리자만 수정) |
| `manifest.webmanifest`, `sw.js`, `icons/` | 홈 화면 추가·오프라인 열기 |

## 참고
- 번호 로그인은 내부적으로 `번호 해시@ifri-frenka.app` 이메일 계정을 씁니다. 실제 메일은 오가지 않습니다.
- 이미지는 Firestore 문서에 줄인 크기로 저장합니다. (Storage 없이 무료 요금제에서 동작)
- `firebase-config.js`의 apiKey는 공개되어도 되는 값입니다. 데이터 보호는 `firestore.rules`가 맡습니다.
