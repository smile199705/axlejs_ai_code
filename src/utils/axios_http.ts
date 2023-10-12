import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { RequestInterceptors } from './types'
import * as qs from 'qs'
import { Logger } from '../loggers/log4js'

/**
 * 拦截顺序:
 *    实例请求 --》 类请求 --》 实例响应 --》 类响应,这样就可以在实例拦截上作出一些不同的拦截
 */
interface IResponse {
  status: number;
  data: {
    type: 'success' | 'fail' | 'info';
    message: string;
    [key: string]: any;
  };
}

class Request {
  // axios实例
  static instance: Request
  private request: AxiosInstance
  interceptorsObj?: RequestInterceptors

  // 单例模式，实现当前类，实例化一个对象
  public static getInstance (
  	config: AxiosRequestConfig = {
  		baseURL: 'http://10.111.1.65:30801',
  		timeout: 5000
  	}
  ) {
  	if (!this.instance) {
  		// 无创建实例，则创建
  		this.instance = new Request(config)
  	}
  	return this.instance
  }
  constructor (config: AxiosRequestConfig) {
  	this.request = axios.create(config)
  	// this.interceptorsObj = configs.interceptors;

  	// 请求拦截器
  	this.request.interceptors.request.use(
  		// 全局请求拦截器
  		(req: AxiosRequestConfig) => {
  			// 成功
  			// console.log('请求接口：', { url: res.baseURL + res.url, method: res.method })
  			const obj = `{ "method": ${req?.method}, "url": ${req?.baseURL} + ${req?.url}, "params": ${JSON.stringify(req?.params)} }`
  			Logger.access(obj)
  			// Logger.info(obj)
  			return req
  		},
  		(error: any) => {
  			Logger.error(error)
  			return error
  		}
  	)

  	/**
     * 实例拦截器
     */
  	// 使用实例拦截器
  	/* this.request.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )
    this.request.interceptors.response.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch
    )*/

  	// 响应拦截器
  	this.request.interceptors.response.use(
  		// 因为返回的数据都在res.data下面，所以直接返回res.data
  		(res: AxiosRequestConfig) => {
  			const obj = `{ "response": ${JSON.stringify(res.data)} }`
  			Logger.info(obj)
  			if (res.data.state === 200) {
  				return {
  					code: 200,
  					data: res.data,
  					message: 'ok'
  				}
  			} else {
  				return {
  					code: 500,
  					data: res,
  					message: 'error'
  				}
  			}
  		},
  		(error: any) => {
  			Logger.error(error)
  			return error
  		}
  	)
  }

  /*
    使用时，指定接口baseURL, url， method， header等信息,达到可以请求任意http接口
   */
  public async httpRequest (config: AxiosRequestConfig) {
  	return this.request.request(config)
  }

  public async get (
  	path: string,
  	query: { [key: string]: any }
  ): Promise<{ [key: string]: any }> {
  	const url = (path += query ? `?${qs.stringify(query)}` : '')
  	try {
		return await this.request.get(url)
  	} catch (e) {
  		console.log(e)
  	}
  }

  public async post (
  	path: string,
  	data: { [key: string]: any }
  ): Promise<{ [key: string]: any }> {
  	const url = path
  	let result = {}
  	try {
  		const { data: res }: IResponse = await this.request.post(
  			url,
  			qs.stringify(data),
  			{
  				headers: {
  					'Content-Type': 'application/json;charset=UTF-8'
  					// 'state-in-body': 'true'
  				}
  			}
  		)
  		result = res
  	} catch (e) {
  		console.log(e)
  	}
  	return result
  }
}

export const ApiRequest = Request.getInstance()
