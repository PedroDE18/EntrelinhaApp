# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectCreateUser, injectUpdateUser, injectDeleteUser, injectGetUser, injectListUsers, injectCreateArticle, injectUpdateArticle, injectDeleteArticle, injectGetArticle, injectListArticles } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly CreateUserOperation = injectCreateUser(createUserVars);
  private readonly UpdateUserOperation = injectUpdateUser(updateUserVars);
  private readonly DeleteUserOperation = injectDeleteUser();
  private readonly GetUserOperation = injectGetUser();
  private readonly ListUsersOperation = injectListUsers();
  private readonly CreateArticleOperation = injectCreateArticle(createArticleVars);
  private readonly UpdateArticleOperation = injectUpdateArticle(updateArticleVars);
  private readonly DeleteArticleOperation = injectDeleteArticle(deleteArticleVars);
  private readonly GetArticleOperation = injectGetArticle(getArticleVars);
  private readonly ListArticlesOperation = injectListArticles();
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, getUser, listUsers, createArticle, updateArticle, deleteArticle, getArticle, listArticles } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation GetUser: 
const { data } = await GetUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateArticle:  For variables, look at type CreateArticleVars in ../index.d.ts
const { data } = await CreateArticle(dataConnect, createArticleVars);

// Operation UpdateArticle:  For variables, look at type UpdateArticleVars in ../index.d.ts
const { data } = await UpdateArticle(dataConnect, updateArticleVars);

// Operation DeleteArticle:  For variables, look at type DeleteArticleVars in ../index.d.ts
const { data } = await DeleteArticle(dataConnect, deleteArticleVars);

// Operation GetArticle:  For variables, look at type GetArticleVars in ../index.d.ts
const { data } = await GetArticle(dataConnect, getArticleVars);

// Operation ListArticles: 
const { data } = await ListArticles(dataConnect);


```