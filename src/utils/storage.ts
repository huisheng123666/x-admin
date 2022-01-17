import { isObj } from '@/utils/util';

export const setItem = (key: string, val: any) => {
  if (isObj(val) || Array.isArray(val)) {
    localStorage.setItem(key, JSON.stringify(val))
    return
  }
  localStorage.setItem(key, val)
}

export const getItem = (key: string) => {
  const val = localStorage.getItem(key)
  if (val && (val.indexOf('[') === 0 || val.indexOf('{') === 0)) {
    return JSON.parse(val)
  }
  return val
}

export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export const clear = () => {
  localStorage.clear()
}
