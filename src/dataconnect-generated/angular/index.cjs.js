const { createUserRef, updateUserRef, deleteUserRef, getUserRef, listUsersRef, createArticleRef, updateArticleRef, deleteArticleRef, getArticleRef, listArticlesRef, createVocabularyRef, updateVocabularyRef, deleteVocabularyRef, getVocabularyRef, listUserVocabularyRef, createProgressRef, updateProgressRef, deleteProgressRef, getProgressRef, listUserProgressRef, createReviewSessionRef, updateReviewSessionRef, deleteReviewSessionRef, getReviewSessionRef, listUserReviewSessionsRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateUser = function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateUser = function injectUpdateUser(args, injector) {
  return injectDataConnectMutation(updateUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteUser = function injectDeleteUser(args, injector) {
  return injectDataConnectMutation(deleteUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetUser = function injectGetUser(options, injector) {
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

exports.injectListUsers = function injectListUsers(options, injector) {
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

exports.injectCreateArticle = function injectCreateArticle(args, injector) {
  return injectDataConnectMutation(createArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateArticle = function injectUpdateArticle(args, injector) {
  return injectDataConnectMutation(updateArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteArticle = function injectDeleteArticle(args, injector) {
  return injectDataConnectMutation(deleteArticleRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetArticle = function injectGetArticle(args, options, injector) {
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

exports.injectListArticles = function injectListArticles(options, injector) {
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

exports.injectCreateVocabulary = function injectCreateVocabulary(args, injector) {
  return injectDataConnectMutation(createVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateVocabulary = function injectUpdateVocabulary(args, injector) {
  return injectDataConnectMutation(updateVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteVocabulary = function injectDeleteVocabulary(args, injector) {
  return injectDataConnectMutation(deleteVocabularyRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetVocabulary = function injectGetVocabulary(args, options, injector) {
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

exports.injectListUserVocabulary = function injectListUserVocabulary(options, injector) {
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

exports.injectCreateProgress = function injectCreateProgress(args, injector) {
  return injectDataConnectMutation(createProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateProgress = function injectUpdateProgress(args, injector) {
  return injectDataConnectMutation(updateProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteProgress = function injectDeleteProgress(args, injector) {
  return injectDataConnectMutation(deleteProgressRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetProgress = function injectGetProgress(args, options, injector) {
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

exports.injectListUserProgress = function injectListUserProgress(options, injector) {
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

exports.injectCreateReviewSession = function injectCreateReviewSession(args, injector) {
  return injectDataConnectMutation(createReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectUpdateReviewSession = function injectUpdateReviewSession(args, injector) {
  return injectDataConnectMutation(updateReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectDeleteReviewSession = function injectDeleteReviewSession(args, injector) {
  return injectDataConnectMutation(deleteReviewSessionRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetReviewSession = function injectGetReviewSession(args, options, injector) {
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

exports.injectListUserReviewSessions = function injectListUserReviewSessions(options, injector) {
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

