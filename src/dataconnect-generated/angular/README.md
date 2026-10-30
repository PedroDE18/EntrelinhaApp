# Generated Angular README
This README will guide you through the process of using the generated Angular SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect-generated/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@dataconnect/generated/angular` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#angular).

# Table of Contents
- [**Overview**](#generated-angular-readme)
- [**TanStack Query Firebase & TanStack Angular Query**](#tanstack-query-firebase-tanstack-angular-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-angular-query-packages)
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

# TanStack Query Firebase & TanStack Angular Query
This SDK provides [Angular](https://angular.dev/) injectors generated specific to your application, for the operations found in the connector `example`. These injectors are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack Angular Query v5](https://tanstack.com/query/v5/docs/framework/angular/overview) and [AngularFire](https://github.com/angular/angularfire/tree/main).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated Angular SDK.

## Installing TanStack Query Firebase and TanStack Angular Query Packages
In order to use the Angular generated SDK, you must install `AngularFire` and select `Data Connect` during the setup.

You can install `AngularFire` using the [Angular CLI](https://angular.dev/installation#install-angular-cli). You can also follow the installation instructions from the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular#automatic-setup).

```bash
npm install -g @angular/cli
```
```bash
ng add @angular/fire
# select Data Connect during setup!
```

This should handle configuring your project to use TanStack Query. However, if you need to set up manually, please follow the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/angular#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, edit your `main.ts` file and your `app/app.config.ts` file and update your `provideDataConnect` provider:
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
... // other imports
// update your imports to include the function that connects to the emulator
import { getDataConnect, provideDataConnect, connectDataConnectEmulator } from '@angular/fire/data-connect';

// update the `provideDataConnect` provider to provide an instance of `DataConnect` which uses the emulator:
export const appConfig: ApplicationConfig = {
  providers: [
    ... // other providers
    // Firebase Data Connect providers
    ...
    provideDataConnect(() => {
      const dataConnect = getDataConnect(connectorConfig);
      connectDataConnectEmulator(dataConnect, 'localhost', 9399);
      return dataConnect;
    }),
  ],
};
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the injectors provided from your generated Angular SDK.

# Queries

The Angular generated SDK provides Query injectors that call [`injectDataConnectQuery`](https://react-query-firebase.invertase.dev/angular/data-connect/querying) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/querying).

TanStack Angular Query caches the results of your Queries, so using the same Query injector in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query injectors execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/disabling-queries).

To learn more about TanStack Angular Query's Queries, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/queries).

## Using Query Injectors
Here's a general overview of how to use the generated Query injectors in your code:

- If the Query has no variables, the Query injector does not require arguments.
- If the Query has any required variables, the Query injector will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query injector does not require any arguments.
- The Angular generated SDK's Query injectors do not accept `DataConnect` instances as arguments.
- Query injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query injector without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `example` connector's generated Query injectors to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetUser
You can execute the `GetUser` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetUser(options?: GetUserOptions, injector?: Injector): CreateDataConnectQueryResult<GetUserData, undefined>;
```

### Variables
The `GetUser` Query has no variables.
### Return Type
Recall that calling the `GetUser` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetUser` Query is of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
    streakCount?: number | null;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetUser`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectGetUser, GetUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetUser();

  // You can also pass in an options function (not object) of type `GetUserOptions` to the Query injector function.
  options: GetUserOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetUser(this.options);
}
```

## ListUsers
You can execute the `ListUsers` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUsers(options?: ListUsersOptions, injector?: Injector): CreateDataConnectQueryResult<ListUsersData, undefined>;
```

### Variables
The `ListUsers` Query has no variables.
### Return Type
Recall that calling the `ListUsers` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUsers` Query is of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUsersData {
  users: ({
    username: string;
    level?: string | null;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUsers`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUsers, ListUsersOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUsers();

  // You can also pass in an options function (not object) of type `ListUsersOptions` to the Query injector function.
  options: ListUsersOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUsers(this.options);
}
```

## GetArticle
You can execute the `GetArticle` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetArticle(args: GetArticleArgs, options?: GetArticleOptions, injector?: Injector): CreateDataConnectQueryResult<GetArticleData, GetArticleVariables>;
```

