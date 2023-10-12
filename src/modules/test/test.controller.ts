import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common'
import { TestService } from './test.service'
import { TestDto } from '../../pipes/user/testDto'
import { Logger } from '../../loggers/log4js'
import { AuthGuard } from '@nestjs/passport'
const tokens = {
	admin: 'admin-token',
	guest: 'guest-token',
	editor: 'editor-token'
}

const users = {
	'admin-token': {
		id: 'admin',
		role: 'admin',
		name: '难凉热血',
		avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
		description: '拥有系统内所有菜单和路由权限'
	},
	'editor-token': {
		id: 'editor',
		role: 'editor',
		name: '编辑员',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: '可以看到除户管理页面之外的所有页面'
	},
	'guest-token': {
		id: 'guest',
		role: 'guest',
		name: '游客',
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: '仅能看到Dashboard、作者博客、权限测试和关于作者四个页面'
	}
}

// @UseGuards(AuthGuard('jwt'))
@Controller('test')
export class TestController {
	constructor (
      private readonly userService: TestService
	) {}
  @Get('test')
	public async test (@Query() testDto: TestDto): Promise<any> {
		const res = await this.userService.testDemo()
		// Logger.warn('测试的')
		return res
	}


  @Get('userInfo')
  public async userInfo () {
  	const userInfo = {
  		id: 'admin',
  		role: 'admin',
  		name: '难凉热血',
  		avatar: 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  		description: '拥有系统内所有菜单和路由权限'
  	}
  	return {
  		status: 200,
  		userInfo
  	}
  }

  @Get('list')
  public async list (): Promise<any> {
  	return {
  		'status': 200,
  		'users': [
  			{
  				'id': 'admin',
  				'role': 'admin',
  				'name': '难凉热血',
  				'avatar': 'https://s1.ax1x.com/2020/04/28/J5hUaT.jpg',
  				'description': '拥有系统内所有菜单和路由权限'
  			},
  			{
  				'id': 'editor',
  				'role': 'editor',
  				'name': '编辑员',
  				'avatar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  				'description': '可以看到除户管理页面之外的所有页面'
  			},
  			{
  				'id': 'guest',
  				'role': 'guest',
  				'name': '游客',
  				'avatar': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  				'description': '仅能看到Dashboard、作者博客、权限测试和关于作者四个页面'
  			}
  		]
  	}
  }

}
