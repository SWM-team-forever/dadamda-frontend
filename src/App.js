import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import Template1List from './components/Template1List';

const App = () => {
  const [articleTemplates, setArticleTemplates] = useState([
    {
      url: "https://velog.io/@sontulip/how-to-db-design",
      img: "https://velog.velcdn.com/images/sontulip/post/209631a1-7a9c-42ad-a808-25eb5e20e061/image.png",
      title: "DB 설계는 어떻게 해야 할까?",
      authorName: "sontulip",
      authorImage: "https://velog.velcdn.com/images/sontulip/profile/f94c4da5-277e-4b97-85b1-4f8a9ecce92c/image.jpeg",
      id: 1,
      type: "article",
      date: "2022-06-24",
      description: "도대체 어떻게 설계해야 할까? 😂",
      textContents: [],
      siteName: "velog",
    },
    {
      url: "https://crucifi.tistory.com/54",
      img: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbPoXgk%2FbtqyN3XpKhy%2Fx3qBuJdyKlFp2kYoRkOLYk%2Fimg.png",
      title: "(HTML,CSS)핀터레스트 스타일 레이아웃 만들기",
      authorName: "Crucifi",
      authorImage: "https://t1.daumcdn.net/cfile/tistory/993E7E3C5D64311A07",
      id: 2,
      type: "article",
      date: "2019-10-3",
      description: "이번 시간에는 앞서 배웠던 html과 css를 이용해서 핀터레스트 스타일의 레이아웃을 만들 겁니다. 핀터레스트 사이트에 접속하시면 이렇게 구조화가 되어있습니다. 이것을 masonry라고 하며 masonry는 벽돌을 쌓는 공사, 석조라는 의미를 가지고 있습니다. 사진 공유 서비스인 핀터레스트가 인기를 끈 이후에 핀터레스트와 같은 스타일의 레이아웃이 크게 인기를 끌었는데요. 이러한 모양의 레이아웃을 masonry 레이아웃이라고 합니다. 여기서는 masonry을 만드는 방법을 알아보겠습니다. change view로 코드들을 먼저 살펴보겠습니다. 여기 이 코드 들을 참조해서 만들어볼게요. 스파이더맨 배경화면 이렇게 여러 개를 만들고 나면 이렇게 일자로 쭉 나열되어 있습니다. 위의 핀터레스트 형태로 만들기 위해 ..",
      textContents: [],
      siteName: "tistory",
    },
    {
      url: "https://tlsdnjs12.tistory.com/56",
      img: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb4TH7r%2FbtrAqJjqzol%2F0n8zcpeoMnHcjHKEFVh1S1%2Fimg.png",
      title: "[리액트 오류] TypeError: Cannot read property 'map' of undefined",
      authorName: "서스포PAR",
      authorImage: "https://tistory1.daumcdn.net/tistory/4974789/attach/135b08480bcb43cf941e894e8f6c80f5",
      id: 3,
      type: "article",
      date: "2022-04-26",
      description: "🤦‍♀️ 문제의 발단 벨로퍼트님의 모던 리액트 1-13장 배열에 항목 추가하기에서 오류가 발견하였다. 배열로 잘 뜨는데 왜? Uncaught TypeError: Cannot read properties of undefined (reading 'map') 가 뜨는 것인가? import React from 'react'; const UserList = ({ user }) => { console.log(user); // 0: {id: 1, username: '홍길동', email: '123@naver.com'} // 1: {id: 2, username: '김철수', email: '456@naver.com'} // 2: {id: 3, username: '김영희', email: '789@naver.com'} re..",
      textContents: [],
      siteName: "tistory",
    },
    {
      url: "https://medium.com/@davidpogue/my-first-immersion-in-apple-vision-pro-heavy-man-d99f0a940c7c",
      img: "https://miro.medium.com/v2/resize:fit:936/1*9Ptr0j3f7qdkuzr2-ZXPNQ.png",
      title: "My First Immersion in Apple Vision Pro: Heavy, Man!",
      authorName: "David Pogue",
      authorImage: "https://miro.medium.com/v2/resize:fill:55:55/0*eydIxmKMDspGrkXW.",
      id: 4,
      type: "article",
      date: "2023-06-07",
      description: "This morning, I spent half an hour trying the Apple Vision Pro headset. Here’s the punch line: This is one freaking mind-blowing piece of tech. I mean, when Steve Jobs unveiled the iPhone in 2007…",
      textContents: [],
      siteName: "medium",
    },
    {
      url: "https://tlsdnjs12.tistory.com/56",
      img: "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb4TH7r%2FbtrAqJjqzol%2F0n8zcpeoMnHcjHKEFVh1S1%2Fimg.png",
      title: "[리액트 오류] TypeError: Cannot read property 'map' of undefined",
      authorName: "서스포PAR",
      authorImage: "https://tistory1.daumcdn.net/tistory/4974789/attach/135b08480bcb43cf941e894e8f6c80f5",
      id: 5,
      type: "article",
      date: "2022-04-26",
      description: "🤦‍♀️ 문제의 발단 벨로퍼트님의 모던 리액트 1-13장 배열에 항목 추가하기에서 오류가 발견하였다. 배열로 잘 뜨는데 왜? Uncaught TypeError: Cannot read properties of undefined (reading 'map') 가 뜨는 것인가? import React from 'react'; const UserList = ({ user }) => { console.log(user); // 0: {id: 1, username: '홍길동', email: '123@naver.com'} // 1: {id: 2, username: '김철수', email: '456@naver.com'} // 2: {id: 3, username: '김영희', email: '789@naver.com'} re..",
      textContents: [],
      siteName: "tistory",
    },
  ]
  );

  // const [productTemplates, setProductTemplates] = useState([
  //   {
  //     url : "https://www.11st.co.kr/products/pa/5681226420?trTypeCd=03&trCtgrNo=2132157",
  //     img : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5681226420/B.jpg?142000000",
  //     title : "[11번가] 미쟝센 퍼펙트 세럼, 샴푸, 680ml, 오리지널, 3개",
  //     id : 6,
  //     type : "product",
  //     price : "25,500원",
  //     site : "11번가"
  //     },
  //     {
  //     url : "https://www.11st.co.kr/products/2372223219?trTypeCd=22&trCtgrNo=895019",
  //     img : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/pd/v3/2/2/3/2/1/9/zmlzU/2372223219_B.jpg",
  //     title : "[11번가] 삼성전자 오디세이 게이밍 모니터 C49RG90 49인치 듀얼 QHD HDR QLED 120Hz",
  //     id : 7,
  //     type : "product",
  //     price : "1,390,000원",
  //     site : "11번가"
  //     },
  //     {
  //     url : "https://www.11st.co.kr/products/pa/4940434685?inpu=&trTypeCd=22&trCtgrNo=895019",
  //     img : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/4940434685/B.jpg?588000000",
  //     title : "[11번가] 펩시콜라 제로슈거 라임향, 355ml, 24개",
  //     id : 8,
  //     type : "product",
  //     price : "17,090원",
  //     site : "11번가"
  //     },
  //     {
  //     url : "https://www.11st.co.kr/products/5879926713?inpu=&trTypeCd=22&trCtgrNo=895019",
  //     img : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5879926713/B.jpg?100000000",
  //     title : "[11번가] [투썸플레이스] 애플 망고 케이크 빙수",
  //     id : 9,
  //     type : "product",
  //     price : "11,470원",
  //     site : "11번가"
  //     },
  //     {
  //     url : "https://www.11st.co.kr/products/5180197521?inpu=&trTypeCd=&trCtgrNo=",
  //     img : "https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5180197521/B.jpg?336000000",
  //     title : "[11번가] [쿠쿠]쿠쿠 전기압력밥솥 6인용(CRP-P0660FD)",
  //     id : 10,
  //     type : "product",
  //     price : "132,180원",
  //     site : "11번가"
  //     },
  // ]
  // );

  const [videoTemplates, setVideoTemplates] = useState([
    {
      url : "https://www.youtube.com/watch?v=ujKDDyihYLY",
      thumbnail: "https://i.ytimg.com/vi/ujKDDyihYLY/maxresdefault.jpg",
      channelName: "B.O.M",
      title: "믿고 듣는 A J R 노래모음 l 에이제이알 노래 모음",
      views: 252476,
      type: "video",
      id: 11,
    },
    {
      url : "https://www.youtube.com/watch?v=M_O3FrpB4FEhttps://www.youtube.com/watch?v=ujKDDyihYLY",
      thumbnail: "https://i.ytimg.com/vi/M_O3FrpB4FE/maxresdefault.jpg",
      channelName: "디글 :Diggle",
      title: "[#알쓸범잡2] (2시간) 정황 증거만 있는 사건을 과학수사 기법으로 해결한 사건 모음! 혈흔, 흙, 보행 분석 등으로 진실을 밝히는 방법은? | #편집자는",
      views: 446054,
      type: "video",
      id: 12,
    },
    {
      url : "https://www.youtube.com/shorts/kIHbcrfjdWo",
      thumbnail: "https://i.ytimg.com/vi/kIHbcrfjdWo/hq2.jpg?sqp=-oaymwEoCOADEOgC8quKqQMcGADwAQH4Ae4CgALQBYoCDAgAEAEYVSBaKGUwDw==&rs=AOn4CLD_FqMhCfea3xy3WhizKBQjO5UbTQ",
      channelName: "@Diggle",
      title: "조나단ㅅㄲ의 웃참 불가 메이크업 더빙 #동네스타K2",
      views: 833161,
      type: "video",
      id: 13,
    },
    {
      url : "https://www.youtube.com/watch?v=Je0EkPPttEY",
      thumbnail: "https://i.ytimg.com/vi/Je0EkPPttEY/maxresdefault.jpg",
      channelName: "어퍼컷Tube",
      title: "1,800억의 유산이 걸린 미각 천재들의 대결!! 한국을 휩쓸었던 만화 《신의 물방울》 원작!! 2023년 애플TV+ 신작 드라마!!",
      views: 196547,
      type: "video",
      id: 14,
    },
    {
      url : "https://www.youtube.com/watch?v=UUOpe_sTKzA",
      thumbnail: "https://i.ytimg.com/vi/UUOpe_sTKzA/maxresdefault.jpg",
      channelName: "KBS 한국방송",
      title: "[#편스토랑] 평균 조리시간 단 10분! 어남선생표 ‘원팬 파스타’ 레시피 모음집💝 | KBS 방송",
      views: 1668369,
      type: "video",
      id: 15,
    },
    {
      url : "https://www.youtube.com/watch?v=S3_OYhSTmcc",
      thumbnail: "https://i.ytimg.com/vi/S3_OYhSTmcc/maxresdefault.jpg",
      channelName: "YouTube 영화",
      title: "원스",
      views: "???",
      type: "video",
      id: 16,
    },
  ]);

  const [initProductTemplates, setInitProductTemplates] = useState([]);
  const productURL = "https://0nyhd85jc9.execute-api.ap-northeast-2.amazonaws.com/beta/scrap";
  const getProductList = useCallback(
      () => 
      fetch(productURL)
      .then(response => response.json())
      .then(( data ) => {
        return data
      })
    );
  
  useEffect(() => {
    getProductList().then(data => setInitProductTemplates(data))
  }, [getProductList]);

  return (
    <Template1List templates = { initProductTemplates }/>
    //<Template1List templates = { articleTemplates } />
   // <Template1List templates = { videoTemplates } />
  )
}


export default App;