### Variables
The `GetArticle` Query requires an argument of type `GetArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetArticleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetArticle` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetArticle` Query is of type `GetArticleData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetArticleData {
  article?: {
    title: string;
    content: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetArticle`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetArticleVariables } from '@dataconnect/generated';
import { injectGetArticle, GetArticleOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetArticle` Query requires an argument of type `GetArticleVariables`:
  getArticleVars: GetArticleVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetArticle(this.getArticleVars);
  // Variables can be defined inline as well.
  query = injectGetArticle({ id: ..., });

  // You can also pass in an options function (not object) of type `GetArticleOptions` to the Query injector function.
  options: GetArticleOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetArticle(this.getArticleVars, this.options);
}
```

## ListArticles
You can execute the `ListArticles` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListArticles(options?: ListArticlesOptions, injector?: Injector): CreateDataConnectQueryResult<ListArticlesData, undefined>;
```

### Variables
The `ListArticles` Query has no variables.
### Return Type
Recall that calling the `ListArticles` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListArticles` Query is of type `ListArticlesData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListArticlesData {
  articles: ({
    title: string;
    difficultyLevel: string;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListArticles`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListArticles, ListArticlesOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListArticles();

  // You can also pass in an options function (not object) of type `ListArticlesOptions` to the Query injector function.
  options: ListArticlesOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListArticles(this.options);
}
```

## GetVocabulary
You can execute the `GetVocabulary` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetVocabulary(args: GetVocabularyArgs, options?: GetVocabularyOptions, injector?: Injector): CreateDataConnectQueryResult<GetVocabularyData, GetVocabularyVariables>;
```

### Variables
The `GetVocabulary` Query requires an argument of type `GetVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetVocabularyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetVocabulary` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetVocabulary` Query is of type `GetVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetVocabularyData {
  vocabularyItem?: {
    originalWord: string;
    translation: string;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetVocabulary`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetVocabularyVariables } from '@dataconnect/generated';
import { injectGetVocabulary, GetVocabularyOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetVocabulary` Query requires an argument of type `GetVocabularyVariables`:
  getVocabularyVars: GetVocabularyVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetVocabulary(this.getVocabularyVars);
  // Variables can be defined inline as well.
  query = injectGetVocabulary({ id: ..., });

  // You can also pass in an options function (not object) of type `GetVocabularyOptions` to the Query injector function.
  options: GetVocabularyOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetVocabulary(this.getVocabularyVars, this.options);
}
```

## ListUserVocabulary
You can execute the `ListUserVocabulary` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUserVocabulary(options?: ListUserVocabularyOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserVocabularyData, undefined>;
```

### Variables
The `ListUserVocabulary` Query has no variables.
### Return Type
Recall that calling the `ListUserVocabulary` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUserVocabulary` Query is of type `ListUserVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUserVocabularyData {
  vocabularyItems: ({
    originalWord: string;
    masteryLevel: number;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUserVocabulary`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUserVocabulary, ListUserVocabularyOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUserVocabulary();

  // You can also pass in an options function (not object) of type `ListUserVocabularyOptions` to the Query injector function.
  options: ListUserVocabularyOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUserVocabulary(this.options);
}
```

## GetProgress
You can execute the `GetProgress` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetProgress(args: GetProgressArgs, options?: GetProgressOptions, injector?: Injector): CreateDataConnectQueryResult<GetProgressData, GetProgressVariables>;
```

### Variables
The `GetProgress` Query requires an argument of type `GetProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetProgressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetProgress` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetProgress` Query is of type `GetProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetProgressData {
  userProgress?: {
    status: string;
    timeSpent: number;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetProgress`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetProgressVariables } from '@dataconnect/generated';
import { injectGetProgress, GetProgressOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetProgress` Query requires an argument of type `GetProgressVariables`:
  getProgressVars: GetProgressVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetProgress(this.getProgressVars);
  // Variables can be defined inline as well.
  query = injectGetProgress({ id: ..., });

  // You can also pass in an options function (not object) of type `GetProgressOptions` to the Query injector function.
  options: GetProgressOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetProgress(this.getProgressVars, this.options);
}
```

## ListUserProgress
You can execute the `ListUserProgress` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUserProgress(options?: ListUserProgressOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserProgressData, undefined>;
```

### Variables
The `ListUserProgress` Query has no variables.
### Return Type
Recall that calling the `ListUserProgress` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUserProgress` Query is of type `ListUserProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUserProgressData {
  userProgresses: ({
    status: string;
    article: {
      title: string;
    };
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUserProgress`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUserProgress, ListUserProgressOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUserProgress();

  // You can also pass in an options function (not object) of type `ListUserProgressOptions` to the Query injector function.
  options: ListUserProgressOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUserProgress(this.options);
}
```

## GetReviewSession
You can execute the `GetReviewSession` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectGetReviewSession(args: GetReviewSessionArgs, options?: GetReviewSessionOptions, injector?: Injector): CreateDataConnectQueryResult<GetReviewSessionData, GetReviewSessionVariables>;
```

### Variables
The `GetReviewSession` Query requires an argument of type `GetReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetReviewSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `GetReviewSession` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `GetReviewSession` Query is of type `GetReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetReviewSessionData {
  reviewSession?: {
    score: number;
    notes?: string | null;
  };
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `GetReviewSession`'s Query injector

```javascript
... // other imports
import { connectorConfig, GetReviewSessionVariables } from '@dataconnect/generated';
import { injectGetReviewSession, GetReviewSessionOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // The `GetReviewSession` Query requires an argument of type `GetReviewSessionVariables`:
  getReviewSessionVars: GetReviewSessionVariables = {
    id: ..., 
  };

  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectGetReviewSession(this.getReviewSessionVars);
  // Variables can be defined inline as well.
  query = injectGetReviewSession({ id: ..., });

  // You can also pass in an options function (not object) of type `GetReviewSessionOptions` to the Query injector function.
  options: GetReviewSessionOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectGetReviewSession(this.getReviewSessionVars, this.options);
}
```

## ListUserReviewSessions
You can execute the `ListUserReviewSessions` Query using the following Query injector, which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts):

```javascript
injectListUserReviewSessions(options?: ListUserReviewSessionsOptions, injector?: Injector): CreateDataConnectQueryResult<ListUserReviewSessionsData, undefined>;
```

### Variables
The `ListUserReviewSessions` Query has no variables.
### Return Type
Recall that calling the `ListUserReviewSessions` Query injector returns a `CreateDataConnectQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `CreateDataConnectQueryResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectQueryResult.isPending()`, `CreateDataConnectQueryResult.isSuccess()`, and `CreateDataConnectQueryResult.isError()` functions.

To access the data returned by a Query, use the `CreateDataConnectQueryResult.data()` function. The data for the `ListUserReviewSessions` Query is of type `ListUserReviewSessionsData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ListUserReviewSessionsData {
  reviewSessions: ({
    sessionDate: TimestampString;
    score: number;
  })[];
}
```

To learn more about the `CreateDataConnectQueryResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectQuery) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectquery).

### Using `ListUserReviewSessions`'s Query injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectListUserReviewSessions, ListUserReviewSessionsOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Query. -->
    @if (query.isPending()) {
      Loading...
    }
    @if (query.error()) {
      An error has occurred: {{ query.error() }}
    }
    <!-- If the Query is successful, you can access the data returned using
      the CreateDataConnectQueryResult.data() function. -->
    @if (query.data(); as data) {
      <!-- use your data to display something -->
            <div>Query successful!</div>
    }
  `,
})
export class MyComponent {
  // Since the execution of the query is eager, you don't have to call `execute` to "execute" the Query.
  // Call the Query injector function to get a `CreateDataConnectQueryResult` object which holds the state of your Query.
  query = injectListUserReviewSessions();

  // You can also pass in an options function (not object) of type `ListUserReviewSessionsOptions` to the Query injector function.
  options: ListUserReviewSessionsOptions = () => {
    return {
      staleTime: 5 * 1000
    };
  };
  query = injectListUserReviewSessions(this.options);
}
```

# Mutations

The Angular generated SDK provides Mutations injectors that call [`injectDataConnectMutation`](https://react-query-firebase.invertase.dev/angular/data-connect/mutations) from TanStack Query Firebase.

Calling these injectors will return a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these injectors and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/angular/data-connect/mutations).

Mutation injectors do not execute their Mutations automatically when called. Rather, after calling the Mutation injector and getting a `CreateDataConnectMutationResult` object, you must call the `CreateDataConnectMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack Angular Query's Mutations, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations).

## Using Mutation Injectors
Here's a general overview of how to use the generated Mutation injectors in your code:

- Mutation injectors are not called with the arguments to the Mutation. Instead, arguments are passed to `CreateDataConnectMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation injector does not require any arguments.
- The Angular generated SDK's Mutation injectors do not accept `DataConnect` instances as arguments.
- Mutation injector functions can be called with or without passing in an `options` argument, whose type is a function which returns an object. The type is generated alongside the operation's injector function in [dataconnect-generated/angular/index.d.ts](./index.d.ts). The type is generated alongside the operation's injector function. To learn more about the `options` argument, see the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/guides/mutations#mutation-side-effects).
  - `CreateDataConnectMutationResult.mutate()` also accepts an `options` argument. It's type is not a function which returns an object, but the object itself.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `CreateDataConnectMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `example` connector's generated Mutation injectors to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateUser
You can execute the `CreateUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, CreateUserVariables, CreateUserVariables>;
```

### Variables
The `CreateUser` Mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateUserVariables {
  username: string;
  email: string;
  targetLanguage: string;
}
```
### Return Type
Recall that calling the `CreateUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateUser` Mutation is of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateUserData {
  user_insert: User_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateUserVariables } from '@dataconnect/generated';
import { injectCreateUser, CreateUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateUser();

  // You can also pass in a `CreateUserOptions` function (not object) to the Mutation injector function.
  options: CreateUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateUser` Mutation requires an argument of type `CreateUserVariables`:
    const createUserVars: CreateUserVariables = {
      username: ..., 
      email: ..., 
      targetLanguage: ..., 
    };
    this.mutation.mutate(createUserVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ username: ..., email: ..., targetLanguage: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createUserVars);

    // You can also pass in a `CreateUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createUserVars, this.options());
  }
}
```

## UpdateUser
You can execute the `UpdateUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateUser(options?: UpdateUserOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateUserData, UpdateUserVariables, UpdateUserVariables | void>;
```

### Variables
The `UpdateUser` Mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateUserVariables {
  username?: string | null;
  targetLanguage?: string | null;
}
```
### Return Type
Recall that calling the `UpdateUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateUser` Mutation is of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateUserVariables } from '@dataconnect/generated';
import { injectUpdateUser, UpdateUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateUser();

  // You can also pass in a `UpdateUserOptions` function (not object) to the Mutation injector function.
  options: UpdateUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateUser` Mutation has an optional argument of type `UpdateUserVariables`:
    const updateUserVars: UpdateUserVariables = {
      username: ..., // optional
      targetLanguage: ..., // optional
    };
    this.mutation.mutate(updateUserVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ username: ..., targetLanguage: ..., });
    // Since all variables are optional for this Mutation, you can omit the `UpdateUserVariables` argument.
    this.mutation.mutate();

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateUserVars);

    // You can also pass in a `UpdateUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    // Since all variables are optional for this Mutation, you can provide options without providing any variables.
    // To do so, you must pass `undefined` where you would normally pass the variables.
    this.mutation.mutate(updateUserVars /** or undefined */, this.options());
  }
}
```

## DeleteUser
You can execute the `DeleteUser` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteUser(options?: DeleteUserOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteUserData, undefined, >;
```

### Variables
The `DeleteUser` Mutation has no variables.
### Return Type
Recall that calling the `DeleteUser` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteUser` Mutation is of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteUser`'s Mutation injector

```javascript
... // other imports
import { connectorConfig } from '@dataconnect/generated';
import { injectDeleteUser, DeleteUserOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteUser();

  // You can also pass in a `DeleteUserOptions` function (not object) to the Mutation injector function.
  options: DeleteUserOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteUser(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    this.mutation.mutate();

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync();

    // You can also pass in a `DeleteUserOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    // Since this Mutation accepts no variables, you must pass `undefined` where you would normally pass the variables.
    this.mutation.mutate(undefined, this.options());
  }
}
```

## CreateArticle
You can execute the `CreateArticle` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateArticle(options?: CreateArticleOptions, injector?: Injector): CreateDataConnectMutationResult<CreateArticleData, CreateArticleVariables, CreateArticleVariables>;
```

### Variables
The `CreateArticle` Mutation requires an argument of type `CreateArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateArticleVariables {
  title: string;
  content: string;
  language: string;
  difficultyLevel: string;
}
```
### Return Type
Recall that calling the `CreateArticle` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateArticle` Mutation is of type `CreateArticleData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateArticleData {
  article_insert: Article_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateArticle`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateArticleVariables } from '@dataconnect/generated';
import { injectCreateArticle, CreateArticleOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateArticle();

  // You can also pass in a `CreateArticleOptions` function (not object) to the Mutation injector function.
  options: CreateArticleOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateArticle(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateArticle` Mutation requires an argument of type `CreateArticleVariables`:
    const createArticleVars: CreateArticleVariables = {
      title: ..., 
      content: ..., 
      language: ..., 
      difficultyLevel: ..., 
    };
    this.mutation.mutate(createArticleVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ title: ..., content: ..., language: ..., difficultyLevel: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createArticleVars);

    // You can also pass in a `CreateArticleOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createArticleVars, this.options());
  }
}
```

## UpdateArticle
You can execute the `UpdateArticle` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateArticle(options?: UpdateArticleOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateArticleData, UpdateArticleVariables, UpdateArticleVariables>;
```

