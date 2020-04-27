import "reflect-metadata";
import {createConnection, RelationId} from "typeorm";
import {User} from "./entity/User";
import { UserReferral } from "./entity/UserReferral";

createConnection().then(async connection => {
    const userRepository = await connection.getRepository(User);
    const userRefrralRepository = await connection.getRepository(UserReferral);

    // clear database data
    const clearDb = async () => {
      const entities = connection.entityMetadatas;
     
      for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName};`);
      }
    };

    // create User method
    const createUser = async (name: string) => {
        const user = new User();
        user.name = name;
        await connection.manager.save(user);
    };

    // create UserRefrral method
    const createUserReferral = async (name: string, userReferrals: string[]) => {
      const user = await userRepository.findOne({ name:  name });
      await Promise.all(userReferrals.map(async function(userName) {
        const referralUser = await userRepository.findOne({ name: userName });
        const referral = new UserReferral();
        referral.referralId = referralUser.id;
        referral.user = user;
        await connection.manager.save(referral);
      }));
    };

    const queryUserRefrralIds = async (user: User, result: number[]) => {
      const referralUserIds = await userRefrralRepository.find({ where: { user: user }, select: ["referralId"] });
      await Promise.all(referralUserIds.map(async function(referra) {
        result.push(referra.referralId);
        const _user = await userRepository.findOne({id: referra.referralId});
        const referralUser = await userRefrralRepository.find({ where: { user: _user }});
        if (referralUser.length > 0 && !result.includes(_user.id)) {
          await queryUserRefrralIds(_user, result);
        }
      }));
      return result
    }

    const getTotalReferral = async (user: User) => {
      const userIdsArray = [user.id];
      let userRelationIds = await queryUserRefrralIds(user, userIdsArray);
      userRelationIds = Array.from(new Set(userRelationIds));

      return (userRelationIds.length - 1);
    }

    // init user
    const userArray = ['A', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
    await Promise.all(userArray.map(async function(user) {
        await createUser(user);
    }));


    // init user relation
    const userRelation = {'A': ['B1', 'B2', 'B3'], 'B1': ['C1', 'C2'], 'B2': ['A'], 'B4': ['C4', 'C5', 'C6'] };
    await Promise.all(Object.keys(userRelation).map(async function(key) {
      await createUserReferral(key, userRelation[key]);
    }));

    const user = await userRepository.findOne({ name:  'A' });
    const userCount = await getTotalReferral(user);
    console.log(`${user.name} User getTotalReferral count ${userCount}`);

    await clearDb();

}).catch(error => console.log(error));