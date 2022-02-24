import ajax from '@/service/request';

const defaultHeader = () => ({
  "Content-Type": "application/x-www-form-urlencoded",
  "Authorization": localStorage.getItem('token'),
})

// auth
export function authGetApi<T>(
  url = "",
  data = {},
  headers = defaultHeader()
) {
  return ajax<T>(`/authApi${url}`, data, "GET", headers);
}

export function authPostApi<T>(
  url = "",
  data = {},
  headers = defaultHeader()
) {
  return ajax<T>(`/authApi${url}`, data, "POST", headers);
}

export function authPutApi<T>(
  url = "",
  data = {},
  headers = defaultHeader()
) {
  return ajax<T>(`/authApi${url}`, data, "PUT", headers);
}

export function authDeleteApi<T>(
  url = "",
  data = {},
  headers = defaultHeader()
) {
  return ajax<T>(`/authApi${url}`, data, "DELETE", headers);
}

export default {
  authPostApi,
  authGetApi,
  authPutApi,
  authDeleteApi,
}