### Variables
The `UpdateArticle` Mutation requires an argument of type `UpdateArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateArticleVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that calling the `UpdateArticle` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateArticle` Mutation is of type `UpdateArticleData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateArticleData {
  article_update?: Article_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateArticle`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateArticleVariables } from '@dataconnect/generated';
import { injectUpdateArticle, UpdateArticleOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateArticle();

  // You can also pass in a `UpdateArticleOptions` function (not object) to the Mutation injector function.
  options: UpdateArticleOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateArticle(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateArticle` Mutation requires an argument of type `UpdateArticleVariables`:
    const updateArticleVars: UpdateArticleVariables = {
      id: ..., 
      title: ..., // optional
    };
    this.mutation.mutate(updateArticleVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., title: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateArticleVars);

    // You can also pass in a `UpdateArticleOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateArticleVars, this.options());
  }
}
```

## DeleteArticle
You can execute the `DeleteArticle` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteArticle(options?: DeleteArticleOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteArticleData, DeleteArticleVariables, DeleteArticleVariables>;
```

### Variables
The `DeleteArticle` Mutation requires an argument of type `DeleteArticleVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteArticleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteArticle` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteArticle` Mutation is of type `DeleteArticleData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteArticleData {
  article_delete?: Article_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteArticle`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteArticleVariables } from '@dataconnect/generated';
import { injectDeleteArticle, DeleteArticleOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteArticle();

  // You can also pass in a `DeleteArticleOptions` function (not object) to the Mutation injector function.
  options: DeleteArticleOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteArticle(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteArticle` Mutation requires an argument of type `DeleteArticleVariables`:
    const deleteArticleVars: DeleteArticleVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteArticleVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteArticleVars);

    // You can also pass in a `DeleteArticleOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteArticleVars, this.options());
  }
}
```

## CreateVocabulary
You can execute the `CreateVocabulary` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateVocabulary(options?: CreateVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<CreateVocabularyData, CreateVocabularyVariables, CreateVocabularyVariables>;
```

