package com.example

import kotlinx.serialization.Serializable

@Serializable
data class Message(
    val id: Long,
    val sender: String? = null,
    val text: String,
    val timestamp: String
)