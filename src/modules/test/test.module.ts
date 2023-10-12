import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
import { TestController } from './test.controller'
import { TestService } from './test.service'
// import { WinstonProvider } from '../../lib/winston/winston.provider'
// import { WinstonService } from '../../lib/winston/winston.service'
// import { Logger } from '../../lib/winston/logger'

@Module({
	controllers: [TestController],
	providers: [TestService]
})
export class TestModule {}
