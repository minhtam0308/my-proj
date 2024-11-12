

export const accounted_user = 'acount_successful';

export const doLog = (data) => {
    return {
        type: accounted_user,
        payload: data
    }
}