## 🎬 MOVIE Curator (React)

- React와 TMDB(The Movie DB) API를 활용하여 구현한 고평점 영화 큐레이션 서비스입니다. 
- 단순히 영화 목록을 나열하는 것을 넘어, 사용자가 원하는 최소 평점 기준을 설정하여 정교하게 필터링된 영화 정보를 탐색할 수 있습니다. 
- 현대적인 다크 모드 UI와 사용자 친화적인 페이지네이션을 적용했습니다.


## 🚀 Features

- 실시간 TMDB 데이터 연동: 최신 TMDB API를 통해 실시간으로 업데이트되는 영화 정보를 불러오며, 한국어 서비스를 완벽 지원합니다.
- 커스텀 평점 필터링: vote_average.gte 파라미터를 활용하여 5.0부터 9.0까지 사용자가 원하는 기준 이상의 영화만 큐레이션합니다.
- 다이나믹 페이지네이션: 대량의 영화 데이터를 효율적으로 탐색할 수 있도록 First/Last 및 이전/다음 기능을 포함한 페이지 네비게이션을 구현했습니다.
- 반응형 UI & 가독성: 텍스트가 길어질 경우를 대비한 생략 처리(ellipsis) 및 시각적인 별점 라이브러리를 통해 영화 정보를 직관적으로 전달합니다.

## 📺 유튜브 예고편 다이렉트 연동 (Technical Detail)

- 단순한 링크 연결을 넘어, API 데이터의 특성을 고려한 우선순위 알고리즘과 사용자 경험(UX)을 반영하여 구현했습니다.
- 동적 URL 렌더링: TMDB 비디오 API가 제공하는 고유 식별자(key)를 활용하여 유튜브 표준 URL(https://www.youtube.com/watch?v={key})을 동적으로 생성합니다.
- 콘텐츠 우선순위 필터링 (Fallback Logic): 모든 영화가 동일한 영상 데이터를 가지고 있지 않은 점을 고려하여, 사용자가 가장 선호하는 최적의 영상을 찾아주는 로직을 설계했습니다.

**1순위: 공식 예고편 (Trailer)**
**2순위: 티저 영상 (Teaser)**
**3순위: 제작기 및 특별 영상 (Featurette)**
**4순위: 데이터가 존재할 경우 첫 번째 영상 (results[0])**

- 비정상 데이터 핸들링: 영상 데이터가 없거나 유튜브 플랫폼이 아닌 경우 alert를 통해 사용자에게 안내 메시지를 제공하여 서비스 신뢰도를 높였습니다.
- UX 최적화: window.open(url, "_blank")를 사용하여 예고편 감상 중에도 기존의 상세 페이지가 유지되도록 설계하여 사용자 이탈을 방지했습니다.


## 🎨 UI / UX

- React Icons: 서비스 정체성을 나타내는 카메라 로고 및 UI 아이콘 배치로 시각적 완성도 향상
- react-simple-star-rating: 수치로 된 평점을 별점 형태로 시각화하여 영화 퀄리티를 직관적으로 파악 가능하게 설계
- Empty State Handling: 조건에 맞는 영화가 없을 경우 사용자에게 친절한 안내 메시지 노출 및 레이아웃 붕괴 방지

## 🛠 Tech Stack

- Framework: React (Functional Components)
- Hooks: useState, useEffect를 활용한 복합 상태 관리 및 API 통신 최적화
- API Interface: TMDB API (v3) - discover, videos 엔드포인트 활용
- Styling: CSS Modules를 이용한 컴포넌트 단위 스타일링 및 전역 변수(var) 활용
- Deployment: GitHub Pages를 통한 정적 호스팅

## 📖 Learning Points

- API Query Optimization: append_to_response=videos 옵션을 통해 상세 정보와 영상 데이터를 한 번에 가져오는 효율적인 데이터 요청 방식 습득
- Dynamic UI Updates: 평점 필터(select) 변경 시 즉시 API 주소를 재구성하여 데이터를 fetch하는 비동기 로직 구현
- Conditional Formatting: API 응답 결과의 유무에 따른 조건부 렌더링으로 안정적인 사용자 경험(UX) 제공

## 📷 Preview
<img width="1920" height="928" alt="스크린샷 2026-01-18 오후 10 07 18" src="https://github.com/user-attachments/assets/d65888c8-79a2-4401-8814-89286fd6cb18" />
<img width="1920" height="928" alt="스크린샷 2026-01-18 오후 10 07 39" src="https://github.com/user-attachments/assets/1f3aaae1-8b78-4cee-a07f-8d98915f7a93" />
<img width="1920" height="921" alt="스크린샷 2026-01-18 오후 10 08 14" src="https://github.com/user-attachments/assets/0dec9ea2-a0ac-4f3c-8151-927e595ce925" />
<img width="1920" height="927" alt="스크린샷 2026-01-18 오후 10 08 27" src="https://github.com/user-attachments/assets/9dbde83b-e058-4e0d-bfaa-e0ca00a4cf7a" />


