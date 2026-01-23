
import { CMSData, ContactSubmission, EnrollmentSubmission, Service, CaseStudy, TeamMember, Blog, SiteSettings } from '../types';
import { INITIAL_DATA } from '../constants';

const DB_KEY = 'bir_research_db';
const SERVER_ENDPOINT = '/api/cms';

async function pushToServer(data: CMSData) {
  try {
    // Include admin token header only in development builds (Vite exposes import.meta.env.DEV)
    const ADMIN_TOKEN: string | undefined = (import.meta as any).env?.VITE_ADMIN_TOKEN as string | undefined;
    const DEV_ONLY_TOKEN = (import.meta as any).env?.DEV ? ADMIN_TOKEN : undefined;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (DEV_ONLY_TOKEN) headers['x-admin-token'] = DEV_ONLY_TOKEN;

    const resp = await fetch(SERVER_ENDPOINT, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    });

    if (resp.ok) {
      console.info('pushToServer: OK', resp.status);
    } else {
      const text = await resp.text().catch(() => '<no body>');
      console.warn('pushToServer: server responded', resp.status, text);
    }
  } catch (e) {
    // silently ignore - server may be unavailable
    console.error('pushToServer failed', e);
  }
}

export async function syncWithServer(): Promise<void> {
  try {
    const res = await fetch(SERVER_ENDPOINT);
    if (res.ok) {
      const remote = await res.json();
      localStorage.setItem(DB_KEY, JSON.stringify(remote));
    }
  } catch (e) {
    // ignore - offline or server not present
    console.debug('syncWithServer failed', e);
  }
}

export const dataService = {
  getData(): CMSData {
    const stored = localStorage.getItem(DB_KEY);
    if (!stored) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(stored);
  },

  resetData() {
    localStorage.removeItem(DB_KEY);
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
    // attempt to persist to server asynchronously
    pushToServer(INITIAL_DATA as CMSData);
    return INITIAL_DATA;
  },

  updateSettings(settings: SiteSettings) {
    const data = this.getData();
    data.settings = settings;
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    pushToServer(data as CMSData);
  },

  addSubmission(submission: Omit<ContactSubmission, 'id' | 'timestamp'>) {
    const data = this.getData();
    const newSubmission: ContactSubmission = {
      ...submission,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    data.submissions.unshift(newSubmission);
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    pushToServer(data as CMSData);
    return newSubmission;
  },

  addEnrollment(enrollment: Omit<EnrollmentSubmission, 'id' | 'timestamp'>) {
    const data = this.getData();
    const newEnrollment: EnrollmentSubmission = {
      ...enrollment,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    if (!data.enrollments) data.enrollments = [];
    data.enrollments.unshift(newEnrollment);
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    pushToServer(data as CMSData);
    return newEnrollment;
  },

  // General CRUD for any collection
  updateCollection<T extends { id: string }>(collectionName: keyof CMSData, item: T) {
    const data = this.getData();
    const collection = (data[collectionName] || []) as any[];
    const index = collection.findIndex((i: any) => i.id === item.id);
    if (index !== -1) {
      collection[index] = item;
    } else {
      collection.push(item);
    }
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    pushToServer(data as CMSData);
  },

  deleteItem(collectionName: keyof CMSData, id: string) {
    const data = this.getData();
    const collection = (data[collectionName] || []) as any[];
    data[collectionName] = collection.filter((i: any) => i.id !== id) as any;
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    pushToServer(data as CMSData);
  }
};
