export const setAutheticated = () =>
    localStorage.setItem('authenticated', 'true');

export const getAuthenticated = () => localStorage.getItem('authenticated');
