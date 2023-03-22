import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { AppContext } from '../../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ChangePassword = {
  currentpassword: Scalars['String'];
  email: Scalars['String'];
  newPassword: Scalars['String'];
};

export type CreateMovie = {
  description: Scalars['String'];
  directorName: Scalars['String'];
  name: Scalars['String'];
  releaseDate: Scalars['Date'];
};

export type Filters = {
  search?: InputMaybe<Scalars['String']>;
};

export type Login = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  description: Scalars['String'];
  directorName: Scalars['String'];
  name: Scalars['String'];
  releaseDate: Scalars['Date'];
};

export enum MovieFields {
  DirectorName = 'directorName',
  Name = 'name',
  ReleaseDate = 'releaseDate'
}

export type MovieResponse = {
  __typename?: 'MovieResponse';
  description: Scalars['String'];
  directorName: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  releaseDate: Scalars['Date'];
  user?: Maybe<UserResponse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword?: Maybe<User>;
  createMovie?: Maybe<MovieResponse>;
  deleteMovie?: Maybe<MovieResponse>;
  signup?: Maybe<User>;
  updateMovie?: Maybe<MovieResponse>;
};


export type MutationChangePasswordArgs = {
  data: ChangePassword;
};


export type MutationCreateMovieArgs = {
  movie: CreateMovie;
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};


export type MutationSignupArgs = {
  user: Signup;
};


export type MutationUpdateMovieArgs = {
  id: Scalars['Int'];
  movie: UpdateMovie;
};

export type PaginatedList = {
  __typename?: 'PaginatedList';
  meta: PaginationResponse;
  movies: Array<Maybe<MovieResponse>>;
};

export type Pagination = {
  pageNumber?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};

export type PaginationResponse = {
  __typename?: 'PaginationResponse';
  pageSize: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getMovie?: Maybe<MovieResponse>;
  login?: Maybe<LoginResponse>;
  movies?: Maybe<PaginatedList>;
};


export type QueryGetMovieArgs = {
  id: Scalars['Int'];
};


export type QueryLoginArgs = {
  data: Login;
};


export type QueryMoviesArgs = {
  filter?: InputMaybe<Filters>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<Sorting>;
};

export type Signup = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Sorting = {
  field: MovieFields;
  isAsc: Scalars['Boolean'];
};

export type UpdateMovie = {
  description?: InputMaybe<Scalars['String']>;
  directorName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  releaseDate?: InputMaybe<Scalars['Date']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ChangePassword: ChangePassword;
  CreateMovie: CreateMovie;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Filters: Filters;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Login: Login;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Movie: ResolverTypeWrapper<Movie>;
  MovieFields: MovieFields;
  MovieResponse: ResolverTypeWrapper<MovieResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PaginatedList: ResolverTypeWrapper<PaginatedList>;
  Pagination: Pagination;
  PaginationResponse: ResolverTypeWrapper<PaginationResponse>;
  Query: ResolverTypeWrapper<{}>;
  Signup: Signup;
  Sorting: Sorting;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateMovie: UpdateMovie;
  User: ResolverTypeWrapper<User>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ChangePassword: ChangePassword;
  CreateMovie: CreateMovie;
  Date: Scalars['Date'];
  Filters: Filters;
  Int: Scalars['Int'];
  Login: Login;
  LoginResponse: LoginResponse;
  Movie: Movie;
  MovieResponse: MovieResponse;
  Mutation: {};
  PaginatedList: PaginatedList;
  Pagination: Pagination;
  PaginationResponse: PaginationResponse;
  Query: {};
  Signup: Signup;
  Sorting: Sorting;
  String: Scalars['String'];
  UpdateMovie: UpdateMovie;
  User: User;
  UserResponse: UserResponse;
}>;

export type ProtectedDirectiveArgs = { };

export type ProtectedDirectiveResolver<Result, Parent, ContextType = AppContext, Args = ProtectedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LoginResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Movie'] = ResolversParentTypes['Movie']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovieResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['MovieResponse'] = ResolversParentTypes['MovieResponse']> = ResolversObject<{
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  directorName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  changePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'data'>>;
  createMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationCreateMovieArgs, 'movie'>>;
  deleteMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationDeleteMovieArgs, 'id'>>;
  signup?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'user'>>;
  updateMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<MutationUpdateMovieArgs, 'id' | 'movie'>>;
}>;

export type PaginatedListResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PaginatedList'] = ResolversParentTypes['PaginatedList']> = ResolversObject<{
  meta?: Resolver<ResolversTypes['PaginationResponse'], ParentType, ContextType>;
  movies?: Resolver<Array<Maybe<ResolversTypes['MovieResponse']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['PaginationResponse'] = ResolversParentTypes['PaginationResponse']> = ResolversObject<{
  pageSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getMovie?: Resolver<Maybe<ResolversTypes['MovieResponse']>, ParentType, ContextType, RequireFields<QueryGetMovieArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'data'>>;
  movies?: Resolver<Maybe<ResolversTypes['PaginatedList']>, ParentType, ContextType, Partial<QueryMoviesArgs>>;
}>;

export type UserResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResponseResolvers<ContextType = AppContext, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = AppContext> = ResolversObject<{
  Date?: GraphQLScalarType;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Movie?: MovieResolvers<ContextType>;
  MovieResponse?: MovieResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginatedList?: PaginatedListResolvers<ContextType>;
  PaginationResponse?: PaginationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = AppContext> = ResolversObject<{
  protected?: ProtectedDirectiveResolver<any, any, ContextType>;
}>;
