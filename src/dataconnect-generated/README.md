# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `Angular README`, you can find it at [`dataconnect-generated/angular/README.md`](./angular/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListUsers*](#listusers)
  - [*GetArticle*](#getarticle)
  - [*ListArticles*](#listarticles)
  - [*GetVocabulary*](#getvocabulary)
  - [*ListUserVocabulary*](#listuservocabulary)
  - [*GetProgress*](#getprogress)
  - [*ListUserProgress*](#listuserprogress)
  - [*GetReviewSession*](#getreviewsession)
  - [*ListUserReviewSessions*](#listuserreviewsessions)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateArticle*](#createarticle)
  - [*UpdateArticle*](#updatearticle)
  - [*DeleteArticle*](#deletearticle)
  - [*CreateVocabulary*](#createvocabulary)
  - [*UpdateVocabulary*](#updatevocabulary)
  - [*DeleteVocabulary*](#deletevocabulary)
  - [*CreateProgress*](#createprogress)
  - [*UpdateProgress*](#updateprogress)
  - [*DeleteProgress*](#deleteprogress)
  - [*CreateReviewSession*](#createreviewsession)
  - [*UpdateReviewSession*](#updatereviewsession)
  - [*DeleteReviewSession*](#deletereviewsession)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
    streakCount?: number | null;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    username: string;
    level?: string | null;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetArticle
You can execute the `GetArticle` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getArticle(vars: GetArticleVariables, options?: ExecuteQueryOptions): QueryPromise<GetArticleData, GetArticleVariables>;

interface GetArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetArticleVariables): QueryRef<GetArticleData, GetArticleVariables>;
}
export const getArticleRef: GetArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getArticle(dc: DataConnect, vars: GetArticleVariables, options?: ExecuteQueryOptions): QueryPromise<GetArticleData, GetArticleVariables>;

interface GetArticleRef {
  ...
  (dc: DataConnect, vars: GetArticleVariables): QueryRef<GetArticleData, GetArticleVariables>;
}
export const getArticleRef: GetArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getArticleRef:
```typescript
const name = getArticleRef.operationName;
console.log(name);
```

### Variables
The `GetArticle` query requires an argument of type `GetArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetArticleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetArticle` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetArticleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetArticleData {
  article?: {
    title: string;
    content: string;
  };
}
```
### Using `GetArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getArticle, GetArticleVariables } from '@dataconnect/generated';

// The `GetArticle` query requires an argument of type `GetArticleVariables`:
const getArticleVars: GetArticleVariables = {
  id: ..., 
};

// Call the `getArticle()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getArticle(getArticleVars);
// Variables can be defined inline as well.
const { data } = await getArticle({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getArticle(dataConnect, getArticleVars);

console.log(data.article);

// Or, you can use the `Promise` API.
getArticle(getArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article);
});
```

### Using `GetArticle`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getArticleRef, GetArticleVariables } from '@dataconnect/generated';

// The `GetArticle` query requires an argument of type `GetArticleVariables`:
const getArticleVars: GetArticleVariables = {
  id: ..., 
};

// Call the `getArticleRef()` function to get a reference to the query.
const ref = getArticleRef(getArticleVars);
// Variables can be defined inline as well.
const ref = getArticleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getArticleRef(dataConnect, getArticleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.article);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.article);
});
```

## ListArticles
You can execute the `ListArticles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listArticles(options?: ExecuteQueryOptions): QueryPromise<ListArticlesData, undefined>;

interface ListArticlesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListArticlesData, undefined>;
}
export const listArticlesRef: ListArticlesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listArticles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListArticlesData, undefined>;

interface ListArticlesRef {
  ...
  (dc: DataConnect): QueryRef<ListArticlesData, undefined>;
}
export const listArticlesRef: ListArticlesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listArticlesRef:
```typescript
const name = listArticlesRef.operationName;
console.log(name);
```

### Variables
The `ListArticles` query has no variables.
### Return Type
Recall that executing the `ListArticles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListArticlesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListArticlesData {
  articles: ({
    title: string;
    difficultyLevel: string;
  })[];
}
```
### Using `ListArticles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listArticles } from '@dataconnect/generated';


// Call the `listArticles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listArticles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listArticles(dataConnect);

console.log(data.articles);

// Or, you can use the `Promise` API.
listArticles().then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

### Using `ListArticles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listArticlesRef } from '@dataconnect/generated';


// Call the `listArticlesRef()` function to get a reference to the query.
const ref = listArticlesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listArticlesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.articles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.articles);
});
```

## GetVocabulary
You can execute the `GetVocabulary` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getVocabulary(vars: GetVocabularyVariables, options?: ExecuteQueryOptions): QueryPromise<GetVocabularyData, GetVocabularyVariables>;

interface GetVocabularyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetVocabularyVariables): QueryRef<GetVocabularyData, GetVocabularyVariables>;
}
export const getVocabularyRef: GetVocabularyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getVocabulary(dc: DataConnect, vars: GetVocabularyVariables, options?: ExecuteQueryOptions): QueryPromise<GetVocabularyData, GetVocabularyVariables>;

interface GetVocabularyRef {
  ...
  (dc: DataConnect, vars: GetVocabularyVariables): QueryRef<GetVocabularyData, GetVocabularyVariables>;
}
export const getVocabularyRef: GetVocabularyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getVocabularyRef:
```typescript
const name = getVocabularyRef.operationName;
console.log(name);
```

### Variables
The `GetVocabulary` query requires an argument of type `GetVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetVocabularyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetVocabulary` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetVocabularyData {
  vocabularyItem?: {
    originalWord: string;
    translation: string;
  };
}
```
### Using `GetVocabulary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getVocabulary, GetVocabularyVariables } from '@dataconnect/generated';

// The `GetVocabulary` query requires an argument of type `GetVocabularyVariables`:
const getVocabularyVars: GetVocabularyVariables = {
  id: ..., 
};

// Call the `getVocabulary()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getVocabulary(getVocabularyVars);
// Variables can be defined inline as well.
const { data } = await getVocabulary({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getVocabulary(dataConnect, getVocabularyVars);

console.log(data.vocabularyItem);

// Or, you can use the `Promise` API.
getVocabulary(getVocabularyVars).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem);
});
```

### Using `GetVocabulary`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getVocabularyRef, GetVocabularyVariables } from '@dataconnect/generated';

// The `GetVocabulary` query requires an argument of type `GetVocabularyVariables`:
const getVocabularyVars: GetVocabularyVariables = {
  id: ..., 
};

// Call the `getVocabularyRef()` function to get a reference to the query.
const ref = getVocabularyRef(getVocabularyVars);
// Variables can be defined inline as well.
const ref = getVocabularyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getVocabularyRef(dataConnect, getVocabularyVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vocabularyItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem);
});
```

## ListUserVocabulary
You can execute the `ListUserVocabulary` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserVocabulary(options?: ExecuteQueryOptions): QueryPromise<ListUserVocabularyData, undefined>;

interface ListUserVocabularyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserVocabularyData, undefined>;
}
export const listUserVocabularyRef: ListUserVocabularyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserVocabulary(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserVocabularyData, undefined>;

interface ListUserVocabularyRef {
  ...
  (dc: DataConnect): QueryRef<ListUserVocabularyData, undefined>;
}
export const listUserVocabularyRef: ListUserVocabularyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserVocabularyRef:
```typescript
const name = listUserVocabularyRef.operationName;
console.log(name);
```

### Variables
The `ListUserVocabulary` query has no variables.
### Return Type
Recall that executing the `ListUserVocabulary` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserVocabularyData {
  vocabularyItems: ({
    originalWord: string;
    masteryLevel: number;
  })[];
}
```
### Using `ListUserVocabulary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserVocabulary } from '@dataconnect/generated';


// Call the `listUserVocabulary()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserVocabulary();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserVocabulary(dataConnect);

console.log(data.vocabularyItems);

// Or, you can use the `Promise` API.
listUserVocabulary().then((response) => {
  const data = response.data;
  console.log(data.vocabularyItems);
});
```

### Using `ListUserVocabulary`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserVocabularyRef } from '@dataconnect/generated';


// Call the `listUserVocabularyRef()` function to get a reference to the query.
const ref = listUserVocabularyRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserVocabularyRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.vocabularyItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItems);
});
```

## GetProgress
You can execute the `GetProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProgress(vars: GetProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetProgressData, GetProgressVariables>;

interface GetProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProgressVariables): QueryRef<GetProgressData, GetProgressVariables>;
}
export const getProgressRef: GetProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProgress(dc: DataConnect, vars: GetProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetProgressData, GetProgressVariables>;

interface GetProgressRef {
  ...
  (dc: DataConnect, vars: GetProgressVariables): QueryRef<GetProgressData, GetProgressVariables>;
}
export const getProgressRef: GetProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProgressRef:
```typescript
const name = getProgressRef.operationName;
console.log(name);
```

### Variables
The `GetProgress` query requires an argument of type `GetProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProgressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProgressData {
  userProgress?: {
    status: string;
    timeSpent: number;
  };
}
```
### Using `GetProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProgress, GetProgressVariables } from '@dataconnect/generated';

// The `GetProgress` query requires an argument of type `GetProgressVariables`:
const getProgressVars: GetProgressVariables = {
  id: ..., 
};

// Call the `getProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProgress(getProgressVars);
// Variables can be defined inline as well.
const { data } = await getProgress({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProgress(dataConnect, getProgressVars);

console.log(data.userProgress);

// Or, you can use the `Promise` API.
getProgress(getProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress);
});
```

### Using `GetProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProgressRef, GetProgressVariables } from '@dataconnect/generated';

// The `GetProgress` query requires an argument of type `GetProgressVariables`:
const getProgressVars: GetProgressVariables = {
  id: ..., 
};

// Call the `getProgressRef()` function to get a reference to the query.
const ref = getProgressRef(getProgressVars);
// Variables can be defined inline as well.
const ref = getProgressRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProgressRef(dataConnect, getProgressVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userProgress);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress);
});
```

## ListUserProgress
You can execute the `ListUserProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserProgress(options?: ExecuteQueryOptions): QueryPromise<ListUserProgressData, undefined>;

interface ListUserProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserProgressData, undefined>;
}
export const listUserProgressRef: ListUserProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserProgress(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserProgressData, undefined>;

interface ListUserProgressRef {
  ...
  (dc: DataConnect): QueryRef<ListUserProgressData, undefined>;
}
export const listUserProgressRef: ListUserProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserProgressRef:
```typescript
const name = listUserProgressRef.operationName;
console.log(name);
```

### Variables
The `ListUserProgress` query has no variables.
### Return Type
Recall that executing the `ListUserProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserProgressData {
  userProgresses: ({
    status: string;
    article: {
      title: string;
    };
  })[];
}
```
### Using `ListUserProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserProgress } from '@dataconnect/generated';


// Call the `listUserProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserProgress();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserProgress(dataConnect);

console.log(data.userProgresses);

// Or, you can use the `Promise` API.
listUserProgress().then((response) => {
  const data = response.data;
  console.log(data.userProgresses);
});
```

### Using `ListUserProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserProgressRef } from '@dataconnect/generated';


// Call the `listUserProgressRef()` function to get a reference to the query.
const ref = listUserProgressRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserProgressRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userProgresses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgresses);
});
```

## GetReviewSession
You can execute the `GetReviewSession` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getReviewSession(vars: GetReviewSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetReviewSessionData, GetReviewSessionVariables>;

interface GetReviewSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetReviewSessionVariables): QueryRef<GetReviewSessionData, GetReviewSessionVariables>;
}
export const getReviewSessionRef: GetReviewSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getReviewSession(dc: DataConnect, vars: GetReviewSessionVariables, options?: ExecuteQueryOptions): QueryPromise<GetReviewSessionData, GetReviewSessionVariables>;

interface GetReviewSessionRef {
  ...
  (dc: DataConnect, vars: GetReviewSessionVariables): QueryRef<GetReviewSessionData, GetReviewSessionVariables>;
}
export const getReviewSessionRef: GetReviewSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getReviewSessionRef:
```typescript
const name = getReviewSessionRef.operationName;
console.log(name);
```

### Variables
The `GetReviewSession` query requires an argument of type `GetReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetReviewSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetReviewSession` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetReviewSessionData {
  reviewSession?: {
    score: number;
    notes?: string | null;
  };
}
```
### Using `GetReviewSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getReviewSession, GetReviewSessionVariables } from '@dataconnect/generated';

// The `GetReviewSession` query requires an argument of type `GetReviewSessionVariables`:
const getReviewSessionVars: GetReviewSessionVariables = {
  id: ..., 
};

// Call the `getReviewSession()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getReviewSession(getReviewSessionVars);
// Variables can be defined inline as well.
const { data } = await getReviewSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getReviewSession(dataConnect, getReviewSessionVars);

console.log(data.reviewSession);

// Or, you can use the `Promise` API.
getReviewSession(getReviewSessionVars).then((response) => {
  const data = response.data;
  console.log(data.reviewSession);
});
```

### Using `GetReviewSession`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getReviewSessionRef, GetReviewSessionVariables } from '@dataconnect/generated';

// The `GetReviewSession` query requires an argument of type `GetReviewSessionVariables`:
const getReviewSessionVars: GetReviewSessionVariables = {
  id: ..., 
};

// Call the `getReviewSessionRef()` function to get a reference to the query.
const ref = getReviewSessionRef(getReviewSessionVars);
// Variables can be defined inline as well.
const ref = getReviewSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getReviewSessionRef(dataConnect, getReviewSessionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviewSession);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviewSession);
});
```

## ListUserReviewSessions
You can execute the `ListUserReviewSessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserReviewSessions(options?: ExecuteQueryOptions): QueryPromise<ListUserReviewSessionsData, undefined>;

interface ListUserReviewSessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserReviewSessionsData, undefined>;
}
export const listUserReviewSessionsRef: ListUserReviewSessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserReviewSessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserReviewSessionsData, undefined>;

interface ListUserReviewSessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserReviewSessionsData, undefined>;
}
export const listUserReviewSessionsRef: ListUserReviewSessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserReviewSessionsRef:
```typescript
const name = listUserReviewSessionsRef.operationName;
console.log(name);
```

### Variables
The `ListUserReviewSessions` query has no variables.
### Return Type
Recall that executing the `ListUserReviewSessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserReviewSessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUserReviewSessionsData {
  reviewSessions: ({
    sessionDate: TimestampString;
    score: number;
  })[];
}
```
### Using `ListUserReviewSessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserReviewSessions } from '@dataconnect/generated';


