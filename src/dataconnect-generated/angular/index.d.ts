import { CreateUserData, CreateUserVariables, UpdateUserData, UpdateUserVariables, DeleteUserData, GetUserData, ListUsersData, CreateArticleData, CreateArticleVariables, UpdateArticleData, UpdateArticleVariables, DeleteArticleData, DeleteArticleVariables, GetArticleData, GetArticleVariables, ListArticlesData, CreateVocabularyData, CreateVocabularyVariables, UpdateVocabularyData, UpdateVocabularyVariables, DeleteVocabularyData, DeleteVocabularyVariables, GetVocabularyData, GetVocabularyVariables, ListUserVocabularyData, CreateProgressData, CreateProgressVariables, UpdateProgressData, UpdateProgressVariables, DeleteProgressData, DeleteProgressVariables, GetProgressData, GetProgressVariables, ListUserProgressData, CreateReviewSessionData, CreateReviewSessionVariables, UpdateReviewSessionData, UpdateReviewSessionVariables, DeleteReviewSessionData, DeleteReviewSessionVariables, GetReviewSessionData, GetReviewSessionVariables, ListUserReviewSessionsData } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateUserData, FirebaseError, CreateUserVariables>;
export function injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;

type UpdateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateUserData, FirebaseError, UpdateUserVariables | void>;
export function injectUpdateUser(options?: UpdateUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateUserData, UpdateUserVariables, UpdateUserVariables | void>;

type DeleteUserOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteUserData, FirebaseError, undefined>;
export function injectDeleteUser(options?: DeleteUserOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteUserData, undefined, >;

export type GetUserOptions = () => Omit<CreateDataConnectQueryOptions<GetUserData, undefined>, 'queryFn'>;
export function injectGetUser(options?: GetUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserData, undefined>;

export type ListUsersOptions = () => Omit<CreateDataConnectQueryOptions<ListUsersData, undefined>, 'queryFn'>;
export function injectListUsers(options?: ListUsersOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersData, undefined>;

type CreateArticleOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateArticleData, FirebaseError, CreateArticleVariables>;
export function injectCreateArticle(options?: CreateArticleOptions, injector?: Injector): CreateDataConnectMutationResult<CreateArticleData, CreateArticleVariables, CreateArticleVariables>;

type UpdateArticleOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateArticleData, FirebaseError, UpdateArticleVariables>;
export function injectUpdateArticle(options?: UpdateArticleOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateArticleData, UpdateArticleVariables, UpdateArticleVariables>;

type DeleteArticleOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteArticleData, FirebaseError, DeleteArticleVariables>;
export function injectDeleteArticle(options?: DeleteArticleOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteArticleData, DeleteArticleVariables, DeleteArticleVariables>;

type GetArticleArgs = GetArticleVariables | (() => GetArticleVariables);
export type GetArticleOptions = () => Omit<CreateDataConnectQueryOptions<GetArticleData, GetArticleVariables>, 'queryFn'>;
export function injectGetArticle(args: GetArticleArgs, options?: GetArticleOptions, injector?: Injector): CreateDataConnectQueryResult<GetArticleData, GetArticleVariables>;

export type ListArticlesOptions = () => Omit<CreateDataConnectQueryOptions<ListArticlesData, undefined>, 'queryFn'>;
export function injectListArticles(options?: ListArticlesOptions, injector?: Injector): CreateDataConnectQueryResult<ListArticlesData, undefined>;

type CreateVocabularyOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateVocabularyData, FirebaseError, CreateVocabularyVariables>;
export function injectCreateVocabulary(options?: CreateVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<CreateVocabularyData, CreateVocabularyVariables, CreateVocabularyVariables>;

type UpdateVocabularyOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateVocabularyData, FirebaseError, UpdateVocabularyVariables>;
export function injectUpdateVocabulary(options?: UpdateVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateVocabularyData, UpdateVocabularyVariables, UpdateVocabularyVariables>;

type DeleteVocabularyOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteVocabularyData, FirebaseError, DeleteVocabularyVariables>;
export function injectDeleteVocabulary(options?: DeleteVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteVocabularyData, DeleteVocabularyVariables, DeleteVocabularyVariables>;

type GetVocabularyArgs = GetVocabularyVariables | (() => GetVocabularyVariables);
export type GetVocabularyOptions = () => Omit<CreateDataConnectQueryOptions<GetVocabularyData, GetVocabularyVariables>, 'queryFn'>;
export function injectGetVocabulary(args: GetVocabularyArgs, options?: GetVocabularyOptions, injector?: Injector): CreateDataConnectQueryResult<GetVocabularyData, GetVocabularyVariables>;

export type ListUserVocabularyOptions = () => Omit<CreateDataConnectQueryOptions<ListUserVocabularyData, undefined>, 'queryFn'>;
export function injectListUserVocabulary(options?: ListUserVocabularyOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserVocabularyData, undefined>;

type CreateProgressOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateProgressData, FirebaseError, CreateProgressVariables>;
export function injectCreateProgress(options?: CreateProgressOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProgressData, CreateProgressVariables, CreateProgressVariables>;

type UpdateProgressOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateProgressData, FirebaseError, UpdateProgressVariables>;
export function injectUpdateProgress(options?: UpdateProgressOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProgressData, UpdateProgressVariables, UpdateProgressVariables>;

type DeleteProgressOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteProgressData, FirebaseError, DeleteProgressVariables>;
export function injectDeleteProgress(options?: DeleteProgressOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProgressData, DeleteProgressVariables, DeleteProgressVariables>;

type GetProgressArgs = GetProgressVariables | (() => GetProgressVariables);
export type GetProgressOptions = () => Omit<CreateDataConnectQueryOptions<GetProgressData, GetProgressVariables>, 'queryFn'>;
export function injectGetProgress(args: GetProgressArgs, options?: GetProgressOptions, injector?: Injector): CreateDataConnectQueryResult<GetProgressData, GetProgressVariables>;

export type ListUserProgressOptions = () => Omit<CreateDataConnectQueryOptions<ListUserProgressData, undefined>, 'queryFn'>;
export function injectListUserProgress(options?: ListUserProgressOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserProgressData, undefined>;

type CreateReviewSessionOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateReviewSessionData, FirebaseError, CreateReviewSessionVariables>;
export function injectCreateReviewSession(options?: CreateReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<CreateReviewSessionData, CreateReviewSessionVariables, CreateReviewSessionVariables>;

type UpdateReviewSessionOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateReviewSessionData, FirebaseError, UpdateReviewSessionVariables>;
export function injectUpdateReviewSession(options?: UpdateReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateReviewSessionData, UpdateReviewSessionVariables, UpdateReviewSessionVariables>;

type DeleteReviewSessionOptions = DataConnectMutationOptionsUndefinedMutationFn<DeleteReviewSessionData, FirebaseError, DeleteReviewSessionVariables>;
export function injectDeleteReviewSession(options?: DeleteReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteReviewSessionData, DeleteReviewSessionVariables, DeleteReviewSessionVariables>;

type GetReviewSessionArgs = GetReviewSessionVariables | (() => GetReviewSessionVariables);
export type GetReviewSessionOptions = () => Omit<CreateDataConnectQueryOptions<GetReviewSessionData, GetReviewSessionVariables>, 'queryFn'>;
export function injectGetReviewSession(args: GetReviewSessionArgs, options?: GetReviewSessionOptions, injector?: Injector): CreateDataConnectQueryResult<GetReviewSessionData, GetReviewSessionVariables>;

export type ListUserReviewSessionsOptions = () => Omit<CreateDataConnectQueryOptions<ListUserReviewSessionsData, undefined>, 'queryFn'>;
export function injectListUserReviewSessions(options?: ListUserReviewSessionsOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserReviewSessionsData, undefined>;
