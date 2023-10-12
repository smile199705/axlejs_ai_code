import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { Logger } from '../loggers/log4js'
import { format } from 'util'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	public use (req: Request, res: Response, next: () => any): void {
		const resLog = `{ "url": "${req.originalUrl}", "method": "${req.method}", "ip": "${req.ip}", "header": ${JSON.stringify(req.headers)} , "req": { "params": "${JSON.stringify(req.params)}", "query": "${JSON.stringify(req.query)}", "body": "${JSON.stringify(req.body)}"} }, "timestamp": ${new Date().getTime()}, "time": ${format(new Date())} }`
		Logger.info(resLog)
		const code = res.statusCode // 响应状态码
		next()
		// 组装日志信息
		console.log('$$$$$$$$$$$$$$$$$')
		// const logFormat = `Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n`
		const logFormat = `{ "status": "${code}", "url": "${res.req.originalUrl}", "method":"${res.req.method}", "ip": "${res.req.host}", "response": ${JSON.stringify(res.req.body)}}`
		// 根据状态码，进行日志类型区分
		if (code >= 500) {
			Logger.error(logFormat)
		} else if (code >= 400) {
			Logger.warn(logFormat)
		} else {
			Logger.access(logFormat)
			Logger.log(logFormat)
		}

	}
}

// 函数式中间件
export const logger = (req: Request, res: Response, next: () => void): void => {
	// console.log(req, '@@@@@@@@', res, '######')
	const code = res.statusCode // 响应状态码
	next()
	// 组装日志信息
	const logFormat = `{ "url": "${req.originalUrl}", "method": "${req.method}", "ip": "${req.ip}", "header": ${JSON.stringify(req.headers)} , "req": { "params": "${JSON.stringify(req.params)}", "query": "${JSON.stringify(req.query)}", "body": "${JSON.stringify(req.body)}"} }`
	// 根据状态码，进行日志类型区分
	if (code >= 500) {
		Logger.error(logFormat)
	} else if (code >= 400) {
		Logger.warn(logFormat)
	} else {
		Logger.access(logFormat)
		Logger.log(logFormat)
	}
}
