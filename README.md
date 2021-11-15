# DeliveryTogether
<img width="400" alt="DeliveryTogether_Logo" src="https://user-images.githubusercontent.com/71224672/131435784-d797e9e5-2f77-43bc-a1f8-8decff4336b1.png" alt="image-20210830221721743" style="zoom:50%;">

사용자의 현재 위치를 기반으로 주변에 같이 배달시킬 사람을 찾아주는 서비스입니다.

## 🍚 프로젝트 사용 기술
- [React-native](https://reactnative.dev)
- [React-Redux](https://react-redux.js.org/)
- [Expo](https://expo.dev)
- [SpringBoot](https://spring.io/projects/spring-boot)
- [Firebase](https://firebase.google.com/)
- [Google-Cloud](https://console.cloud.google.com/?hl=ko&_ga=2.77549265.5140705.1630379894-826656968.1617737960&_gac=1.90576616.1630390580.Cj0KCQjwg7KJBhDyARIsAHrAXaERcEli1PU00kSdHJP_n5HwslnFjxzU6IPBDcqcz4bD0kIACkHF9UQaAmduEALw_wcB)
- [GoogleMap](https://developers.google.com/maps?hl=ko)
- [Geolocation](https://developers.google.com/maps/documentation/javascript/geolocation)

- [StyleSheet](https://developer.mozilla.org/ko/docs/Web/API/StyleSheet)
- [Sourcetree](https://www.sourcetreeapp.com/)


## 🍚 프로젝트 포커스
- github에 작업사항을 올릴때 comment를 필수로 남겼습니다.<br>
- 효율적인 형상관리를 위해 브랜치전략을 세웠습니다.<br>
- firebase API를 팀원들과 공유할 때 보안에 노력하였습니다.<br>
- 어떠한 기술을 사용할 때는 그 기술을 사용하는 이유에 대하여 이해하고 사용하였습니다.<br>
- 사전에 정의한 데이터베이스 구조를 지키면서 진행하기 위해 노력하였습니다.<br>
- 데이터베이스에 사용자 개인정보를 넣을때 암호화를 진행하여 보안을 신경썼습니다.<br>
- 다양한 입력값을 토대로 테스트를 진행하여 결함을 줄이고자 노력하였습니다.<br>
- 데이터베이스 접근을 최소화 하도록 노력하였습니다.<br>
- 모든 팀원들이 동일한 환경에서 작업할 수 있도록 노력하였습니다.<br>

## 🍚 브랜치 전략
[참고) 우아한 형제들 기술 블로그 - 우린 Git-flow를 사용하고 있어요](https://techblog.woowahan.com/2553/)
- `main` : 배포시 사용하는 브랜치
- `develop`: 다음 출시 버전을 개발하는 브랜치
  - 다음 릴리즈를 위해 언제든 배포될 수 있는 상태
  - 하나의 기능 구현이 끝나면, develop 브랜치로 병합할 것
- `feature` 
  - 다음 릴리즈를 위해 언제든 배포될 수 있는 상태
  - 하나의 기능 구현이 끝나면, develop 브랜치로 병합할 것
    : 기능을 개발하는 브랜치
  - 기능을 완성할 때 까지 유지하며, 완성시 `develop`브랜치로 merge
  - `feature`는 이슈번호를 기준으로 생성
  - Ex) `feature-2/example`
  - 다음 릴리즈를 위해 언제든 배포될 수 있는 상태
  - 하나의 기능 구현이 끝나면, develop 브랜치로 병합할 것
    : 기능을 개발하는 브랜치
  - 기능을 완성할 때 까지 유지하며, 완성시 `develop`브랜치로 merge
  - `feature`는 이슈번호를 기준으로 생성
  - Ex) `feature-2/example`
- `release` : 릴리즈를 준비하는 브랜치(QA)
- `hotfix` : 배포 버전에서 생긴 문제로 긴급한 트러블 슈팅이 필요할 때 개발이 진행되는 브랜치


## 🍚 Commit Message
- `Add` : 클래스, 설정파일 등의 새로운 파일 추가
- `Feat` : 새로운 기능 추가
- `Docs` : 문서 수정
- `Test` : 테스트 코드 작성
- `Chore` : 기타 변경 사항(빌드 스크립트 수정 등)
- `Fix` : 올바르지 않은 코드를 고친 경우
- `Update` : 수정, 추가, 보완(주로 코드가 아닌 버전 업데이트)
- `Refactor` : 코드의 리팩토링
- `Remove` : 코드의 삭제

## 🍚 화면 구성도
![image](https://user-images.githubusercontent.com/71224672/141777412-fe7b9d6a-41de-40d2-a822-d9380669ae6a.png)


## 🍚 시작하기
### Prerequisites
- npm
>```
>npm install npm@latest -g
>```

### Installation
1. Get a free API Key at [Firebase API](https://firebase.google.com/docs/projects/api-keys)
2. Get a free android, ios key at [Google Cloud](https://console.cloud.google.com/home/dashboard?project=deliverytogether-fdb&_ga=2.181757795.5140705.1630379894-826656968.1617737960&_gac=1.22410569.1630379921.Cj0KCQjwg7KJBhDyARIsAHrAXaH6I8vIlJzMWEmZdf1GnFqcx9188eOzIe88P0iESWFcMnn95rbiVUUaAm00EALw_wcB&pli=1)
3. Clone the repo
>```
>git clone https://github.com/yu-capstone-design/delivery-together.git
>```
4. Install NPM packages
>```
>npm install
>```
5. Start
>```
>npm start
>```
