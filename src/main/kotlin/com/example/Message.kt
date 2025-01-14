package com.example

import kotlinx.serialization.Serializable

@Serializable
data class Message(
    val sender: String? = null,
    val text: String,
    val timestamp: String
)