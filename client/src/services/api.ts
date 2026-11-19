import axios from 'axios';
import {
  IProfile,
  ISkill,
  IExperience,
  IService,
  IProject,
  ITestimonial,
  IBlogPost,
  IContactMessage,
  ISiteSetting,
  ApiResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchProfile = async (): Promise<IProfile> => {
  const res = await api.get<ApiResponse<IProfile>>('/profile');
  return res.data.data;
};

export const updateProfileApi = async (data: Partial<IProfile>): Promise<IProfile> => {
  const res = await api.put<ApiResponse<IProfile>>('/profile', data);
  return res.data.data;
};

export const fetchSkills = async (): Promise<ISkill[]> => {
  const res = await api.get<ApiResponse<ISkill[]>>('/skills');
  return res.data.data;
};

export const createSkillApi = async (data: Partial<ISkill>): Promise<ISkill> => {
  const res = await api.post<ApiResponse<ISkill>>('/skills', data);
  return res.data.data;
};

export const updateSkillApi = async (id: string, data: Partial<ISkill>): Promise<ISkill> => {
  const res = await api.put<ApiResponse<ISkill>>(`/skills/${id}`, data);
  return res.data.data;
};

export const deleteSkillApi = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`);
};

export const fetchExperiences = async (): Promise<IExperience[]> => {
  const res = await api.get<ApiResponse<IExperience[]>>('/experience');
  return res.data.data;
};

export const createExperienceApi = async (data: Partial<IExperience>): Promise<IExperience> => {
  const res = await api.post<ApiResponse<IExperience>>('/experience', data);
  return res.data.data;
};

export const updateExperienceApi = async (id: string, data: Partial<IExperience>): Promise<IExperience> => {
  const res = await api.put<ApiResponse<IExperience>>(`/experience/${id}`, data);
  return res.data.data;
};

export const deleteExperienceApi = async (id: string): Promise<void> => {
  await api.delete(`/experience/${id}`);
};

export const fetchServices = async (): Promise<IService[]> => {
  const res = await api.get<ApiResponse<IService[]>>('/services');
  return res.data.data;
};

export const createServiceApi = async (data: Partial<IService>): Promise<IService> => {
  const res = await api.post<ApiResponse<IService>>('/services', data);
  return res.data.data;
};

export const updateServiceApi = async (id: string, data: Partial<IService>): Promise<IService> => {
  const res = await api.put<ApiResponse<IService>>(`/services/${id}`, data);
  return res.data.data;
};

export const deleteServiceApi = async (id: string): Promise<void> => {
  await api.delete(`/services/${id}`);
};

export const fetchProjects = async (params?: { category?: string; featured?: boolean; search?: string }): Promise<IProject[]> => {
  const res = await api.get<ApiResponse<IProject[]>>('/projects', { params });
  return res.data.data;
};

export const fetchProjectBySlug = async (slug: string): Promise<IProject> => {
  const res = await api.get<ApiResponse<IProject>>(`/projects/${slug}`);
  return res.data.data;
};

export const createProjectApi = async (data: Partial<IProject>): Promise<IProject> => {
  const res = await api.post<ApiResponse<IProject>>('/projects', data);
  return res.data.data;
};

export const updateProjectApi = async (id: string, data: Partial<IProject>): Promise<IProject> => {
  const res = await api.put<ApiResponse<IProject>>(`/projects/${id}`, data);
  return res.data.data;
};

export const deleteProjectApi = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

export const fetchTestimonials = async (): Promise<ITestimonial[]> => {
  const res = await api.get<ApiResponse<ITestimonial[]>>('/testimonials');
  return res.data.data;
};

export const createTestimonialApi = async (data: Partial<ITestimonial>): Promise<ITestimonial> => {
  const res = await api.post<ApiResponse<ITestimonial>>('/testimonials', data);
  return res.data.data;
};

export const updateTestimonialApi = async (id: string, data: Partial<ITestimonial>): Promise<ITestimonial> => {
  const res = await api.put<ApiResponse<ITestimonial>>(`/testimonials/${id}`, data);
  return res.data.data;
};

export const deleteTestimonialApi = async (id: string): Promise<void> => {
  await api.delete(`/testimonials/${id}`);
};

export const fetchBlogPosts = async (params?: { category?: string; search?: string }): Promise<IBlogPost[]> => {
  const res = await api.get<ApiResponse<IBlogPost[]>>('/blog', { params });
  return res.data.data;
};

export const fetchBlogPostBySlug = async (slug: string): Promise<IBlogPost> => {
  const res = await api.get<ApiResponse<IBlogPost>>(`/blog/${slug}`);
  return res.data.data;
};

export const createBlogPostApi = async (data: Partial<IBlogPost>): Promise<IBlogPost> => {
  const res = await api.post<ApiResponse<IBlogPost>>('/blog', data);
  return res.data.data;
};

export const updateBlogPostApi = async (id: string, data: Partial<IBlogPost>): Promise<IBlogPost> => {
  const res = await api.put<ApiResponse<IBlogPost>>(`/blog/${id}`, data);
  return res.data.data;
};

export const deleteBlogPostApi = async (id: string): Promise<void> => {
  await api.delete(`/blog/${id}`);
};

export const sendContactMessage = async (data: { name: string; email: string; subject: string; message: string }) => {
  const res = await api.post<ApiResponse<IContactMessage>>('/contact', data);
  return res.data;
};

export const fetchContactMessages = async (): Promise<IContactMessage[]> => {
  const res = await api.get<ApiResponse<IContactMessage[]>>('/contact');
  return res.data.data;
};

export const updateContactStatus = async (id: string, data: { isRead?: boolean; isReplied?: boolean }) => {
  const res = await api.patch<ApiResponse<IContactMessage>>(`/contact/${id}`, data);
  return res.data.data;
};

export const deleteContactMessageApi = async (id: string): Promise<void> => {
  await api.delete(`/contact/${id}`);
};

export const fetchSettings = async (): Promise<ISiteSetting> => {
  const res = await api.get<ApiResponse<ISiteSetting>>('/settings');
  return res.data.data;
};

export const updateSettingsApi = async (data: Partial<ISiteSetting>): Promise<ISiteSetting> => {
  const res = await api.put<ApiResponse<ISiteSetting>>('/settings', data);
  return res.data.data;
};

export const fetchAnalyticsSummary = async (): Promise<any> => {
  const res = await api.get<ApiResponse<any>>('/analytics/summary');
  return res.data.data;
};
