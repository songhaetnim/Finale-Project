import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import '../../css/Calendar.css';

const Calendar = ({ handleOrderClick }) => {

  // 로그인 한 사용자정보 가져오기 위함
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  const [orders, setOrders] = useState([]);


// 로그인한 사용자 이메일 가져오기
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });
  }, [auth]);


  // 이메일로 로그인한 사용자 추가 정보 가져오기
  useEffect(() => {
    if (currentUserEmail) {
      const fetchUserInfo = async () => {
        try {
          const info = await selectUserData(currentUserEmail);  //selectUserData(함수) 이메일로 유저 디비에 있는걸 가져오고 info에저장
          setUserInfo(info); // user에 info = 유저에 저장

        } catch (error) {
          console.error('사용자 정보를 불러오는 중 에러:', error);
        }
      };
      fetchUserInfo();
    }
  }, [currentUserEmail]);


  // 서버에 요청해서 데이터를 가져옴 중요부분 백엔드 중요한부분
    if (currentUserEmail) {
      const fetchOrderHistory = async () => {
        try {                                                         // 가방 : 가방에 들어간 내용물,중복불가능 
          const response = await axios.post('/ft/order/historyList', { email: currentUserEmail }); //response 응답이라는 영어단어
          // axios 역활= 프론트와 서버중계, 원래는 Get의 역활은 데이터를 불러오는것이다. post는 데이터생성,업데이트, 제거 
          // 보안상 이유로 Get을 안쓰고  post를 쓴다.                     
          setOrders(response.data);
          console.log(response);
        } catch (error) {
          if (error.response) {
            console.error('주문 내역을 불러오는데 실패했습니다:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('주문 내역을 불러오는데 실패했습니다: 서버로부터 응답이 없습니다.');
          } else {
            console.error('주문 내역을 불러오는데 실패했습니다:', error.message);
          }
          setOrders([]);
        }
      };
      fetchOrderHistory();
    }
  }, [currentUserEmail]);





  // 각 날짜의 주문 수를 저장하는 상태. 초기값은 31개의 0으로 초기화된 배열
  const [orders, setOrders] = useState(new Array(31).fill(0));

  // 현재 월 상태를 저장 (1-12). 초기값은 현재 월
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  // 현재 연도 상태를 저장. 초기값은 현재 연도
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // 클릭한 날짜의 주문 상세 페이지로 이동하는 함수
  const handleDateClick = (date) => {
    const orderCount = orders[date - 1]; // 클릭한 날짜의 주문 수
    console.log(`${date}일의 주문 건수: ${orderCount}`);
    if (orderCount === 1) {
      // 만약 해당 날짜에 주문이 한 건이라면, 주문 상세 페이지로 이동
      handleOrderClick(date);
    }
  };

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      // 현재 월이 1월이면, 이전 달은 작년 12월
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      // 현재 월이 1월이 아니면, 그냥 이전 달로 설정
      setCurrentMonth(currentMonth - 1);
    }
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      // 현재 월이 12월이면, 다음 달은 내년 1월
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      // 현재 월이 12월이 아니면, 그냥 다음 달로 설정
      setCurrentMonth(currentMonth + 1);
    }
  };

  // 달력을 렌더링하는 함수
  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate(); // 현재 월의 총 일 수 계산
    const startingDay = new Date(currentYear, currentMonth - 1, 1).getDay(); // 현재 월의 시작 요일 계산
    const weeks = []; // 주 단위로 나눈 달력을 저장할 배열

    let currentDay = 1; // 현재 날짜를 1일로 초기화

    // 빈 날을 채우는 함수
    const fillEmptyDays = (count) => {
      const emptyDays = [];
      for (let i = 0; i < count; i++) {
        emptyDays.push(<td key={`empty-${i}`} className="empty-day"></td>); // 빈 <td> 요소를 생성
      }
      return emptyDays;
    };

    // 달력을 주 단위로 생성
    while (currentDay <= daysInMonth) {
      const week = [];
      if (weeks.length === 0) {
        week.push(...fillEmptyDays(startingDay)); // 첫 번째 주에 시작 요일까지 빈 칸을 채움
      }
      for (let i = week.length; i < 7; i++) {
        if (currentDay <= daysInMonth) {
          const orderCount = orders[currentDay - 1]; // 현재 날짜의 주문 수
          week.push(
            <td key={currentDay} className="calendar-day" onClick={() => handleDateClick(currentDay)}>
              <p id="t_day" className={`t${i}`}>
                {currentDay}
                {orderCount > 0 && <span className="order-count">{orderCount}건</span>} {/* 주문 수 표시 */}
              </p>
            </td>
          );
          currentDay++;
        } else {
          week.push(<td key={`empty-${i}`} className="empty-day"></td>); // 남은 칸을 빈 칸으로 채움
        }
      }
      weeks.push(<tr key={`week-${currentDay}`} className="calendar-week">{week}</tr>); // 주 단위로 <tr> 요소에 추가
    }

    return weeks; // 전체 달력 반환
  };



  // 주문서 가져오기.

  return (
    <div className="calendar-container">
      {/* 달력 헤더: 이전달, 현재 연도/월, 다음달 */}
      <ul className="calendar-header">
        <li className="prev">
          <button className="bt_prev" onClick={handlePrevMonth}>
            <FaAngleLeft /><span>이전달</span> {/* 이전달 버튼 */}
          </button>
        </li>
        <li className="date">
          <span className="year">{currentYear}년</span> {/* 현재 연도 */}
          <span className="month">{currentMonth.toString().padStart(2, '0')}월</span> {/* 현재 월 */}
        </li>
        <li className="next">
          <button className="bt_next" onClick={handleNextMonth}>
            <span>다음달</span><FaAngleRight /> {/* 다음달 버튼 */}
          </button>
        </li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>월</th> <th>화</th> <th>수</th> <th>목</th> <th>금</th> <th>토</th> <th>일</th> {/* 요일 헤더 */}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()} {/* 달력 본문 */}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
