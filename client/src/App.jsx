import { useState, useEffect } from 'react';
import './App.css'; // 스타일 파일 (일단 놔둡니다)

function App() {
  // 1. 데이터를 담을 '그릇' (State) 만들기
  // posts: 실제 데이터, setPosts: 데이터를 바꾸는 함수
  const [posts, setPosts] = useState([]);

  // 2. 화면이 켜지자마자 실행되는 함수 (useEffect)
  useEffect(() => {
    // 백엔드(8080)에 데이터 달라고 요청
    //fetch('http://localhost:8080/')
      fetch('/api/posts')
      .then(res => res.json()) // 받아온 데이터를 JSON으로 변환
      .then(data => {
        console.log(data); // 콘솔에 찍어보고
        setPosts(data);    // 그릇(State)에 담기 -> 화면이 자동으로 바뀜!
      })
      .catch(err => console.error("에러 발생:", err));
  }, []);

  return (
    <div className="App">
      <h1>내 글 목록</h1>
      
      {/* 3. 데이터 개수만큼 반복문 돌리기 (map) */}
      <div className="list-container">
        {posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            {/* DB 컬럼명에 맞춰서 출력 (예: post.title, post.content) */}
            <h3>{post.title}</h3> 
            <p>{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;