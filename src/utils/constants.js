export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "/auth";
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const APP_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`
export const LOGOUT_ROUTES = `${AUTH_ROUTES}/logout`;
 

export const CONTACTS_ROUTES = '/contacts'
export const SEARCH_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/search`
export const GET_DM_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-contact-for-dm`
export const GET_ALL_CONTACTS_ROUTE = `${CONTACTS_ROUTES}/get-all-contacts`


export const MESSAGES_ROUTES = '/messages';
export const GET_ALL_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/get-messages`;
export const UPLOAD_FILES_ROUTE = `${MESSAGES_ROUTES}/upload-file`;


export const CHANNEL_ROUTES = '/channel';
export const CREATE_CHANNEL_ROUTE = `${CHANNEL_ROUTES}/create-channel`;
