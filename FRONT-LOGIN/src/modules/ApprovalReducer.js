import { createActions, handleActions } from "redux-actions";
import { submitApprovalAPI, updateApprovalAPI } from "../apis/ApprovalAPI";

const initialState = {
  fg: 'given',
  title: '',
  pageInfo: { totalPages: 0, currentPage: 0 },
  approvals: [],
  members: [],
  forms: [],
  files:[],
  uploadStatus: null,
  approvalStatus : null,
  approvalDetail : null,
  loading: false,
  error: null,
};




// 액션 타입 및 액션 생성자 정의
export const {
  setFg,
  setTitle,
  setPageInfo,
  fetchApprovalsSuccess,
  fetchApprovalsFailure,
  deleteApprovalSuccess,
  deleteApprovalFailure,
  updateApprovalStatus,
  setLoading,
  fetchFormsSuccess,
  fetchFormsFailure,
  getAllMembers,
  submitApprovalSuccess,
  submitApprovalFailure,
  updateApprovalSuccess,
  updateApprovalFailure,
  fetchApprovalDetailSuccess,
  fetchApprovalDetailFailure,
} = createActions({
  SET_FG: (fg) => fg,
  SET_TITLE: (title) => title,
  SET_PAGE_INFO: (pageInfo) => pageInfo,
  FETCH_APPROVALS_SUCCESS: (approvals) => approvals,
  FETCH_APPROVALS_FAILURE: (error) => error,
  DELETE_APPROVAL_SUCCESS: (approvalNo) => approvalNo,
  DELETE_APPROVAL_FAILURE: (error) => error,
  UPDATE_APPROVAL_STATUS: (approvalNo, status) => ({ approvalNo, status }),
  SET_LOADING: (loading) => loading,
  FETCH_FORMS_SUCCESS: (forms) => forms,
  FETCH_FORMS_FAILURE: (error) => error,
  GET_ALL_MEMBERS: (members) => members,
  SUBMIT_APPROVAL_SUCCESS: () => {},
  SUBMIT_APPROVAL_FAILURE: (error) => error,
  UPDATE_APPROVAL_SUCCESS: (data) => data,
  UPDATE_APPROVAL_FAILURE: (error) => error,
  FETCH_APPROVAL_DETAIL_SUCCESS: (approvalDetail) => approvalDetail,
  FETCH_APPROVAL_DETAIL_FAILURE: (error) => error,
});



// 리듀서 정의
const approvalReducer = handleActions(
  {
    [setFg]: (state, { payload }) => ({
      ...state,
      fg: payload,
      pageInfo: { totalPages: 0, currentPage: 0 },
    }),
    [setTitle]: (state, { payload }) => ({
      ...state,
      title: payload,
      pageInfo: { totalPages: 0, currentPage: 0 },
    }),
    [setPageInfo]: (state, { payload }) => ({
      ...state,
      pageInfo: payload,
    }),
    [fetchApprovalsSuccess]: (state, { payload }) => ({
      ...state,
      approvals: payload,
      error: null,
    }),
    [fetchApprovalsFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [deleteApprovalSuccess]: (state, { payload }) => ({
      ...state,
      approvals: state.approvals.filter((a) => a.approvalNo !== payload),
      error: null,
    }),
    [deleteApprovalFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [updateApprovalStatus]: (state, { payload }) => ({
      ...state,
      approvals: state.approvals.map((approval) =>
        approval.approvalNo === payload.approvalNo
          ? { ...approval, approvalStatus: payload.status }
          : approval
      ),
    }),
    [setLoading]: (state, { payload }) => ({
      ...state,
      loading: payload,
    }),
    [fetchFormsSuccess]: (state, { payload }) => ({
      ...state,
      forms: payload,
      error: null,
    }),
    [fetchFormsFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [getAllMembers]: (state, { payload }) => ({
      ...state, 
      members: payload,
    }),
    [submitApprovalSuccess]: (state) => ({
      ...state,
      approvalStatus: 'success',
      error: null,
    }),
    [submitApprovalFailure]: (state, { payload }) => ({
      ...state,
      approvalStatus : 'failure',
      error: payload,
    }),
    [updateApprovalSuccess]: (state, { payload }) => ({
      ...state,
      approvals: state.approvals.map((approval) =>
        approval.approvalNo === payload.approvalNo ? payload : approval
    ),
    error: null,
    }),
    [updateApprovalFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [fetchApprovalDetailSuccess]: (state, { payload }) => ({
      ...state,
      approvalDetail: payload,
      error: null,
    }),
    [fetchApprovalDetailFailure]: (state, { payload }) => ({
      ...state,
      error: payload,
    })
  },
  initialState
);



export default approvalReducer;