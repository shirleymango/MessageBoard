package com.example

import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.request.*
import io.ktor.server.routing.*
import io.ktor.server.http.content.*
import com.example.Message

val messages = mutableListOf<Message>()

fun Application.configureRouting() {
    routing {
        // Serve static files
        static("/") {
            resources("static")
            defaultResource("static/index.html")
        }

        // Retrieve all messages
        get("/messages") {
            call.respond(messages)
        }

        // Send a new message
        post("/messages") {
            val message = call.receive<Message>() // Receive the message
            messages.add(message) // Add it to the in-memory list
            call.respond(mapOf("status" to "Message added")) // Confirm addition
        }
    }
}