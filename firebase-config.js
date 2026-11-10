// Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹)에 있는 값을 그대로 붙여 넣으세요.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 관리자 계정 이메일 (Firebase Authentication에 이 이메일로 관리자 사용자를 만들어 둡니다)
export const ADMIN_EMAIL = "admin@ifri-frenka.app";

// 번호 로그인용 내부 이메일 도메인 (실제 메일은 보내지 않습니다. 바꾸지 마세요)
export const USER_DOMAIN = "ifri-frenka.app";