// Call the `listUserReviewSessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserReviewSessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserReviewSessions(dataConnect);

console.log(data.reviewSessions);

// Or, you can use the `Promise` API.
listUserReviewSessions().then((response) => {
  const data = response.data;
  console.log(data.reviewSessions);
});
```

### Using `ListUserReviewSessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserReviewSessionsRef } from '@dataconnect/generated';


// Call the `listUserReviewSessionsRef()` function to get a reference to the query.
const ref = listUserReviewSessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserReviewSessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviewSessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviewSessions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  username: string;
  email: string;
  targetLanguage: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  targetLanguage: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ username: ..., email: ..., targetLanguage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  username: ..., 
  email: ..., 
  targetLanguage: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ username: ..., email: ..., targetLanguage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  username?: string | null;
  targetLanguage?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  username: ..., // optional
  targetLanguage: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ username: ..., targetLanguage: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  username: ..., // optional
  targetLanguage: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ username: ..., targetLanguage: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateArticle
You can execute the `CreateArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createArticle(vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface CreateArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
}
export const createArticleRef: CreateArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createArticle(dc: DataConnect, vars: CreateArticleVariables): MutationPromise<CreateArticleData, CreateArticleVariables>;

interface CreateArticleRef {
  ...
  (dc: DataConnect, vars: CreateArticleVariables): MutationRef<CreateArticleData, CreateArticleVariables>;
}
export const createArticleRef: CreateArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createArticleRef:
```typescript
const name = createArticleRef.operationName;
console.log(name);
```

### Variables
The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateArticleVariables {
  title: string;
  content: string;
  language: string;
  difficultyLevel: string;
}
```
### Return Type
Recall that executing the `CreateArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateArticleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateArticleData {
  article_insert: Article_Key;
}
```
### Using `CreateArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createArticle, CreateArticleVariables } from '@dataconnect/generated';

