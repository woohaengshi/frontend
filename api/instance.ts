import Cookies from 'js-cookie';

// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + 'api/v1/';
const BASE_URL = 'https://api.sampleapis.com/coffee/'; // 임시로 사용

const getAuthToken = () => {
  return Cookies.get('whs-token');
};

interface RequestOptions {
  headers?: Record<string, string>;
  [key: string]: string | Record<string, string> | undefined;
}

const fetchInstance = async (url: string, options: RequestOptions = {}) => {
  // request interceptor
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const finalOptions = {
    ...options,
    headers,
  };

  // response interceptor
  try {
    const response = await fetch(BASE_URL + url, finalOptions);

    // 토큰 만료 등의 경우 401 처리
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        Cookies.remove('whs-token');
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');

        /* if (!window.location.reloadInProgress) {
          window.location.reloadInProgress = true;
          window.location.reload();
        } */
      }
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log('Fetch Error: 에러');
      throw new Error(errorResponse.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

const instance = {
  get: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'GET' }),
  post: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'POST' }),
  put: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'PUT' }),
  delete: (url: string, options?: RequestOptions) => fetchInstance(url, { ...options, method: 'DELETE' }),
};

export default instance;