### Variables
The `CreateVocabulary` Mutation requires an argument of type `CreateVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateVocabularyVariables {
  originalWord: string;
  translation: string;
  masteryLevel: number;
}
```
### Return Type
Recall that calling the `CreateVocabulary` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateVocabulary` Mutation is of type `CreateVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateVocabularyData {
  vocabularyItem_insert: VocabularyItem_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateVocabulary`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateVocabularyVariables } from '@dataconnect/generated';
import { injectCreateVocabulary, CreateVocabularyOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateVocabulary();

  // You can also pass in a `CreateVocabularyOptions` function (not object) to the Mutation injector function.
  options: CreateVocabularyOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateVocabulary(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateVocabulary` Mutation requires an argument of type `CreateVocabularyVariables`:
    const createVocabularyVars: CreateVocabularyVariables = {
      originalWord: ..., 
      translation: ..., 
      masteryLevel: ..., 
    };
    this.mutation.mutate(createVocabularyVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ originalWord: ..., translation: ..., masteryLevel: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createVocabularyVars);

    // You can also pass in a `CreateVocabularyOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createVocabularyVars, this.options());
  }
}
```

## UpdateVocabulary
You can execute the `UpdateVocabulary` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateVocabulary(options?: UpdateVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateVocabularyData, UpdateVocabularyVariables, UpdateVocabularyVariables>;
```

