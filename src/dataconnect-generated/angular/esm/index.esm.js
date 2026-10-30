import { createUserRef, updateUserRef, deleteUserRef, getUserRef, listUsersRef, createArticleRef, updateArticleRef, deleteArticleRef, getArticleRef, listArticlesRef, createVocabularyRef, updateVocabularyRef, deleteVocabularyRef, getVocabularyRef, listUserVocabularyRef, createProgressRef, updateProgressRef, deleteProgressRef, getProgressRef, listUserProgressRef, createReviewSessionRef, updateReviewSessionRef, deleteReviewSessionRef, getReviewSessionRef, listUserReviewSessionsRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateUser(args, injector) {
  return injectDataConnectMutation(updateUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteUser(args, injector) {
  return injectDataConnectMutation(deleteUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetUser(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getUserRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUsers(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUsersRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateArticle(args, injector) {
  return injectDataConnectMutation(createArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateArticle(args, injector) {
  return injectDataConnectMutation(updateArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteArticle(args, injector) {
  return injectDataConnectMutation(deleteArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetArticle(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getArticleRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListArticles(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listArticlesRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateVocabulary(args, injector) {
  return injectDataConnectMutation(createVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateVocabulary(args, injector) {
  return injectDataConnectMutation(updateVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteVocabulary(args, injector) {
  return injectDataConnectMutation(deleteVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetVocabulary(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getVocabularyRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserVocabulary(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserVocabularyRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateProgress(args, injector) {
  return injectDataConnectMutation(createProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateProgress(args, injector) {
  return injectDataConnectMutation(updateProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteProgress(args, injector) {
  return injectDataConnectMutation(deleteProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetProgress(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getProgressRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserProgress(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserProgressRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectCreateReviewSession(args, injector) {
  return injectDataConnectMutation(createReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateReviewSession(args, injector) {
  return injectDataConnectMutation(updateReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectDeleteReviewSession(args, injector) {
  return injectDataConnectMutation(deleteReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetReviewSession(args, options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  const varsFactoryFn = (typeof args === 'function') ? args : () => args;
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getReviewSessionRef(dc, varsFactoryFn()),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListUserReviewSessions(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listUserReviewSessionsRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

