import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { UserProfile } from '@/user/entity/user-profile.entity';
import { UserRepository } from './user.repository';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
    async createProfile(userId: number, fileName: string) {
        await this.insert({ fileName: fileName, fk_user_id: userId });
        const profile = await this.findOne({fk_user_id: userId})

        const userrepo = getCustomRepository(UserRepository);
        const user = await userrepo.findOne({id: userId});
        user.profile = profile;
        await userrepo.save(user);
    }   
}