### Variables
The `UpdateVocabulary` Mutation requires an argument of type `UpdateVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateVocabularyVariables {
  id: UUIDString;
  masteryLevel: number;
}
```
### Return Type
Recall that calling the `UpdateVocabulary` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateVocabulary` Mutation is of type `UpdateVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateVocabularyData {
  vocabularyItem_update?: VocabularyItem_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateVocabulary`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateVocabularyVariables } from '@dataconnect/generated';
import { injectUpdateVocabulary, UpdateVocabularyOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateVocabulary();

  // You can also pass in a `UpdateVocabularyOptions` function (not object) to the Mutation injector function.
  options: UpdateVocabularyOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateVocabulary(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateVocabulary` Mutation requires an argument of type `UpdateVocabularyVariables`:
    const updateVocabularyVars: UpdateVocabularyVariables = {
      id: ..., 
      masteryLevel: ..., 
    };
    this.mutation.mutate(updateVocabularyVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., masteryLevel: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateVocabularyVars);

    // You can also pass in a `UpdateVocabularyOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateVocabularyVars, this.options());
  }
}
```

## DeleteVocabulary
You can execute the `DeleteVocabulary` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteVocabulary(options?: DeleteVocabularyOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteVocabularyData, DeleteVocabularyVariables, DeleteVocabularyVariables>;
```

