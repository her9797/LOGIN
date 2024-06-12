import { createActions, handleActions } from 'redux-actions';

const initialState = {
    insertProposal: null,
    proposalList: [],
};

export const POST_PROPOSAL = 'proposal/POST_PROPOSAL';
export const GET_PROPOSALS = 'proposal/GET_PROPOSALS';

const actions = createActions({
    [POST_PROPOSAL]: () => {},
    [GET_PROPOSALS]: (proposalList) => proposalList
});

const proposalReducer = handleActions({
    [POST_PROPOSAL]: (state, { payload }) => ({ ...state, insertProposal: payload }),
    [GET_PROPOSALS]: (state, { payload }) => ({ ...state, proposalList: payload })
}, initialState);

export default proposalReducer;
