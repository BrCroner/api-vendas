import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserTokens';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.findOne({
      where: { token },
    });
    return userToken;
  }
  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    });
    await this.save(userToken);
    return userToken;
  }
  p;
}

export default UsersTokensRepository;