// The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`:
const createArticleVars: CreateArticleVariables = {
  title: ..., 
  content: ..., 
  language: ..., 
  difficultyLevel: ..., 
};

// Call the `createArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createArticle(createArticleVars);
// Variables can be defined inline as well.
const { data } = await createArticle({ title: ..., content: ..., language: ..., difficultyLevel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createArticle(dataConnect, createArticleVars);

console.log(data.article_insert);

// Or, you can use the `Promise` API.
createArticle(createArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_insert);
});
```

### Using `CreateArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createArticleRef, CreateArticleVariables } from '@dataconnect/generated';

// The `CreateArticle` mutation requires an argument of type `CreateArticleVariables`:
const createArticleVars: CreateArticleVariables = {
  title: ..., 
  content: ..., 
  language: ..., 
  difficultyLevel: ..., 
};

// Call the `createArticleRef()` function to get a reference to the mutation.
const ref = createArticleRef(createArticleVars);
// Variables can be defined inline as well.
const ref = createArticleRef({ title: ..., content: ..., language: ..., difficultyLevel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createArticleRef(dataConnect, createArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_insert);
});
```

## UpdateArticle
You can execute the `UpdateArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateArticle(vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface UpdateArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
}
export const updateArticleRef: UpdateArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateArticle(dc: DataConnect, vars: UpdateArticleVariables): MutationPromise<UpdateArticleData, UpdateArticleVariables>;

