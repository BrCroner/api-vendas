import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import { isAfter, addHours } from 'date-fns'
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UsersTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string
}
class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokensRepository = getCustomRepository(UsersTokensRepository)

    const userToken = await usersTokensRepository.findByToken(token)
    if(!userToken) {
      throw new AppError('O token de usuário é inexistente.')
    }

    const user = await usersRepository.findById(userToken.user_id)
    if(!user) {
      throw new AppError('Usuário inexistente!')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if(isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado!')
    }

    user.password = await hash(password, 8)

}

export default ResetPasswordService;
