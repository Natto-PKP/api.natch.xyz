import type { Request as ExpressRequest } from 'express';
import type { UserPermissionType } from '../src/enums/UserPermissions.enum';
import type { UserRoleType } from '../src/enums/UserRoles.enum';

// # GLOBAL
export interface PaginationInterface {
  page: string;
  limit: string;
}

export interface Request extends ExpressRequest {
  user?: UserPersonalInterface;
}

// # USER
export interface UserInterface {
  id: string; // NO UPDATE
  pseudo: string; // UPDATE ONLY BY ME AND MANAGER
  username: string; // UPDATE ONLY BY MANAGER
  email: string; // UPDATE ONLY BY ME
  password: string; // UPDATE ONLY BY ME
  level: number; // NO UPDATE
  points: number; // UPDATE ONLY BY MANAGER
  roles: UserRoleType[]; // UPDATE ONLY BY MANAGER
  permissions: UserPermissionType[]; // UPDATE ONLY BY MANAGER
}

export type UserPersonalInterface = Omit<UserInterface, 'password'>;
export type UserPublicInterface = Omit<UserInterface, 'email' | 'password'>;
export type UserViewInterface = Pick<UserInterface, 'id' | 'pseudo' | 'username'>;
export type UserReturningType = 'personal' | 'public' | 'all';
export type UserReturningInterface<T extends UserReturningType> = T extends 'personal' ? UserPersonalInterface : T extends 'public' ? UserPublicInterface : UserInterface;

export type UserSearchQuery = Partial<Pick<UserInterface, 'pseudo' | 'username'> & PaginationInterface>;

export type UserRefreshBody = { refreshToken: string; };
export type UserRegisterBody = Pick<UserInterface, 'email' | 'password' | 'pseudo' | 'username'>;
export type UserLoginBody = Partial<Pick<UserInterface, 'email' | 'username'>> & Pick<UserInterface, 'password'>;
export type UserUpdateBody = Partial<Omit<UserInterface, 'id' | 'level'>>;

export type UserUpdateData = Partial<Omit<UserInterface, 'id'>>;

// # TAROT CARD
export interface TarotCardInterface {
  id: string;
  identifier: string;
  name: string;
  isGenerated: boolean;
}

export type TarotCardSearchQuery = Partial<Pick<TarotCardInterface, 'name'> & PaginationInterface>;
export type TarotCardCreateBody = Pick<TarotCardInterface, 'name' | 'isGenerated'>;
export type TarotCardUpdateBody = Partial<Pick<TarotCardInterface, 'name' | 'isGenerated'>>;

// # USER TAROT CARD
export interface UserTarotCardInterface {
  userId: string;
  tarotCardId: string;
  givenById?: string | null;
}

export type UserTarotCardReturning = UserTarotCardInterface & { givenBy: UserViewInterface };
export type UserTarotCardSearchQuery = Partial<Pick<TarotCardInterface, 'name'> & PaginationInterface>;
export type UserTarotCardCreateBody = Pick<UserTarotCardInterface, 'givenById'>;
