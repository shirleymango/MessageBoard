package com.example

import kotlinx.serialization.Serializable

@Serializable
data class Message(
    val id: Long, // Changed from Int to Long
    val sender: String,
    val text: String,
    val timestamp: String
)