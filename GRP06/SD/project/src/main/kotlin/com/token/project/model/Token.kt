package com.token.project.model

import java.time.LocalDate
import java.util.Date
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "tokens")
data class Token(
    @Id @GeneratedValue var id: Int,
    var token_type: String,
    var token_date: LocalDate = LocalDate.now(),
    var token_finished: Boolean = false,
    var token_number: String = ""
)



