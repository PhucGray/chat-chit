export const getUserIDFromLocalStorage = () => localStorage.getItem('uid');
export const getDocIdFromLocalStorage = () => localStorage.getItem('id');

export const setDocIdToLocalStorage = (uid?: string) =>
    localStorage.setItem('id', uid || '');

export const setUIDToLocalStorage = (uid?: string) =>
    localStorage.setItem('uid', uid || '');

// remove: firebase.ts/logout()
