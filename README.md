# Message Board

This website allows users to send messages in a chat room. 

## Functionality

Here are the three main tabs:

**1) Login Page** - where a user enters their username and password

**2) Registration Page** - where a new user signs up

**3) Chat Room** - where the user can send messages and see all previously sent messages

![updated chat room](https://github.com/user-attachments/assets/ea9b4925-627f-4bb7-8fef-8be9d2dbdd40)

## Demo

Here is a demo of a new user creating an account, logging in, and sending a message.


https://github.com/user-attachments/assets/5d268ead-17ae-457d-91f9-04d59809600c

## Building & Running

This project was created using the [Ktor Project Generator](https://start.ktor.io).

Here's a list of features included in this project:

| Name                                                               | Description                                                                        |
|--------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [Routing](https://start.ktor.io/p/routing)                         | Provides a structured routing DSL                                                  |
| [Authentication](https://start.ktor.io/p/auth)                     | Provides extension point for handling the Authorization header                     |
| [Content Negotiation](https://start.ktor.io/p/content-negotiation) | Provides automatic content conversion according to Content-Type and Accept headers |
| [Call Logging](https://start.ktor.io/p/call-logging)               | Logs client requests                                                               |

To build or run the project, use one of the following tasks:

| Task                          | Description                                                          |
|-------------------------------|----------------------------------------------------------------------|
| `./gradlew test`              | Run the tests                                                        |
| `./gradlew build`             | Build everything                                                     |
| `buildFatJar`                 | Build an executable JAR of the server with all dependencies included |
| `buildImage`                  | Build the docker image to use with the fat JAR                       |
| `publishImageToLocalRegistry` | Publish the docker image locally                                     |
| `run`                         | Run the server                                                       |
| `runDocker`                   | Run using the local docker image                                     |

If the server starts successfully, you'll see the following output:

```
2024-12-04 14:32:45.584 [main] INFO  Application - Application started in 0.303 seconds.
2024-12-04 14:32:45.682 [main] INFO  Application - Responding at http://0.0.0.0:8080
```

