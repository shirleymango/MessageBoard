package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*

data class Message(val id: Int, val sender: String, val avatar: String, val timestamp: String, val text: String)

val messages = mutableListOf<Message>()

fun Application.configureRouting() {
    routing {
        // Root route
        get("/") {
            call.respondText("Welcome to the Chat Room!")
        }

        // Fetch all messages
        get("/messages") {
            call.respond(messages)
        }

        // Post a new message
        post("/messages") {
            val message = call.receive<Message>()
            messages.add(message)
            call.respond(mapOf("status" to "Message added"))
        }
    }
}