### Variables
The `DeleteVocabulary` Mutation requires an argument of type `DeleteVocabularyVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteVocabularyVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteVocabulary` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteVocabulary` Mutation is of type `DeleteVocabularyData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteVocabularyData {
  vocabularyItem_delete?: VocabularyItem_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteVocabulary`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteVocabularyVariables } from '@dataconnect/generated';
import { injectDeleteVocabulary, DeleteVocabularyOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteVocabulary();

  // You can also pass in a `DeleteVocabularyOptions` function (not object) to the Mutation injector function.
  options: DeleteVocabularyOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteVocabulary(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteVocabulary` Mutation requires an argument of type `DeleteVocabularyVariables`:
    const deleteVocabularyVars: DeleteVocabularyVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteVocabularyVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteVocabularyVars);

    // You can also pass in a `DeleteVocabularyOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteVocabularyVars, this.options());
  }
}
```

## CreateProgress
You can execute the `CreateProgress` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateProgress(options?: CreateProgressOptions, injector?: Injector): CreateDataConnectMutationResult<CreateProgressData, CreateProgressVariables, CreateProgressVariables>;
```

### Variables
The `CreateProgress` Mutation requires an argument of type `CreateProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateProgressVariables {
  articleId: UUIDString;
  status: string;
  timeSpent: number;
}
```
### Return Type
Recall that calling the `CreateProgress` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateProgress` Mutation is of type `CreateProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateProgressData {
  userProgress_insert: UserProgress_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateProgress`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateProgressVariables } from '@dataconnect/generated';
import { injectCreateProgress, CreateProgressOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateProgress();

  // You can also pass in a `CreateProgressOptions` function (not object) to the Mutation injector function.
  options: CreateProgressOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateProgress(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateProgress` Mutation requires an argument of type `CreateProgressVariables`:
    const createProgressVars: CreateProgressVariables = {
      articleId: ..., 
      status: ..., 
      timeSpent: ..., 
    };
    this.mutation.mutate(createProgressVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ articleId: ..., status: ..., timeSpent: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createProgressVars);

    // You can also pass in a `CreateProgressOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createProgressVars, this.options());
  }
}
```

## UpdateProgress
You can execute the `UpdateProgress` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateProgress(options?: UpdateProgressOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateProgressData, UpdateProgressVariables, UpdateProgressVariables>;
```

