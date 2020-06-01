### Install the modules

```npm install```


###Start the app

```npm start```


### Test the app

```npm test```


### Project Stock-api

This project is a backend API built with Express and SQLITE as a database, providing routes for users to communicate with. The reasoning behind choosing these technologies is that Express is one the most used frameworks, paired with Node to develop APIs and webapps. It is also quite small and is easy to setup and enables a developer to get going fast. I chose to work with the SQLITE database since it is something I am familiar with since before and I have experienced it being quite easy to use and setup for my purposes.

The API provides additional authentication for the user through JWT-tokens. The API itself is mainly split into three parts - auth, stocks and users. Auth handles the authentication of the user, stocks handles the selling/buying of stocks and users handles the users information and balance. All the paths go through app, where they are then redirected to the different objects.

### Tests

I chose to use Chai and Mocha as my testing tools as they are well known, easy to setup and I have had some experience of working with them before. This enabled me to proceed a bit faster and focus more on generating tests. The majority of the tests have been performed as integration tests due to the API being quite small. I am overall satisfied with the code coverage as there are pretty much only database errors left to test. Which can be a bit tricky to implement in a test, hence why I have left it alone for now.

A CI-chain has also been implemented using Travis-CI and Scrutinizer in order to automate the development pipeline. They are great tools that provide good information about the code and makes it easier for the developer to further improve their code. As the codebase grows, one would need to ensure that they are still testing the relevant things, in this regards there can be both positives and negatives as the pipeline essentially enables you to automate tests of the existing code and ensure new updated do not break the existing code, providing a kind of smoke test. However, it is also important to keep in mind that the tests need to scale with the app. Overall, I am satisfied with what the tools bring to the table.
