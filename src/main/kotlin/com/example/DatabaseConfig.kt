package com.example

import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction

// User table
object Users : Table() {
    val id = integer("id").autoIncrement()
    val username = varchar("username", 50).uniqueIndex()
    val password = varchar("password", 60) // Bcrypt hashes are 60 chars
    override val primaryKey = PrimaryKey(id)
}

// Message table
object Messages : Table() {
    val id = long("id").autoIncrement()
    val sender = varchar("sender", 50)
    val text = text("text")
    val timestamp = varchar("timestamp", 50)
    override val primaryKey = PrimaryKey(id)
}

// Initialize database
fun initDatabase() {
    Database.connect("jdbc:sqlite:chat_app.db", driver = "org.sqlite.JDBC")
    transaction {
        SchemaUtils.create(Users, Messages)
    }
}