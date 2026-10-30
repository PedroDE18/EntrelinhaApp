import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Article_Key {
  id: UUIDString;
  __typename?: 'Article_Key';
}

export interface CreateArticleData {
  article_insert: Article_Key;
}

export interface CreateArticleVariables {
  title: string;
  content: string;
  language: string;
  difficultyLevel: string;
}

export interface CreateProgressData {
  userProgress_insert: UserProgress_Key;
}

export interface CreateProgressVariables {
  articleId: UUIDString;
  status: string;
  timeSpent: number;
}

export interface CreateReviewSessionData {
  reviewSession_insert: ReviewSession_Key;
}

export interface CreateReviewSessionVariables {
  score: number;
  sessionDate: TimestampString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  username: string;
  email: string;
  targetLanguage: string;
}

export interface CreateVocabularyData {
  vocabularyItem_insert: VocabularyItem_Key;
}

export interface CreateVocabularyVariables {
  originalWord: string;
  translation: string;
  masteryLevel: number;
}

export interface DeleteArticleData {
  article_delete?: Article_Key | null;
}

export interface DeleteArticleVariables {
  id: UUIDString;
}

export interface DeleteProgressData {
  userProgress_delete?: UserProgress_Key | null;
}

export interface DeleteProgressVariables {
  id: UUIDString;
}

export interface DeleteReviewSessionData {
  reviewSession_delete?: ReviewSession_Key | null;
}

export interface DeleteReviewSessionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface DeleteVocabularyData {
  vocabularyItem_delete?: VocabularyItem_Key | null;
}

export interface DeleteVocabularyVariables {
  id: UUIDString;
}

export interface GetArticleData {
  article?: {
    title: string;
    content: string;
  };
}

export interface GetArticleVariables {
  id: UUIDString;
}

export interface GetProgressData {
  userProgress?: {
    status: string;
    timeSpent: number;
  };
}

export interface GetProgressVariables {
  id: UUIDString;
}

export interface GetReviewSessionData {
  reviewSession?: {
    score: number;
    notes?: string | null;
  };
}

export interface GetReviewSessionVariables {
  id: UUIDString;
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
    streakCount?: number | null;
  };
}

export interface GetVocabularyData {
  vocabularyItem?: {
    originalWord: string;
    translation: string;
  };
}

export interface GetVocabularyVariables {
  id: UUIDString;
}

export interface ListArticlesData {
  articles: ({
    title: string;
    difficultyLevel: string;
  })[];
}

export interface ListUserProgressData {
  userProgresses: ({
    status: string;
    article: {
      title: string;
    };
  })[];
}

export interface ListUserReviewSessionsData {
  reviewSessions: ({
    sessionDate: TimestampString;
    score: number;
  })[];
}

export interface ListUserVocabularyData {
  vocabularyItems: ({
    originalWord: string;
    masteryLevel: number;
  })[];
}

export interface ListUsersData {
  users: ({
    username: string;
    level?: string | null;
  })[];
}

export interface ReviewSession_Key {
  id: UUIDString;
  __typename?: 'ReviewSession_Key';
}

export interface UpdateArticleData {
  article_update?: Article_Key | null;
}

export interface UpdateArticleVariables {
  id: UUIDString;
  title?: string | null;
}

export interface UpdateProgressData {
  userProgress_update?: UserProgress_Key | null;
}

export interface UpdateProgressVariables {
  id: UUIDString;
  status?: string | null;
}

export interface UpdateReviewSessionData {
  reviewSession_update?: ReviewSession_Key | null;
}

export interface UpdateReviewSessionVariables {
  id: UUIDString;
  notes?: string | null;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  username?: string | null;
  targetLanguage?: string | null;
}

export interface UpdateVocabularyData {
  vocabularyItem_update?: VocabularyItem_Key | null;
}

export interface UpdateVocabularyVariables {
  id: UUIDString;
  masteryLevel: number;
}

export interface UserProgress_Key {
  id: UUIDString;
  __typename?: 'UserProgress_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface VocabularyItem_Key {
  id: UUIDString;
  __typename?: 'VocabularyItem_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
  operationName: string;
}
export const createArticleRef: CreateArticleRef;