### Variables
The `UpdateProgress` Mutation requires an argument of type `UpdateProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateProgressVariables {
  id: UUIDString;
  status?: string | null;
}
```
### Return Type
Recall that calling the `UpdateProgress` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateProgress` Mutation is of type `UpdateProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateProgressData {
  userProgress_update?: UserProgress_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateProgress`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateProgressVariables } from '@dataconnect/generated';
import { injectUpdateProgress, UpdateProgressOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateProgress();

  // You can also pass in a `UpdateProgressOptions` function (not object) to the Mutation injector function.
  options: UpdateProgressOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateProgress(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateProgress` Mutation requires an argument of type `UpdateProgressVariables`:
    const updateProgressVars: UpdateProgressVariables = {
      id: ..., 
      status: ..., // optional
    };
    this.mutation.mutate(updateProgressVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., status: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateProgressVars);

    // You can also pass in a `UpdateProgressOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateProgressVars, this.options());
  }
}
```

## DeleteProgress
You can execute the `DeleteProgress` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteProgress(options?: DeleteProgressOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteProgressData, DeleteProgressVariables, DeleteProgressVariables>;
```

### Variables
The `DeleteProgress` Mutation requires an argument of type `DeleteProgressVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteProgressVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteProgress` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteProgress` Mutation is of type `DeleteProgressData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteProgressData {
  userProgress_delete?: UserProgress_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteProgress`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteProgressVariables } from '@dataconnect/generated';
import { injectDeleteProgress, DeleteProgressOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteProgress();

  // You can also pass in a `DeleteProgressOptions` function (not object) to the Mutation injector function.
  options: DeleteProgressOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteProgress(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteProgress` Mutation requires an argument of type `DeleteProgressVariables`:
    const deleteProgressVars: DeleteProgressVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteProgressVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteProgressVars);

    // You can also pass in a `DeleteProgressOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteProgressVars, this.options());
  }
}
```

## CreateReviewSession
You can execute the `CreateReviewSession` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectCreateReviewSession(options?: CreateReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<CreateReviewSessionData, CreateReviewSessionVariables, CreateReviewSessionVariables>;
```

### Variables
The `CreateReviewSession` Mutation requires an argument of type `CreateReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateReviewSessionVariables {
  score: number;
  sessionDate: TimestampString;
}
```
### Return Type
Recall that calling the `CreateReviewSession` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `CreateReviewSession` Mutation is of type `CreateReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateReviewSessionData {
  reviewSession_insert: ReviewSession_Key;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `CreateReviewSession`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, CreateReviewSessionVariables } from '@dataconnect/generated';
import { injectCreateReviewSession, CreateReviewSessionOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectCreateReviewSession();

  // You can also pass in a `CreateReviewSessionOptions` function (not object) to the Mutation injector function.
  options: CreateReviewSessionOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectCreateReviewSession(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `CreateReviewSession` Mutation requires an argument of type `CreateReviewSessionVariables`:
    const createReviewSessionVars: CreateReviewSessionVariables = {
      score: ..., 
      sessionDate: ..., 
    };
    this.mutation.mutate(createReviewSessionVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ score: ..., sessionDate: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(createReviewSessionVars);

    // You can also pass in a `CreateReviewSessionOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(createReviewSessionVars, this.options());
  }
}
```

## UpdateReviewSession
You can execute the `UpdateReviewSession` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectUpdateReviewSession(options?: UpdateReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateReviewSessionData, UpdateReviewSessionVariables, UpdateReviewSessionVariables>;
```

### Variables
The `UpdateReviewSession` Mutation requires an argument of type `UpdateReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateReviewSessionVariables {
  id: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that calling the `UpdateReviewSession` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `UpdateReviewSession` Mutation is of type `UpdateReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateReviewSessionData {
  reviewSession_update?: ReviewSession_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `UpdateReviewSession`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, UpdateReviewSessionVariables } from '@dataconnect/generated';
