import { Dispatch } from 'redux';
import { actionTypes } from '../constants/actionTypes';
import {
  SaveSearch,
  GetSearchImage,
  ImageResults,
  GetProfile,
  ImageObj,
  LikedImage,
  DeleteImageAsync,
} from './types';

export const actions = {
  saveSearch: (data: string): SaveSearch => ({
    type: actionTypes.SAVE_SEARCH,
    payload: data,
  }),
  getSearchImage: (images: ImageResults): GetSearchImage => ({
    type: actionTypes.GET_SEARCH_IMAGE,
    payload: images,
  }),
  getProfile: (images: ImageResults): GetProfile => ({
    type: actionTypes.GET_PROFILE,
    payload: images,
  }),
  likedImage: (image: ImageObj): LikedImage => ({
    type: actionTypes.LIKED_IMAGE,
    payload: image,
  }),
  deleteImageAsync: (image: ImageObj): DeleteImageAsync => ({
    type: actionTypes.DELETE_IMAGE,
    payload: image,
  }),
  toggleModal: (modalObj: {}) => ({
    type: actionTypes.TOGGLE_MODAL,
    payload: modalObj,
  }),
  dropModal: () => ({
    type: actionTypes.DROP_MODAL,
  }),
  loginUser: (userId: number, userName: string) => ({
    type: actionTypes.LOGIN,
    payload: { userId, userName },
  }),
  logoutUser: () => ({
    type: actionTypes.LOGOUT,
  }),
  signupUser: (userId: number, userName: string) => ({
    type: actionTypes.SIGNUP,
    payload: { userId, userName },
  }),
};
export const getSearchImageAsync = (searchWord: string) =>
  function(dispatch: Dispatch) {
    return fetch('http://localhost:3000/searchImages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ image: searchWord }),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(actions.getSearchImage(response));
        dispatch(actions.saveSearch(''));
      });
  };

export const getProfileAsync = (userId: number) =>
  function(dispatch: Dispatch) {
    return fetch(`http://localhost:3000/getDbImages?userId=${userId}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(actions.getProfile(response));
      });
  };

export const getLikedImageAsync = (image: any) =>
  function(dispatch: Dispatch) {
    return fetch('http://localhost:3000/addImageToFavsTable', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ image }),
    }).then(() => {
      dispatch(actions.likedImage(image));
    });
  };

export const deleteImageAsync = (image: any) =>
  function(dispatch: Dispatch) {
    return fetch('http://localhost:3000/removeImageFromFavTable', {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ image }),
    })
      .then(() => {
        dispatch(actions.deleteImageAsync(image));
      })
      .catch(err => {
        console.log(err);
      });
  };

export const loginUserAsync = (userName: string, pw: string) =>
  function(dispatch: Dispatch) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, pw }),
    })
      .then(response => response.json())
      .then(response => {
        // if response status is 200
        console.log(response);
        dispatch(actions.loginUser(response.userId, response.userName));
      })
      .catch(err => {
        console.log(err);
      });
  };

export const signupUserAsync = (userName: string, pw: string) =>
  function(dispatch: Dispatch) {
    return fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, pw }),
    })
      .then(response => response.json())
      .then(response => {
        // if response status is 200
        console.log(response);
        dispatch(actions.signupUser(response.userId, response.userName));
      })
      .catch(err => {
        console.log(err);
      });
  };