interface UpdateArticleRef {
  ...
  (dc: DataConnect, vars: UpdateArticleVariables): MutationRef<UpdateArticleData, UpdateArticleVariables>;
}
export const updateArticleRef: UpdateArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateArticleRef:
```typescript
const name = updateArticleRef.operationName;
console.log(name);
```

### Variables
The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateArticleVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateArticleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateArticleData {
  article_update?: Article_Key | null;
}
```
### Using `UpdateArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateArticle, UpdateArticleVariables } from '@dataconnect/generated';

// The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`:
const updateArticleVars: UpdateArticleVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateArticle(updateArticleVars);
// Variables can be defined inline as well.
const { data } = await updateArticle({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateArticle(dataConnect, updateArticleVars);

console.log(data.article_update);

// Or, you can use the `Promise` API.
updateArticle(updateArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

### Using `UpdateArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateArticleRef, UpdateArticleVariables } from '@dataconnect/generated';

// The `UpdateArticle` mutation requires an argument of type `UpdateArticleVariables`:
const updateArticleVars: UpdateArticleVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateArticleRef()` function to get a reference to the mutation.
const ref = updateArticleRef(updateArticleVars);
// Variables can be defined inline as well.
const ref = updateArticleRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateArticleRef(dataConnect, updateArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_update);
});
```

## DeleteArticle
You can execute the `DeleteArticle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteArticle(vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface DeleteArticleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
}
export const deleteArticleRef: DeleteArticleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteArticle(dc: DataConnect, vars: DeleteArticleVariables): MutationPromise<DeleteArticleData, DeleteArticleVariables>;

interface DeleteArticleRef {
  ...
  (dc: DataConnect, vars: DeleteArticleVariables): MutationRef<DeleteArticleData, DeleteArticleVariables>;
}
export const deleteArticleRef: DeleteArticleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteArticleRef:
```typescript
const name = deleteArticleRef.operationName;
console.log(name);
```

### Variables
The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteArticleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteArticle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteArticleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteArticleData {
  article_delete?: Article_Key | null;
}
```
### Using `DeleteArticle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteArticle, DeleteArticleVariables } from '@dataconnect/generated';

// The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`:
const deleteArticleVars: DeleteArticleVariables = {
  id: ..., 
};

// Call the `deleteArticle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteArticle(deleteArticleVars);
// Variables can be defined inline as well.
const { data } = await deleteArticle({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteArticle(dataConnect, deleteArticleVars);

console.log(data.article_delete);

// Or, you can use the `Promise` API.
deleteArticle(deleteArticleVars).then((response) => {
  const data = response.data;
  console.log(data.article_delete);
});
```

### Using `DeleteArticle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteArticleRef, DeleteArticleVariables } from '@dataconnect/generated';

// The `DeleteArticle` mutation requires an argument of type `DeleteArticleVariables`:
const deleteArticleVars: DeleteArticleVariables = {
  id: ..., 
};

// Call the `deleteArticleRef()` function to get a reference to the mutation.
const ref = deleteArticleRef(deleteArticleVars);
// Variables can be defined inline as well.
const ref = deleteArticleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteArticleRef(dataConnect, deleteArticleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.article_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.article_delete);
});
```

## CreateVocabulary
You can execute the `CreateVocabulary` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createVocabulary(vars: CreateVocabularyVariables): MutationPromise<CreateVocabularyData, CreateVocabularyVariables>;

interface CreateVocabularyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateVocabularyVariables): MutationRef<CreateVocabularyData, CreateVocabularyVariables>;
}
export const createVocabularyRef: CreateVocabularyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createVocabulary(dc: DataConnect, vars: CreateVocabularyVariables): MutationPromise<CreateVocabularyData, CreateVocabularyVariables>;

interface CreateVocabularyRef {
  ...
  (dc: DataConnect, vars: CreateVocabularyVariables): MutationRef<CreateVocabularyData, CreateVocabularyVariables>;
}
export const createVocabularyRef: CreateVocabularyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createVocabularyRef:
```typescript
const name = createVocabularyRef.operationName;
console.log(name);
```

### Variables
The `CreateVocabulary` mutation requires an argument of type `CreateVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateVocabularyVariables {
  originalWord: string;
  translation: string;
  masteryLevel: number;
}
```
### Return Type
Recall that executing the `CreateVocabulary` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateVocabularyData {
  vocabularyItem_insert: VocabularyItem_Key;
}
```
### Using `CreateVocabulary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createVocabulary, CreateVocabularyVariables } from '@dataconnect/generated';

// The `CreateVocabulary` mutation requires an argument of type `CreateVocabularyVariables`:
const createVocabularyVars: CreateVocabularyVariables = {
  originalWord: ..., 
  translation: ..., 
  masteryLevel: ..., 
};

// Call the `createVocabulary()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createVocabulary(createVocabularyVars);
// Variables can be defined inline as well.
const { data } = await createVocabulary({ originalWord: ..., translation: ..., masteryLevel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createVocabulary(dataConnect, createVocabularyVars);

console.log(data.vocabularyItem_insert);

// Or, you can use the `Promise` API.
createVocabulary(createVocabularyVars).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_insert);
});
```

### Using `CreateVocabulary`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createVocabularyRef, CreateVocabularyVariables } from '@dataconnect/generated';

// The `CreateVocabulary` mutation requires an argument of type `CreateVocabularyVariables`:
const createVocabularyVars: CreateVocabularyVariables = {
  originalWord: ..., 
  translation: ..., 
  masteryLevel: ..., 
};

// Call the `createVocabularyRef()` function to get a reference to the mutation.
const ref = createVocabularyRef(createVocabularyVars);
// Variables can be defined inline as well.
const ref = createVocabularyRef({ originalWord: ..., translation: ..., masteryLevel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createVocabularyRef(dataConnect, createVocabularyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vocabularyItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_insert);
});
```

## UpdateVocabulary
You can execute the `UpdateVocabulary` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateVocabulary(vars: UpdateVocabularyVariables): MutationPromise<UpdateVocabularyData, UpdateVocabularyVariables>;

interface UpdateVocabularyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateVocabularyVariables): MutationRef<UpdateVocabularyData, UpdateVocabularyVariables>;
}
export const updateVocabularyRef: UpdateVocabularyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateVocabulary(dc: DataConnect, vars: UpdateVocabularyVariables): MutationPromise<UpdateVocabularyData, UpdateVocabularyVariables>;

