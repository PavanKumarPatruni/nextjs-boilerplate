export function saveData<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadData<T>(key: string): T | null {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return null;
}

export function removeData(key: string) {
  window.localStorage.removeItem(key);
}

export function removeAllData() {
  window.localStorage.clear();
}