export function createArticle(vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;
export function createArticle(dc: DataConnect, vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface UpdateArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
  operationName: string;
}
export const updateArticleRef: UpdateArticleRef;

export function updateArticle(vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;
export function updateArticle(dc: DataConnect, vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface DeleteArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
  operationName: string;
}
export const deleteArticleRef: DeleteArticleRef;

export function deleteArticle(vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;
export function deleteArticle(dc: DataConnect, vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface GetArticleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArticleVariables): QueryRef<GetArticleData, GetArticleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetArticleVariables): QueryRef<GetArticleData, GetArticleVariables>;
  operationName: string;
}
export const getArticleRef: GetArticleRef;

export function getArticle(vars: GetArticleVariables, options?: ExecuteQueryOptions): QueryPromise<GetArticleData, GetArticleVariables>;
export function getArticle(dc: DataConnect, vars: GetArticleVariables, options?: ExecuteQueryOptions): QueryPromise<GetArticleData, GetArticleVariables>;

interface ListArticlesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListArticlesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListArticlesData, undefined>;
  operationName: string;
}
export const listArticlesRef: ListArticlesRef;

export function listArticles(options?: ExecuteQueryOptions): QueryPromise<ListArticlesData, undefined>;
export function listArticles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListArticlesData, undefined>;

interface CreateVocabularyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVocabularyVariables): MutationRef<CreateVocabularyData, CreateVocabularyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateVocabularyVariables): MutationRef<CreateVocabularyData, CreateVocabularyVariables>;
  operationName: string;
}
export const createVocabularyRef: CreateVocabularyRef;

export function createVocabulary(vars: CreateVocabularyVariables): MutationPromise<CreateVocabularyData, CreateVocabularyVariables>;
export function createVocabulary(dc: DataConnect, vars: CreateVocabularyVariables): MutationPromise<CreateVocabularyData, CreateVocabularyVariables>;

interface UpdateVocabularyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVocabularyVariables): MutationRef<UpdateVocabularyData, UpdateVocabularyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateVocabularyVariables): MutationRef<UpdateVocabularyData, UpdateVocabularyVariables>;
  operationName: string;
}
export const updateVocabularyRef: UpdateVocabularyRef;

export function updateVocabulary(vars: UpdateVocabularyVariables): MutationPromise<UpdateVocabularyData, UpdateVocabularyVariables>;
export function updateVocabulary(dc: DataConnect, vars: UpdateVocabularyVariables): MutationPromise<UpdateVocabularyData, UpdateVocabularyVariables>;

interface DeleteVocabularyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVocabularyVariables): MutationRef<DeleteVocabularyData, DeleteVocabularyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteVocabularyVariables): MutationRef<DeleteVocabularyData, DeleteVocabularyVariables>;
  operationName: string;
}
export const deleteVocabularyRef: DeleteVocabularyRef;

export function deleteVocabulary(vars: DeleteVocabularyVariables): MutationPromise<DeleteVocabularyData, DeleteVocabularyVariables>;
export function deleteVocabulary(dc: DataConnect, vars: DeleteVocabularyVariables): MutationPromise<DeleteVocabularyData, DeleteVocabularyVariables>;

interface GetVocabularyRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVocabularyVariables): QueryRef<GetVocabularyData, GetVocabularyVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetVocabularyVariables): QueryRef<GetVocabularyData, GetVocabularyVariables>;
  operationName: string;
}
export const getVocabularyRef: GetVocabularyRef;

export function getVocabulary(vars: GetVocabularyVariables, options?: ExecuteQueryOptions): QueryPromise<GetVocabularyData, GetVocabularyVariables>;
export function getVocabulary(dc: DataConnect, vars: GetVocabularyVariables, options?: ExecuteQueryOptions): QueryPromise<GetVocabularyData, GetVocabularyVariables>;

interface ListUserVocabularyRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserVocabularyData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserVocabularyData, undefined>;
  operationName: string;
}
export const listUserVocabularyRef: ListUserVocabularyRef;

export function listUserVocabulary(options?: ExecuteQueryOptions): QueryPromise<ListUserVocabularyData, undefined>;
export function listUserVocabulary(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserVocabularyData, undefined>;

interface CreateProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProgressVariables): MutationRef<CreateProgressData, CreateProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProgressVariables): MutationRef<CreateProgressData, CreateProgressVariables>;
  operationName: string;
}
export const createProgressRef: CreateProgressRef;

export function createProgress(vars: CreateProgressVariables): MutationPromise<CreateProgressData, CreateProgressVariables>;
export function createProgress(dc: DataConnect, vars: CreateProgressVariables): MutationPromise<CreateProgressData, CreateProgressVariables>;

interface UpdateProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressVariables): MutationRef<UpdateProgressData, UpdateProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProgressVariables): MutationRef<UpdateProgressData, UpdateProgressVariables>;
  operationName: string;
}
export const updateProgressRef: UpdateProgressRef;

