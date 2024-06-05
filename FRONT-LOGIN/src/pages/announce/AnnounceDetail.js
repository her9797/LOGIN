import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ancDetailAPI } from '../../apis/AncAPICalls';
import { ancDeleteAPI } from '../../apis/AncAPICalls';
import '../../css/announce/ancDetail.css';
import DeleteRoomModal from '../chatting/DeleteModal'; // DeleteRoomModal 임포트
import { decodeJwt } from '../../utils/tokenUtils';

function AnnounceDetail() {
    const navigate = useNavigate();
    const { ancNo } = useParams();
    const [announceDetailFiles, setAnnounceDetailFiles] = useState(null);
    const [announceDetails, setAnnounceDetails] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const contentRef = useRef(null);

    const token = window.localStorage.getItem('accessToken');
    const role = token ? decodeJwt(token).role : null;


    const marginButtonGroup = {
        marginLeft: '90%'
    }

    useEffect(() => {
        const getAnnounceDetail = async () => {
            try {
                const data = await ancDetailAPI(ancNo);
                if (data.files && data.files.length > 0) {
                    // 파일이 있는 경우
                    setAnnounceDetails(data.announce);
                    setAnnounceDetailFiles(data.files);
                } else {
                    // 파일이 없는 경우
                    setAnnounceDetails(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getAnnounceDetail();
    }, [ancNo]);

    const downloadFile = (fileName, fileContent) => {
        const binary = atob(fileContent);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleDeleteModalOpen = () => {
        setShowModal(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            // ancDeleteAPI 함수를 호출하여 해당 공지사항을 삭제
            const response = await ancDeleteAPI(ancNo);
            navigate('/announces');
        } catch (error) {
            // 삭제에 실패한 경우 오류를 콘솔에 출력합니다.
            console.error('Error deleting announcement:', error.message);
        }
    };

    const handleDeleteCancelled = () => {
        setShowModal(false);
    };

    const handleUpdate = () => {
        navigate(`/updateAnnounces/${ancNo}`);
    };

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            contentRef.current.style.height = `${contentHeight}px`;
        }
    }, [announceDetails]);

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>공지사항 상세</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><Link to="/announcements">공지사항</Link></li>
                        <div className="col-sm-10" style={marginButtonGroup}>
                            {role === 'ADMIN' && (
                                <>
                                    <button className="deleteButton" onClick={handleDeleteModalOpen}>
                                        삭제
                                    </button>
                                    <button className="updateButton" onClick={handleUpdate}>
                                        수정
                                    </button>
                                </>
                            )}
                            <button className="listButton" onClick={() => navigate('/announces')}>목록</button>
                        </div>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12">
                <div className="card">
                    <h5 className="card-title"></h5>
                    <div className="content">
                        {announceDetails && (
                            <React.Fragment>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-1 col-form-label">제목</label>
                                    <div className="col-sm-10">
                                        <textarea className="textarea" readOnly value={announceDetails.ancTitle} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-1 col-form-label">작성일</label>
                                    <div className="col-sm-10">
                                        <textarea className="textarea" readOnly value={announceDetails.ancDate} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-1 col-form-label">작성자</label>
                                    <div className="col-sm-10">
                                        <textarea className="textarea" readOnly value={announceDetails.ancWriter} />
                                    </div>
                                </div>
                                {announceDetailFiles && announceDetailFiles.length > 0 && announceDetailFiles.map((file, index) => (
                                    <div className="row mb-3" key={file.fileNo}>
                                        <label htmlFor="inputText" className="col-sm-1 col-form-label">파일</label>
                                        <div className="col-sm-10">
                                            <div>
                                                <textarea readOnly className="textarea-file" key={file.fileNo} value={file.fileName} />
                                                <button className="downloadButton" onClick={() => downloadFile(file.fileName, file.fileContent)}>다운로드</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="row mb-3">
                                    <label htmlFor="inputText" className="col-sm-1 col-form-label">본문</label>
                                    <div className="col-sm-10">
                                        <div className="editorStyle" ref={contentRef} dangerouslySetInnerHTML={{ __html: announceDetails.ancContent }}></div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
            {/* 모달 */}
            <DeleteRoomModal
                show={showModal}
                handleClose={handleDeleteCancelled}
                handleConfirmDelete={handleDeleteConfirmed}
                handleCancelDelete={handleDeleteCancelled}
            />
        </main>
    );
}

export default AnnounceDetail;
