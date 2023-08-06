import fetch from 'node-fetch';

export function getAccessTokenError() {
        return fetch('/access_token_error').then(
            (response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                }
                )
            }
        ).then(() => {
            console.log('not occured');
            return null;
        }).catch(err => {
            return err.message;
        })
    }