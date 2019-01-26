import axios from 'axios'


const host = "https://www.luoyangc.cn/api"

// 获取文章列表接口
export const getArticle = (params) => { return axios.get(`${host}/article/`, {params: params}) }

// 获取文章详情接口
export const getArticleInfo = (id) => { return axios.get(`${host}/article/${id}/`) }

// 获取文章简介列表
export const getProfile = () => { return axios.get(`${host}/profile/`) }

// 获取留言列表接口
export const getMessage = () => { return axios.get(`${host}/message/`) }

// 获取动态列表接口
export const getDynamics = () => { return axios.get(`${host}/dynamics/`) }

// 获取分类列表
export const getCategory = () => { return axios.get(`${host}/category/`) }

// 获取文章归档
export const getArchives = () => { return axios.get(`${host}/archive/`) }
