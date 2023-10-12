// import { NextFunction, Request, Response } from 'express'
// // import { Log4jsConfig } from './interfaces'
// import { Injectable, Logger } from '@nestjs/common'
// import * as log4js from 'log4js'
// import { Log4jsConfig } from './log4js.configs'
//
// @Injectable()
// export class Log4jsService {
// 	constructor (private readonly configs: Log4jsConfig) {
// 		this.initialize()
// 	}
//
// 	private initialize (): void {
// 		try {
// 			log4js.configure({
// 				appenders: {
// 					ruleFile: {
// 						type: 'dateFile',
// 						alwaysIncludePattern: true,
// 						filename: this.configs.filename || 'logs/http',
// 						pattern: this.configs.fileNameSuffixPattern || 'yyyy-MM-dd.log',
// 						numBackups: this.configs.numBackups || 90
// 					},
// 					ruleConsole: { type: 'stdout' }
// 					// 如果后续需要日志分文件，如错误日志，info日志，可以再定义类型
// 				},
// 				categories: {
// 					default: { appenders: ['ruleFile'], level: 'info' },
// 					error: { appenders: ['ruleFile', 'ruleConsole'], level: 'error' }
// 				}
// 			})
//
// 			Logger.log('Initialize success!')
// 		} catch (err) {
// 			Logger.error('Initialize fail!', err)
// 		}
// 	}
//
// 	// 格式化log并且写入文件，该方法一般在中间件中被调用
// 	public useLogger (req: Request, res: Response, next: NextFunction) {
// 		log4js.connectLogger(log4js.getLogger(), {
// 			level: 'info',
// 			format: (request: Request, response: Response, format: (str: string) => string) => {
// 				const requestId = request['requestId']
//
// 				return format(`【requestId: ${requestId}】\n Ip: :remote-addr \n Method-Code: :method :status \n Url: :url \n Param: ${JSON.stringify(
// 					req.params
// 				)} \n Query: ${JSON.stringify(req.query)} \n Body: ${JSON.stringify(
// 					req.body
// 				)} \n Headers: ${JSON.stringify(
// 					req.headers
// 				)} \n Client: :user-agent \n ${'='.repeat(20)}
//                 `)
// 			}
// 		})(req, res, next)
// 	}
//
// 	// 进行错误日志打印, 输出控制台
// 	public logError (message: any): void {
// 		log4js.getLogger('info').info(message)
// 	}
// }
