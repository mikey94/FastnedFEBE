import {ApiEndpoints, Methods} from './apiConstants';

function get(path: string) {
  const url = `${ApiEndpoints.BASE_URl}${path}`;
  const basicHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method: Methods.GET,
    headers: basicHeaders,
  }).then((res) => res.json());
}

function add(path: string, data: any) {
  const url = `${ApiEndpoints.BASE_URl}${path}`;
  const basicHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method: Methods.POST,
    headers: basicHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function edit(path: string, data: any) {
  const url = `${ApiEndpoints.BASE_URl}${path}`;
  const basicHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method: Methods.PATCH,
    headers: basicHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

function remove(path: string, data: any) {
  const url = `${ApiEndpoints.BASE_URl}${path}`;
  const basicHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  return fetch(url, {
    method: Methods.DELETE,
    headers: basicHeaders,
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export default {
  get,
  add,
  edit,
  remove,
};
