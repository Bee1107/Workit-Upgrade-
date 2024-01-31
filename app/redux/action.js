const basic = (domain, prefix) => ({
  START: `${domain}.${prefix.toUpperCase()}.START`,
  SUCCESS: `${domain}.${prefix.toUpperCase()}.SUCCESS`,
  ERROR: `${domain}.${prefix.toUpperCase()}.ERROR`,
  CANCEL: `${domain}.${prefix.toUpperCase()}.CANCEL`,
})

export const actions = prefix => ({
  FETCH: basic('FETCH', prefix),
  PUSH: basic('PUSH', prefix),
  SORT: basic('SORT', prefix),
  DELETE: basic('DELETE', prefix),
  GET: basic('GET', prefix),
  POST: basic('POST', prefix),
  SIGNUP: basic('SIGNUP', prefix),
  SIGNIN: basic('SIGNIN', prefix),
  READ: basic('READ', prefix),
  SAVE: basic('SAVE', prefix),
  LOGOUT: basic('LOGOUT', prefix),
  ADD: basic('ADD', prefix),
  UPLOAD: basic('UPLOAD', prefix),
  SELECT: basic('SELECT', prefix),
  FB_CONNECT: basic('FB_CONNECT', prefix),
  APPLE_CONNECT: basic('APPLE_CONNECT', prefix),
  GOOGLE_CONNECT: basic('GOOGLE_CONNECT', prefix),
})

export const save = (prefix, data = {}) => ({
  type: actions(prefix).SAVE.START,
  data,
})

export const read = (prefix, data = {}) => ({
  type: actions(prefix).READ.START,
  data,
})

export const select = (prefix, data = {}) => ({
  type: actions(prefix).SELECT.START,
  data,
})

export const add = (prefix, data = {}) => ({
  type: actions(prefix).ADD.START,
  data,
})

export const push = (prefix, data = {}) => ({
  type: actions(prefix).PUSH.START,
  data,
})

export const sort = (prefix, data = {}) => ({
  type: actions(prefix).SORT.START,
  data,
})

export const deleteAction = (prefix, data = {}) => ({
  type: actions(prefix).DELETE.START,
  data,
})

export const upload = (data = {}) => ({
  type: actions('user').UPLOAD.START,
  data,
})

export const signup = (data = {}) => ({
  type: actions('user').SIGNUP.START,
  data,
})

export const signin = (data = {}) => ({
  type: actions('user').SIGNIN.START,
  data,
})

export const fetch = (prefix, data = {}) => ({
  type: actions(prefix).FETCH.START,
  data,
})

export const get = (prefix, data = {}) => ({
  type: actions(prefix).GET.START,
  data,
})

export const post = (prefix, data = {}) => ({
  type: actions(prefix).POST.START,
  data,
})

export const addForm = (prefix, data = {}) => ({
  type: actions(prefix).POST.START,
  data,
})

export const logout = (prefix, data = {}) => ({
  type: actions(prefix).LOGOUT.START,
  data,
})


export const fbConnect = (data = {}) => ({
  type: actions('user').FB_CONNECT.START,
  data,
})

export const appleConnect = (data = {}) => ({
  type: actions('user').APPLE_CONNECT.START,
  data,
})

export const googleConnect = (data = {}) => ({
  type: actions('user').GOOGLE_CONNECT.START,
  data,
})