interface UpdateVocabularyRef {
  ...
  (dc: DataConnect, vars: UpdateVocabularyVariables): MutationRef<UpdateVocabularyData, UpdateVocabularyVariables>;
}
export const updateVocabularyRef: UpdateVocabularyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateVocabularyRef:
```typescript
const name = updateVocabularyRef.operationName;
console.log(name);
```

### Variables
The `UpdateVocabulary` mutation requires an argument of type `UpdateVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateVocabularyVariables {
  id: UUIDString;
  masteryLevel: number;
}
```
### Return Type
Recall that executing the `UpdateVocabulary` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateVocabularyData {
  vocabularyItem_update?: VocabularyItem_Key | null;
}
```
### Using `UpdateVocabulary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateVocabulary, UpdateVocabularyVariables } from '@dataconnect/generated';

// The `UpdateVocabulary` mutation requires an argument of type `UpdateVocabularyVariables`:
const updateVocabularyVars: UpdateVocabularyVariables = {
  id: ..., 
  masteryLevel: ..., 
};

// Call the `updateVocabulary()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateVocabulary(updateVocabularyVars);
// Variables can be defined inline as well.
const { data } = await updateVocabulary({ id: ..., masteryLevel: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateVocabulary(dataConnect, updateVocabularyVars);

console.log(data.vocabularyItem_update);

// Or, you can use the `Promise` API.
updateVocabulary(updateVocabularyVars).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_update);
});
```

### Using `UpdateVocabulary`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateVocabularyRef, UpdateVocabularyVariables } from '@dataconnect/generated';

// The `UpdateVocabulary` mutation requires an argument of type `UpdateVocabularyVariables`:
const updateVocabularyVars: UpdateVocabularyVariables = {
  id: ..., 
  masteryLevel: ..., 
};

// Call the `updateVocabularyRef()` function to get a reference to the mutation.
const ref = updateVocabularyRef(updateVocabularyVars);
// Variables can be defined inline as well.
const ref = updateVocabularyRef({ id: ..., masteryLevel: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateVocabularyRef(dataConnect, updateVocabularyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vocabularyItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_update);
});
```

## DeleteVocabulary
You can execute the `DeleteVocabulary` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteVocabulary(vars: DeleteVocabularyVariables): MutationPromise<DeleteVocabularyData, DeleteVocabularyVariables>;

