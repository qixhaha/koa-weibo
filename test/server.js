/**
 * @description jest server 接口测试
 * @author 綦旭
 */
const request = require('supertest')
const server = require('../src/app').callback()
module.exports = request(server)