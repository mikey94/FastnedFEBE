import Api from '../api';
import {ApiEndpoints} from '../apiConstants';

export function getLocations() {
  return Api.get(ApiEndpoints.GET_LOCATIONS);
}

export function addLocations(data: any) {
  return Api.add(ApiEndpoints.ADD_LOCATIONS, data);
}

export function editLocation(data: any) {
  return Api.edit(ApiEndpoints.EDIT_LOCATIONS, data);
}

export function removeLocation(data: any) {
  return Api.remove(ApiEndpoints.DELETE_LOCATIONS, data);
}
