import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function UserAuth(props) {
  const departmentApi = `/department`;

  const [data, setData] = useState([]);

  axios.defaults.withCredentials = true;

  const getDepartmentData = async () => {
    try {
      const { data } = await axios.get(`${departmentApi}`, {
        withCredentials: true,
      });
      return { data: data.data };
    } catch (error) {
      console.log(error);
    }
  };

  async function myFunction() {
    try {
      const result = await getDepartmentData();

      if (result.data) {
        setData(result.data);
      } else {
        alert("학과 정보를 받아오지 못했습니다.");
      }
    } catch (error) {
      console.log(
        "알수 없는 오류로 학과 정보를 받아오지 못했습니다. 관리자에게 문의하세요.",
        error
      );
    }
  }

  useEffect(() => {
    myFunction();
  });

  const navigate = useNavigate();

  // 해야할거
  // 1. useEffect 뭐할때마다 렌더링 되는거 고치기
  // 2. 회원가입후 리다이렉트 제대로 되게 하기
  // 3. css 생성

  // const [isSignUpActive, setIsSignUpActive] = useState(false);
  // const [isSignInActive, setIsSignInActive] = useState(false);

  // const handleSignUpClick = () => {
  //   setIsSignUpActive(true);
  // };

  // const handleSignInClick = () => {
  //   setIsSignUpActive(false);
  // };

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const pwHandler = (e) => {
    setPassword(e.target.value);
  };

  const [user_name, setUserName] = useState("");
  const [user_number, setUserId] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [department, setUserDepartment] = useState("");

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };
  const userIdHandler = (e) => {
    setUserId(e.target.value);
  };
  const userPasswordHandler = (e) => {
    setUserPassword(e.target.value);
  };
  const userDepartmentHandler = (e) => {
    setUserDepartment(e.target.value);
  };

  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const setToken = () => {
    dispatch({
      type: "SET_TOKEN",
      payload: true,
    });
  };

  useEffect(() => {
    console.log("현재 토큰: ", token);
  }, [token]);

  const userSignIn = async () => {
    try {
      const Data = JSON.stringify({
        user_number: id,
        password: password,
      });

      const response = await axios({
        method: "POST",
        url: "/signin",
        data: Data,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.data);

      if (response.data.status === "200") {
        setToken();
        navigate("/main");
      } else if (response.data.status === "201") {
        alert(response.data.server);
      } else if (response.data.status === "203") {
        alert(response.data.server);
      } else {
        alert("다시 시도 해주세요.");
      }
    } catch (error) {
      alert(
        "알수없는 오류로 실패 했습니다. 재시도후 로그인 실패시 관리자에게 문의하세요.",
        error
      );
    }
  };

  const userSignup = async () => {
    try {
      const Data = JSON.stringify({
        user_name: user_name,
        user_number: user_number,
        password: user_password,
        department: department,
      });

      const response = await axios({
        method: "POST",
        url: "/signup",
        data: Data,
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);

      if (response.data.status === "200") {
        alert("회원가입이 완료되었습니다!");
        return window.location("/");
      } else if (response.data.status === "201") {
        alert(response.data.server);
      } else if (response.data.status === "203") {
        alert(response.data.server);
      } else {
        alert("다시 시도 해주세요.");
      }
    } catch (error) {
      alert(
        "알수없는 오류로 실패 했습니다. 재시도후 회원가입 실패시 관리자에게 문의하세요.",
        error
      );
    }
  };

  return (
    <div>
      <h1>제일 첫 화면</h1>
      <div className="AuthContainer">
        <div className="FormContainer">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>회원가입</h1>
            <label>이름</label>
            <input
              type="text"
              placeholder="NAME"
              value={user_name}
              onChange={userNameHandler}
            ></input>
            <label>아이디</label>
            <input
              type="text"
              placeholder="ID"
              value={user_number}
              onChange={userIdHandler}
            ></input>
            <label>비밀번호</label>
            <input
              type="text"
              placeholder="PASSWORD"
              value={user_password}
              onChange={userPasswordHandler}
            ></input>
            <label>학과</label>
            <select
              value={department}
              onChange={userDepartmentHandler}
              required
            >
              {data.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <button type="submit" onClick={userSignup}>
              회원가입
            </button>
          </form>
        </div>
        <div className="FormContainer">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>로그인</h1>
            <label>아이디</label>
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={idHandler}
            ></input>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={pwHandler}
            ></input>
            <button type="submit" onClick={userSignIn}>
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserAuth;
