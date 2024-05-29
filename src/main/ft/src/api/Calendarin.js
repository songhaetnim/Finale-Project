import React, { useState } from 'react';
import CalendarButton from './CalendarButton'; // CalendarButton 컴포넌트를 import 합니다.
import Calendar from './Calendar'; // Calendar 컴포넌트를 import 합니다.
import './Main.css'; // Main.css 파일을 import 합니다.

const Main = () => {
  // 캘린더 표시 여부를 관리하는 상태
  const [showCalendar, setShowCalendar] = useState(false);

  // 캘린더 표시 여부를 토글하는 함수
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // 주문 클릭을 처리하는 함수
  const handleOrderClick = (date) => {
    console.log(`주문 클릭: ${date}`);
    // 여기에 주문 클릭 처리 로직을 추가하세요.
  };
  
  return (
    <div className="main-container" style={{textAlign:'end'}}> {/* textAlign:'end'로 맨 오른쪽으로 보냄 */}
      <CalendarButton goOrderListView={toggleCalendar} />
      {showCalendar && <Calendar handleOrderClick={handleOrderClick} />}
    </div>
  );
};

export default Main;
