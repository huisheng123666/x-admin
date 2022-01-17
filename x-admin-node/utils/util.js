const CODE = {
  SUCCESS: 200,
  PARAM_ERROR: 10001,
  USER_ACCOUNT_ERROR: 20001, // 账号或密码错误
  USER_LOGIN_ERROR: 30001, // 用户未登陆
  BUSINESS_ERROR: 40001, // 业务请求失败
  AUTH_ERROR: 50001, // 认证失败或者token过期
}

const log = require('./log')

module.exports = {
  CODE,
  /**
   * 分页
   * @param pageNum
   * @param pageSize
   * @returns {{skipIndex: number, page: {pageSize: number, pageNum: number}}}
   */
  pager({ pageNum = 1, pageSize = 10 }) {
    pageNum = Number(pageNum)
    pageSize = Number(pageSize)
    const skipIndex = (pageNum - 1) * pageSize
    return {
      page: {
        pageNum,
        pageSize
      },
      skipIndex
    }
  },
  success(data = '', msg = '', code = CODE.SUCCESS) {
   //  log.debug(data)
    return {
      data,
      msg,
      code
    }
  },
  fail(msg = '', code = CODE.BUSINESS_ERROR) {
    log.debug(msg)
    return {
      code,
      msg
    }
  },
  deleteEmpty(data) {
    for (let key in data) {
      if (data[key] === undefined || data[key] === '') {
        delete data[key]
      }
    }
    return data
  }
}
