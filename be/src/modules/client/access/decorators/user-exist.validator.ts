import {Injectable} from '@nestjs/common'
import {
    ValidatorConstraint,
    ValidationArguments,
    ValidatorConstraintInterface,
} from 'class-validator'
import {UserModel, emailRegex} from '../../../../models/clientInfo/user.model';
import {AccessService} from '../access.service';

@ValidatorConstraint({ name: 'user', async: true })
@Injectable()
export class UserExitsValidator implements ValidatorConstraintInterface {
	constructor(private readonly userService: AccessService) {}

	public async validate(usernameOrEmail: string, _args: ValidationArguments) {
		const isEmail = emailRegex.test(usernameOrEmail);

		let check: any;
		/*
		if (isEmail) {
			check = await this.userService.findOne({
				userEmail: usernameOrEmail,
			});
		} else {
			check = await this.userService.findOne({
				username: usernameOrEmail,
			});
		}*/
		// if user exist --> return false: can not validate
		if (check) return false;

		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	defaultMessage(_args: ValidationArguments) {
		return 'User with $property $value already exists';
	}
}