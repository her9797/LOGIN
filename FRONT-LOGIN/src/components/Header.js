import { Link, useNavigate } from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import 'bootstrap-icons/font/bootstrap-icons.css';
import { decodeJwt } from '../utils/tokenUtils';
import { useDispatch, useSelector } from 'react-redux';
import { callLogoutAPI } from '../apis/MemberAPICalls';
import { useEffect, useState } from 'react';
import { callDeleteNoticeListAPI, callSelectNoticeListAPI } from '../apis/NoticeAPICalls';
import dayjs from 'dayjs';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = window.localStorage.getItem("accessToken");
    const memberInfo = token ? decodeJwt(token) : null;
    const imageUrl = memberInfo ? `/img/${memberInfo.imageUrl}` : null;

    console.log(imageUrl);

    const memberId = memberInfo ? memberInfo.memberId : null;
    const result = useSelector(state => state.noticeReducer);
    const noticeList = result?.noticeList?.response?.data?.result || [];
    const [unreadNoticeCount, setUnreadNoticeCount] = useState(0);

    const onClickLogoutHandler = (event) => {
        event.preventDefault();
        dispatch(callLogoutAPI())
            .then(() => {
                window.localStorage.removeItem("accessToken");
                alert('로그아웃합니다');
                navigate("/login", { replace: true });
            })
            .catch(error => {
                console.error("Error during logout:", error);
            });
    };

    useEffect(() => {
        if (memberId) {
            dispatch(callSelectNoticeListAPI(memberId));
        }
    }, [dispatch, memberId]);

    useEffect(() => {
        if (result?.noticeList?.response?.data) {
            setUnreadNoticeCount(result.noticeList.response.data.count);
        }
    }, [result]);

    const handleDeleteNotices = () => {
        dispatch(callDeleteNoticeListAPI(memberId))
            .then(() => {
                setUnreadNoticeCount(0);
                dispatch(callSelectNoticeListAPI(memberId));
            })
            .catch(error => {
                console.error("Error deleting notices:", error);
            });
    };

    const parseDate = (dateData) => {
        if (Array.isArray(dateData)) {
            return dayjs(new Date(dateData[0], dateData[1] - 1, dateData[2], dateData[3], dateData[4])).format('YYYY-MM-DD hh:mm');
        } else {
            return dayjs(dateData).format('YYYY-MM-DD hh:mm');
        }
    };

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-between">
                <Link to="/" className="logo d-flex align-items-center">
                    <img src="img/logo.png" alt="Logo" />
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>
            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    <li className="nav-item dropdown">
                        <Link to="/chatRoomList" className="nav-link nav-icon">
                            <i className="bi bi-chat-right-dots"></i>
                            <span className="badge bg-primary badge-number"></span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="#" className="nav-link nav-icon" data-bs-toggle="dropdown">
                            <i className="bi bi-bell"></i>
                            <span className="badge badge-number" style={{ backgroundColor: '#FA6060' }}>{unreadNoticeCount.toString().padStart(1, '0')}</span>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications" style={{ width: '300px', height: '480px' }}>
                            <div>
                                <li className="dropdown-header" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0px' }}>
                                    <span style={{ fontSize: '15px' }}>알림 내역</span>
                                    <Link to="#" onClick={handleDeleteNotices}><i className="bi bi-trash-fill"></i></Link>
                                </li>
                            </div>
                            <hr />
                            {noticeList.slice(0, 4).map((notice, index) => (
                                <li key={index} className="notification-item">
                                    <i className="bi bi-exclamation-circle text-warning"></i>
                                    <div>
                                        <h4>{notice.noticeType}</h4>
                                        <p>{notice.noticeContent}</p>
                                        <p>{parseDate(notice.noticeDateTime)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to="/receiveNoteList" className="nav-link nav-icon">
                            <i className="bi bi-envelope"></i>
                            <span className="badge bg-success badge-number"></span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown pe-3">
                        {memberInfo && (
                            <Link to="#" className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                                <img src={imageUrl} alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{memberInfo.name} </span>
                            </Link>
                        )}
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{memberInfo ? memberInfo.name : ''}</h6>
                                <span>{memberInfo ? memberInfo.positionName : ''}</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link to="myProfile" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link to="users-profile.html" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-gear"></i>
                                    <span>Account Settings</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link to="#" className="dropdown-item d-flex align-items-center">
                                    <i className="bi bi-question-circle"></i>
                                    <span>Need Help?</span>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <button className="dropdown-item d-flex align-items-center" onClick={onClickLogoutHandler}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
