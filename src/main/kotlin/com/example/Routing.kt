package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import io.ktor.server.http.content.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.mindrot.jbcrypt.BCrypt

// Data classes for users and chat sessions
@Serializable
data class User(val username: String, val password: String)

@Serializable
data class ChatSession(val username: String)

fun Application.configureRouting() {
    install(Sessions) {
        cookie<ChatSession>("SESSION") {
            cookie.secure = false // For local development
        }
    }

    initDatabase() // Initialize SQLite database

    routing {
        // Serve static files
        static("/") {
            resources("static")
            defaultResource("static/login.html")
        }

        // Register a new user
        post("/register") {
            val user = call.receive<User>()
            val hashedPassword = BCrypt.hashpw(user.password, BCrypt.gensalt())
            try {
                transaction {
                    Users.insert {
                        it[username] = user.username
                        it[password] = hashedPassword
                    }
                }
                call.respond(mapOf("status" to "User registered successfully"))
            } catch (e: Exception) {
                call.respond(mapOf("error" to "Username already exists"))
            }
        }

        // Login an existing user
        post("/login") {
            val user = call.receive<User>()
            val dbUser = transaction {
                Users.select { Users.username eq user.username }.singleOrNull()
            }

            if (dbUser != null && BCrypt.checkpw(user.password, dbUser[Users.password])) {
                call.sessions.set(ChatSession(user.username))
                call.respond(mapOf("status" to "Login successful"))
            } else {
                call.respond(mapOf("error" to "Invalid username or password"))
            }
        }

        // Fetch current logged-in user
        get("/current-user") {
            val session = call.sessions.get<ChatSession>()
            if (session != null) {
                call.respond(mapOf("username" to session.username))
            } else {
                call.respond(mapOf("error" to "No user logged in"))
            }
        }

        // Fetch all messages
        get("/messages") {
            val messageList = transaction {
                Messages.selectAll().map {
                    Message(
                        id = it[Messages.id],
                        sender = it[Messages.sender],
                        text = it[Messages.text],
                        timestamp = it[Messages.timestamp]
                    )
                }
            }
            call.respond(messageList)
        }

        // Post a new message
        post("/messages") {
            val session = call.sessions.get<ChatSession>()
            if (session == null) {
                call.respond(mapOf("error" to "User not logged in"))
                return@post
            }

            val message = call.receive<Message>()
            transaction {
                Messages.insert {
                    it[sender] = session.username
                    it[text] = message.text
                    it[timestamp] = message.timestamp
                }
            }
            call.respond(mapOf("status" to "Message added"))
        }
    }
}