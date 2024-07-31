import $http from "../plugin/http";
import axios, { Canceler, AxiosResponse, AxiosError } from 'axios';

export const Get = <R>(url: string = '', query?: { [key: string]: any }): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        $http.get(url, { params: query })
            .then((resp: AxiosResponse<R>) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });

    return request;
};

export const Post = <M, R>(url: string, model: M, options?: { timeout?: number}): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        $http.post<M, AxiosResponse<R>>(url, model, {
            timeout: options?.timeout || 45000
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });

    return request;
};


export const Patch = <M, R>(url: string, model: M, options?: { timeout?: number}): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        $http.patch<M, AxiosResponse<R>>(url, model, {
            timeout: options?.timeout || 45000
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });

    return request;
};


export const Put = <M, R>(url: string, model: M, options?: { timeout?: number}): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        $http.put<M, AxiosResponse<R>>(url, model, {
            timeout: options?.timeout || 45000
        })
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });

    return request;
};

export const Delete = <R>(url: string, options?: { onProgress?: (progress: number) => void; timeout?: number}): Promise<R> => {
    const request = new Promise<R>((resolve, reject) => {
        $http.delete(url, options)
            .then((resp) => {
                resolve(resp.data);
            })
            .catch((error: AxiosError) => {
                reject(error);
            });
    });

    return request;
};