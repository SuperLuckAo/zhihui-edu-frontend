import { request } from '@umijs/max';

export async function fetchCourses(params?: Record<string, unknown>) {
  return request('/api/courses', { method: 'GET', params });
}

export async function fetchUsers(params?: Record<string, unknown>) {
  return request('/api/users', { method: 'GET', params });
}