interface DeleteVocabularyRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteVocabularyVariables): MutationRef<DeleteVocabularyData, DeleteVocabularyVariables>;
}
export const deleteVocabularyRef: DeleteVocabularyRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteVocabulary(dc: DataConnect, vars: DeleteVocabularyVariables): MutationPromise<DeleteVocabularyData, DeleteVocabularyVariables>;

interface DeleteVocabularyRef {
  ...
  (dc: DataConnect, vars: DeleteVocabularyVariables): MutationRef<DeleteVocabularyData, DeleteVocabularyVariables>;
}
export const deleteVocabularyRef: DeleteVocabularyRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteVocabularyRef:
```typescript
const name = deleteVocabularyRef.operationName;
console.log(name);
```

### Variables
The `DeleteVocabulary` mutation requires an argument of type `DeleteVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteVocabularyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteVocabulary` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteVocabularyData {
  vocabularyItem_delete?: VocabularyItem_Key | null;
}
```
### Using `DeleteVocabulary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteVocabulary, DeleteVocabularyVariables } from '@dataconnect/generated';

// The `DeleteVocabulary` mutation requires an argument of type `DeleteVocabularyVariables`:
const deleteVocabularyVars: DeleteVocabularyVariables = {
  id: ..., 
};

// Call the `deleteVocabulary()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteVocabulary(deleteVocabularyVars);
// Variables can be defined inline as well.
const { data } = await deleteVocabulary({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteVocabulary(dataConnect, deleteVocabularyVars);

console.log(data.vocabularyItem_delete);

// Or, you can use the `Promise` API.
deleteVocabulary(deleteVocabularyVars).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_delete);
});
```

### Using `DeleteVocabulary`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteVocabularyRef, DeleteVocabularyVariables } from '@dataconnect/generated';

// The `DeleteVocabulary` mutation requires an argument of type `DeleteVocabularyVariables`:
const deleteVocabularyVars: DeleteVocabularyVariables = {
  id: ..., 
};

// Call the `deleteVocabularyRef()` function to get a reference to the mutation.
const ref = deleteVocabularyRef(deleteVocabularyVars);
// Variables can be defined inline as well.
const ref = deleteVocabularyRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteVocabularyRef(dataConnect, deleteVocabularyVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vocabularyItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vocabularyItem_delete);
});
```

## CreateProgress
You can execute the `CreateProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProgress(vars: CreateProgressVariables): MutationPromise<CreateProgressData, CreateProgressVariables>;

interface CreateProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProgressVariables): MutationRef<CreateProgressData, CreateProgressVariables>;
}
export const createProgressRef: CreateProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProgress(dc: DataConnect, vars: CreateProgressVariables): MutationPromise<CreateProgressData, CreateProgressVariables>;

interface CreateProgressRef {
  ...
  (dc: DataConnect, vars: CreateProgressVariables): MutationRef<CreateProgressData, CreateProgressVariables>;
}
export const createProgressRef: CreateProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProgressRef:
```typescript
const name = createProgressRef.operationName;
console.log(name);
```

### Variables
The `CreateProgress` mutation requires an argument of type `CreateProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProgressVariables {
  articleId: UUIDString;
  status: string;
  timeSpent: number;
}
```
### Return Type
Recall that executing the `CreateProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProgressData {
  userProgress_insert: UserProgress_Key;
}
```
### Using `CreateProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProgress, CreateProgressVariables } from '@dataconnect/generated';

// The `CreateProgress` mutation requires an argument of type `CreateProgressVariables`:
const createProgressVars: CreateProgressVariables = {
  articleId: ..., 
  status: ..., 
  timeSpent: ..., 
};

// Call the `createProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProgress(createProgressVars);
// Variables can be defined inline as well.
const { data } = await createProgress({ articleId: ..., status: ..., timeSpent: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProgress(dataConnect, createProgressVars);

console.log(data.userProgress_insert);

// Or, you can use the `Promise` API.
createProgress(createProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress_insert);
});
```

### Using `CreateProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProgressRef, CreateProgressVariables } from '@dataconnect/generated';

// The `CreateProgress` mutation requires an argument of type `CreateProgressVariables`:
const createProgressVars: CreateProgressVariables = {
  articleId: ..., 
  status: ..., 
  timeSpent: ..., 
};

// Call the `createProgressRef()` function to get a reference to the mutation.
const ref = createProgressRef(createProgressVars);
// Variables can be defined inline as well.
const ref = createProgressRef({ articleId: ..., status: ..., timeSpent: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProgressRef(dataConnect, createProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProgress_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress_insert);
});
```

## UpdateProgress
You can execute the `UpdateProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProgress(vars: UpdateProgressVariables): MutationPromise<UpdateProgressData, UpdateProgressVariables>;

interface UpdateProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProgressVariables): MutationRef<UpdateProgressData, UpdateProgressVariables>;
}
export const updateProgressRef: UpdateProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProgress(dc: DataConnect, vars: UpdateProgressVariables): MutationPromise<UpdateProgressData, UpdateProgressVariables>;

interface UpdateProgressRef {
  ...
  (dc: DataConnect, vars: UpdateProgressVariables): MutationRef<UpdateProgressData, UpdateProgressVariables>;
}
export const updateProgressRef: UpdateProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProgressRef:
```typescript
const name = updateProgressRef.operationName;
console.log(name);
```