import { injectUpdateReviewSession, UpdateReviewSessionOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectUpdateReviewSession();

  // You can also pass in a `UpdateReviewSessionOptions` function (not object) to the Mutation injector function.
  options: UpdateReviewSessionOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectUpdateReviewSession(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `UpdateReviewSession` Mutation requires an argument of type `UpdateReviewSessionVariables`:
    const updateReviewSessionVars: UpdateReviewSessionVariables = {
      id: ..., 
      notes: ..., // optional
    };
    this.mutation.mutate(updateReviewSessionVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., notes: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(updateReviewSessionVars);

    // You can also pass in a `UpdateReviewSessionOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(updateReviewSessionVars, this.options());
  }
}
```

## DeleteReviewSession
You can execute the `DeleteReviewSession` Mutation using the `CreateDataConnectMutationResult` object returned by the following Mutation injector (which is defined in [dataconnect-generated/angular/index.d.ts](./index.d.ts)):
```javascript
injectDeleteReviewSession(options?: DeleteReviewSessionOptions, injector?: Injector): CreateDataConnectMutationResult<DeleteReviewSessionData, DeleteReviewSessionVariables, DeleteReviewSessionVariables>;
```

### Variables
The `DeleteReviewSession` Mutation requires an argument of type `DeleteReviewSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteReviewSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that calling the `DeleteReviewSession` Mutation injector returns a `CreateDataConnectMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `CreateDataConnectMutationResult.status()` function. You can also check for pending / success / error status using the `CreateDataConnectMutationResult.isPending()`, `CreateDataConnectMutationResult.isSuccess()`, and `CreateDataConnectMutationResult.isError()` functions.

To execute the Mutation, call `CreateDataConnectMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation. 

To access the data returned by a Mutation, use the `CreateDataConnectMutationResult.data()` function. The data for the `DeleteReviewSession` Mutation is of type `DeleteReviewSessionData`, which is defined in [dataconnect-generated/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteReviewSessionData {
  reviewSession_delete?: ReviewSession_Key | null;
}
```

You can also call `CreateDataConnectMutationResult.mutateAsync()`, which executes the Mutation and returns a promise with the data returned from the Mutation. To learn more, see the [TanStack Angular Query documentation](https://tanstack.com/query/latest/docs/framework/angular/guides/mutations#promises).

To learn more about the `CreateDataConnectMutationResult` object, see the [TanStack Query Firebase documentation](https://docs.page/invertase/tanstack-query-firebase/angular/data-connect/functions/injectDataConnectMutation) and the [TanStack Angular Query documentation](https://tanstack.com/query/v5/docs/framework/angular/reference/functions/injectmutation).

### Using `DeleteReviewSession`'s Mutation injector

```javascript
... // other imports
import { connectorConfig, DeleteReviewSessionVariables } from '@dataconnect/generated';
import { injectDeleteReviewSession, DeleteReviewSessionOptions } from '@dataconnect/generated/angular'
import { DataConnect } from '@angular/fire/data-connect';
import { initializeApp } from '@angular/fire/app';

@Component({
  ... // other component fields
  template: `
    <!-- You can render your component dynamically based on the status of the Mutation. -->
    @if (mutation.isPending()) {
      Loading...
    }
    @if (mutation.error()) {
      An error has occurred: {{ mutation.error() }}
    }
    <!-- If the Mutation is successful, you can access the data returned using
      the CreateDataConnectMutationResult.data() function. -->
    @if (mutation.data(); as data) {
      <!-- Use your data to display something -->
      <div>Mutation successful!</div>
    }
    <!-- Let's create a button that executes our mutation when clicked. -->
    <button
      (disabled)="mutation.isPending()"
      (click)="executeMutation()"
    >
      {{ mutation.isPending() ? 'Pending...' : 'Mutate!' }}
    </button>
  `,
})
export class MyComponent {
  // Call the Mutation injector function to get a `CreateDataConnectMutationResult` object which holds the state of your Mutation.
  mutation = injectDeleteReviewSession();

  // You can also pass in a `DeleteReviewSessionOptions` function (not object) to the Mutation injector function.
  options: DeleteReviewSessionOptions = () => {
    return {
      onSuccess: () => { console.log('Mutation succeeded!'); }
    };
  };
  mutation = injectDeleteReviewSession(this.options);

  // After calling the Mutation injector function, you must call `CreateDataConnectMutationResult.mutate()` to execute the Mutation.
  executeMutation() {
    // The `DeleteReviewSession` Mutation requires an argument of type `DeleteReviewSessionVariables`:
    const deleteReviewSessionVars: DeleteReviewSessionVariables = {
      id: ..., 
    };
    this.mutation.mutate(deleteReviewSessionVars);
    // Variables can be defined inline as well.
    this.mutation.mutate({ id: ..., });

    // You can call `CreateDataConnectMutationResult.mutateAsync()` to execute the Mutation and return a promise with the data returned from the Mutation.
    this.mutation.mutateAsync(deleteReviewSessionVars);

    // You can also pass in a `DeleteReviewSessionOptions` object (not function) to `CreateDataConnectMutationResult.mutate()`.
    this.mutation.mutate(deleteReviewSessionVars, this.options());
  }
}
```