export function updateProgress(vars: UpdateProgressVariables): MutationPromise<UpdateProgressData, UpdateProgressVariables>;
export function updateProgress(dc: DataConnect, vars: UpdateProgressVariables): MutationPromise<UpdateProgressData, UpdateProgressVariables>;

interface DeleteProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProgressVariables): MutationRef<DeleteProgressData, DeleteProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProgressVariables): MutationRef<DeleteProgressData, DeleteProgressVariables>;
  operationName: string;
}
export const deleteProgressRef: DeleteProgressRef;

export function deleteProgress(vars: DeleteProgressVariables): MutationPromise<DeleteProgressData, DeleteProgressVariables>;
export function deleteProgress(dc: DataConnect, vars: DeleteProgressVariables): MutationPromise<DeleteProgressData, DeleteProgressVariables>;

interface GetProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProgressVariables): QueryRef<GetProgressData, GetProgressVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProgressVariables): QueryRef<GetProgressData, GetProgressVariables>;
  operationName: string;
}
export const getProgressRef: GetProgressRef;

export function getProgress(vars: GetProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetProgressData, GetProgressVariables>;
export function getProgress(dc: DataConnect, vars: GetProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetProgressData, GetProgressVariables>;

interface ListUserProgressRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserProgressData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserProgressData, undefined>;
  operationName: string;
}
export const listUserProgressRef: ListUserProgressRef;

export function listUserProgress(options?: ExecuteQueryOptions): QueryPromise<ListUserProgressData, undefined>;
export function listUserProgress(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserProgressData, undefined>;

interface CreateReviewSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReviewSessionVariables): MutationRef<CreateReviewSessionData, CreateReviewSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateReviewSessionVariables): MutationRef<CreateReviewSessionData, CreateReviewSessionVariables>;
  operationName: string;
}
export const createReviewSessionRef: CreateReviewSessionRef;

export function createReviewSession(vars: CreateReviewSessionVariables): MutationPromise<CreateReviewSessionData, CreateReviewSessionVariables>;
export function createReviewSession(dc: DataConnect, vars: CreateReviewSessionVariables): MutationPromise<CreateReviewSessionData, CreateReviewSessionVariables>;

interface UpdateReviewSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReviewSessionVariables): MutationRef<UpdateReviewSessionData, UpdateReviewSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateReviewSessionVariables): MutationRef<UpdateReviewSessionData, UpdateReviewSessionVariables>;
  operationName: string;
}
export const updateReviewSessionRef: UpdateReviewSessionRef;

export function updateReviewSession(vars: UpdateReviewSessionVariables): MutationPromise<UpdateReviewSessionData, UpdateReviewSessionVariables>;
export function updateReviewSession(dc: DataConnect, vars: UpdateReviewSessionVariables): MutationPromise<UpdateReviewSessionData, UpdateReviewSessionVariables>;

interface DeleteReviewSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReviewSessionVariables): MutationRef<DeleteReviewSessionData, DeleteReviewSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteReviewSessionVariables): MutationRef<DeleteReviewSessionData, DeleteReviewSessionVariables>;
  operationName: string;
}
export const deleteReviewSessionRef: DeleteReviewSessionRef;

export function deleteReviewSession(vars: DeleteReviewSessionVariables): MutationPromise<DeleteReviewSessionData, DeleteReviewSessionVariables>;
export function deleteReviewSession(dc: DataConnect, vars: DeleteReviewSessionVariables): MutationPromise<DeleteReviewSessionData, DeleteReviewSessionVariables>;

interface GetReviewSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReviewSessionVariables): QueryRef<GetReviewSessionData, GetReviewSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetReviewSessionVariables): QueryRef<GetReviewSessionData, GetReviewSessionVariables>;
  operationName: string;
}
export const getReviewSessionRef: GetReviewSessionRef;

export function getReviewSession(vars: GetReviewSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetReviewSessionData, GetReviewSessionVariables>;
export function getReviewSession(dc: DataConnect, vars: GetReviewSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetReviewSessionData, GetReviewSessionVariables>;

interface ListUserReviewSessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserReviewSessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserReviewSessionsData, undefined>;
  operationName: string;
}
export const listUserReviewSessionsRef: ListUserReviewSessionsRef;

export function listUserReviewSessions(options?: ExecuteQueryOptions): QueryPromise<ListUserReviewSessionsData, undefined>;
export function listUserReviewSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserReviewSessionsData, undefined>;