### Variables
The `UpdateProgress` mutation requires an argument of type `UpdateProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProgressVariables {
  id: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProgressData {
  userProgress_update?: UserProgress_Key | null;
}
```
### Using `UpdateProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProgress, UpdateProgressVariables } from '@dataconnect/generated';

// The `UpdateProgress` mutation requires an argument of type `UpdateProgressVariables`:
const updateProgressVars: UpdateProgressVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProgress(updateProgressVars);
// Variables can be defined inline as well.
const { data } = await updateProgress({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProgress(dataConnect, updateProgressVars);

console.log(data.userProgress_update);

// Or, you can use the `Promise` API.
updateProgress(updateProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress_update);
});
```

### Using `UpdateProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProgressRef, UpdateProgressVariables } from '@dataconnect/generated';

// The `UpdateProgress` mutation requires an argument of type `UpdateProgressVariables`:
const updateProgressVars: UpdateProgressVariables = {
  id: ..., 
  status: ..., // optional
};

// Call the `updateProgressRef()` function to get a reference to the mutation.
const ref = updateProgressRef(updateProgressVars);
// Variables can be defined inline as well.
const ref = updateProgressRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProgressRef(dataConnect, updateProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProgress_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress_update);
});
```

## DeleteProgress
You can execute the `DeleteProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProgress(vars: DeleteProgressVariables): MutationPromise<DeleteProgressData, DeleteProgressVariables>;

interface DeleteProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProgressVariables): MutationRef<DeleteProgressData, DeleteProgressVariables>;
}
export const deleteProgressRef: DeleteProgressRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProgress(dc: DataConnect, vars: DeleteProgressVariables): MutationPromise<DeleteProgressData, DeleteProgressVariables>;

interface DeleteProgressRef {
  ...
  (dc: DataConnect, vars: DeleteProgressVariables): MutationRef<DeleteProgressData, DeleteProgressVariables>;
}
export const deleteProgressRef: DeleteProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProgressRef:
```typescript
const name = deleteProgressRef.operationName;
console.log(name);
```

### Variables
The `DeleteProgress` mutation requires an argument of type `DeleteProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProgressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProgressData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProgressData {
  userProgress_delete?: UserProgress_Key | null;
}
```
### Using `DeleteProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProgress, DeleteProgressVariables } from '@dataconnect/generated';

// The `DeleteProgress` mutation requires an argument of type `DeleteProgressVariables`:
const deleteProgressVars: DeleteProgressVariables = {
  id: ..., 
};

// Call the `deleteProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProgress(deleteProgressVars);
// Variables can be defined inline as well.
const { data } = await deleteProgress({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProgress(dataConnect, deleteProgressVars);

console.log(data.userProgress_delete);

// Or, you can use the `Promise` API.
deleteProgress(deleteProgressVars).then((response) => {
  const data = response.data;
  console.log(data.userProgress_delete);
});
```

### Using `DeleteProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProgressRef, DeleteProgressVariables } from '@dataconnect/generated';

// The `DeleteProgress` mutation requires an argument of type `DeleteProgressVariables`:
const deleteProgressVars: DeleteProgressVariables = {
  id: ..., 
};

// Call the `deleteProgressRef()` function to get a reference to the mutation.
const ref = deleteProgressRef(deleteProgressVars);
// Variables can be defined inline as well.
const ref = deleteProgressRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProgressRef(dataConnect, deleteProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userProgress_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userProgress_delete);
});
```

## CreateReviewSession
You can execute the `CreateReviewSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createReviewSession(vars: CreateReviewSessionVariables): MutationPromise<CreateReviewSessionData, CreateReviewSessionVariables>;

interface CreateReviewSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateReviewSessionVariables): MutationRef<CreateReviewSessionData, CreateReviewSessionVariables>;
}
export const createReviewSessionRef: CreateReviewSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createReviewSession(dc: DataConnect, vars: CreateReviewSessionVariables): MutationPromise<CreateReviewSessionData, CreateReviewSessionVariables>;

interface CreateReviewSessionRef {
  ...
  (dc: DataConnect, vars: CreateReviewSessionVariables): MutationRef<CreateReviewSessionData, CreateReviewSessionVariables>;
}
export const createReviewSessionRef: CreateReviewSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createReviewSessionRef:
```typescript
const name = createReviewSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateReviewSession` mutation requires an argument of type `CreateReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateReviewSessionVariables {
  score: number;
  sessionDate: TimestampString;
}
```
### Return Type
Recall that executing the `CreateReviewSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateReviewSessionData {
  reviewSession_insert: ReviewSession_Key;
}
```
### Using `CreateReviewSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createReviewSession, CreateReviewSessionVariables } from '@dataconnect/generated';

// The `CreateReviewSession` mutation requires an argument of type `CreateReviewSessionVariables`:
const createReviewSessionVars: CreateReviewSessionVariables = {
  score: ..., 
  sessionDate: ..., 
};

// Call the `createReviewSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createReviewSession(createReviewSessionVars);
// Variables can be defined inline as well.
const { data } = await createReviewSession({ score: ..., sessionDate: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createReviewSession(dataConnect, createReviewSessionVars);

console.log(data.reviewSession_insert);

// Or, you can use the `Promise` API.
createReviewSession(createReviewSessionVars).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_insert);
});
```

### Using `CreateReviewSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createReviewSessionRef, CreateReviewSessionVariables } from '@dataconnect/generated';

