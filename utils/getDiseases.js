import axios from 'axios';
import { BASE_URL } from '../actions/types';

let cache = [];

export default () => {
    return new Promise((resolve, reject) => {
        if (cache.length > 0) return resolve(cache);

        axios
            .get(BASE_URL + '/api/diseases')
            .then((res) => {
                cache = res.data;
                resolve(res.data);
            })
            .catch(reject);
    });
};
