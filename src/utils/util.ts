export const isObj = (obj: any) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

interface CopyObj {
  [key: string]: any
}

export function clone(obj: any) {
  const copy: CopyObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Array.isArray(obj[key]) || isObj(obj[key])) {
      copy[key] = clone(obj[key])
    } else {
      copy[key] = obj[key]
    }
  }
  return copy
}