// The `CreateReviewSession` mutation requires an argument of type `CreateReviewSessionVariables`:
const createReviewSessionVars: CreateReviewSessionVariables = {
  score: ..., 
  sessionDate: ..., 
};

// Call the `createReviewSessionRef()` function to get a reference to the mutation.
const ref = createReviewSessionRef(createReviewSessionVars);
// Variables can be defined inline as well.
const ref = createReviewSessionRef({ score: ..., sessionDate: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createReviewSessionRef(dataConnect, createReviewSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reviewSession_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_insert);
});
```

## UpdateReviewSession
You can execute the `UpdateReviewSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateReviewSession(vars: UpdateReviewSessionVariables): MutationPromise<UpdateReviewSessionData, UpdateReviewSessionVariables>;

interface UpdateReviewSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateReviewSessionVariables): MutationRef<UpdateReviewSessionData, UpdateReviewSessionVariables>;
}
export const updateReviewSessionRef: UpdateReviewSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateReviewSession(dc: DataConnect, vars: UpdateReviewSessionVariables): MutationPromise<UpdateReviewSessionData, UpdateReviewSessionVariables>;

interface UpdateReviewSessionRef {
  ...
  (dc: DataConnect, vars: UpdateReviewSessionVariables): MutationRef<UpdateReviewSessionData, UpdateReviewSessionVariables>;
}
export const updateReviewSessionRef: UpdateReviewSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateReviewSessionRef:
```typescript
const name = updateReviewSessionRef.operationName;
console.log(name);
```

### Variables
The `UpdateReviewSession` mutation requires an argument of type `UpdateReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateReviewSessionVariables {
  id: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateReviewSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateReviewSessionData {
  reviewSession_update?: ReviewSession_Key | null;
}
```
### Using `UpdateReviewSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateReviewSession, UpdateReviewSessionVariables } from '@dataconnect/generated';

// The `UpdateReviewSession` mutation requires an argument of type `UpdateReviewSessionVariables`:
const updateReviewSessionVars: UpdateReviewSessionVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateReviewSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateReviewSession(updateReviewSessionVars);
// Variables can be defined inline as well.
const { data } = await updateReviewSession({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateReviewSession(dataConnect, updateReviewSessionVars);

console.log(data.reviewSession_update);

// Or, you can use the `Promise` API.
updateReviewSession(updateReviewSessionVars).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_update);
});
```

### Using `UpdateReviewSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateReviewSessionRef, UpdateReviewSessionVariables } from '@dataconnect/generated';

// The `UpdateReviewSession` mutation requires an argument of type `UpdateReviewSessionVariables`:
const updateReviewSessionVars: UpdateReviewSessionVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateReviewSessionRef()` function to get a reference to the mutation.
const ref = updateReviewSessionRef(updateReviewSessionVars);
// Variables can be defined inline as well.
const ref = updateReviewSessionRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateReviewSessionRef(dataConnect, updateReviewSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reviewSession_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_update);
});
```

## DeleteReviewSession
You can execute the `DeleteReviewSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteReviewSession(vars: DeleteReviewSessionVariables): MutationPromise<DeleteReviewSessionData, DeleteReviewSessionVariables>;

interface DeleteReviewSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteReviewSessionVariables): MutationRef<DeleteReviewSessionData, DeleteReviewSessionVariables>;
}
export const deleteReviewSessionRef: DeleteReviewSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteReviewSession(dc: DataConnect, vars: DeleteReviewSessionVariables): MutationPromise<DeleteReviewSessionData, DeleteReviewSessionVariables>;

interface DeleteReviewSessionRef {
  ...
  (dc: DataConnect, vars: DeleteReviewSessionVariables): MutationRef<DeleteReviewSessionData, DeleteReviewSessionVariables>;
}
export const deleteReviewSessionRef: DeleteReviewSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteReviewSessionRef:
```typescript
const name = deleteReviewSessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteReviewSession` mutation requires an argument of type `DeleteReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteReviewSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteReviewSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteReviewSessionData {
  reviewSession_delete?: ReviewSession_Key | null;
}
```
### Using `DeleteReviewSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteReviewSession, DeleteReviewSessionVariables } from '@dataconnect/generated';

// The `DeleteReviewSession` mutation requires an argument of type `DeleteReviewSessionVariables`:
const deleteReviewSessionVars: DeleteReviewSessionVariables = {
  id: ..., 
};

// Call the `deleteReviewSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteReviewSession(deleteReviewSessionVars);
// Variables can be defined inline as well.
const { data } = await deleteReviewSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteReviewSession(dataConnect, deleteReviewSessionVars);

console.log(data.reviewSession_delete);

// Or, you can use the `Promise` API.
deleteReviewSession(deleteReviewSessionVars).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_delete);
});
```

### Using `DeleteReviewSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteReviewSessionRef, DeleteReviewSessionVariables } from '@dataconnect/generated';

// The `DeleteReviewSession` mutation requires an argument of type `DeleteReviewSessionVariables`:
const deleteReviewSessionVars: DeleteReviewSessionVariables = {
  id: ..., 
};

// Call the `deleteReviewSessionRef()` function to get a reference to the mutation.
const ref = deleteReviewSessionRef(deleteReviewSessionVars);
// Variables can be defined inline as well.
const ref = deleteReviewSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteReviewSessionRef(dataConnect, deleteReviewSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.reviewSession_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.reviewSession_delete);
});
```

