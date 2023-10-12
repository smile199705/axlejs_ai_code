
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import * as nconf from 'nconf'
nconf.argv().env().file({ file: 'configMap.json' })
// nconf.argv
@Module({
	imports: [
		TypeOrmModule.forRoot({
			name: 'axle',
			type: 'mysql',
			host: nconf.get('db:axle:host'),
			port: nconf.get('db:axle:port'),
			username: nconf.get('db:axle:username'),
			password: nconf.get('db:axle:password'),
			database: 'db_axle',
			retryAttempts: 5, // 重试连接数据库的次数（默认：10）
			retryDelay: 3000, // 两次重试连接的间隔(ms)（默认：3000）
			autoLoadEntities: true,
			synchronize: false
		})
	]
})

export class MysqlModule {}
