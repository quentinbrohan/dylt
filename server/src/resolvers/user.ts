import {
    Resolver,
    Arg,
    InputType,
    Field,
    Mutation,
    Ctx,
    ObjectType,
    Query,
} from 'type-graphql';
import { MyContext } from "../types";
import { User } from "../entities/User";
import argon2 from 'argon2';
import { EntityManager } from '@mikro-orm/postgresql';

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
};

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
};

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req, em }: MyContext
    ) {
        // Not logged in
        if (!req.session.userId) {
            return null;
        }

        const user = await em.findOne(User, { id: req.session.userId });
        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
        ) : Promise<UserResponse> {
            if (options.username.length <= 2 ) {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'Le nom d\'utilisateur doit comporter au moins 3 caractères.'
                        }
                    ]
                }
            }
            // TODO: push multiple field/message into errors
            if (options.password.length <= 5 ) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'Le mot de passe doit comporter au moins 6 caractères.'
                        }
                    ]
                }
            }

            const hashedPassword = await argon2.hash(options.password);
            let user;
            try {
              const result = await (em as EntityManager)
                .createQueryBuilder(User)
                .getKnexQuery()
                .insert({
                  username: options.username,
                  password: hashedPassword,
                  created_at: new Date(),
                  updated_at: new Date(),
                })
                .returning("*");
              user = result[0];
            } catch(error) {
                // ERROR: Duplicate username
                if (error.code === '23505') { // || error.detail.includes('already exists')) {
                    return {
                        errors: [
                            {
                                field: 'username',
                                message: 'Ce nom d\'utilisateur existe déjà.',
                            },
                        ],
                    };
                }
            };

            // Login after register (store userId in session - set cookie of user)
            req.session.userId = user.id;

            return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
        ) : Promise<UserResponse> {
            const user = await em.findOne(User, { username: options.username });
            if (!user) {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'Cet utilisateur n\'existe pas.',
                        },
                    ],
                };
            }
            const valid = await argon2.verify(user.password, options.password);
            if (!valid) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'Nom d\'utilisateur ou mot de passe incorrect.',
                        },
                    ],
                };
            }

            req.session.userId = user.id;

            return { user };
    }
};