import axios from 'axios'



export function request(config) {
    // 创建axios实例
    const instance = axios.create({
        timeout: 5000
    });

    return instance(config);
}