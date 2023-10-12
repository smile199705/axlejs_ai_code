import { IsString, IsInt, IsNumber, Equals, IsEnum, isEnum } from 'class-validator'

export class TestDto {
	@IsString()
	readonly name: string

    @IsNumber()
    readonly age: number
}
