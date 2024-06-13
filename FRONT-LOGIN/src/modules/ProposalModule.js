import { createActions, handleActions } from 'redux-actions';

const initialState = {
    insertProposal: null,
    proposalList: [],
};

export const POST_PROPOSAL = 'proposal/POST_PROPOSAL';
export const GET_PROPOSALS = 'proposal/GET_PROPOSALS';
export const DELETE_PROPOSAL = 'proposal/DELETE_PROPOSAL';

const actions = createActions({
    [POST_PROPOSAL]: () => {},
    [GET_PROPOSALS]: (proposalList) => proposalList,
    [DELETE_PROPOSAL]: () => {}
});

const proposalReducer = handleActions({
    [POST_PROPOSAL]: (state, { payload }) => ({ ...state, insertProposal: payload }),
    [GET_PROPOSALS]: (state, { payload }) => ({ ...state, proposalList: payload }),
    [DELETE_PROPOSAL]: (state , {payload}) => ({ ...state, deleteProposal : payload })
}, initialState);

export default proposalReducer;
