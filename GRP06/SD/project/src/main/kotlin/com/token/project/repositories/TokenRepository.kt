package com.token.project.repositories

import com.token.project.model.Token
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface TokenRepository : JpaRepository<Token, Int> {
    @Query("SELECT tk FROM Token tk WHERE tk.token_date = :day")
    fun findAllByDay(@Param("day") dia: LocalDate): List<Token>

    @Query("SELECT tk FROM Token tk WHERE tk.token_finished = false")
    fun findAllUnfinishedTokens(): List<Token>

    @Query(
        "SELECT * FROM tokens tk WHERE tk.token_date >= :startDate AND tk.token_date <= :endDate",
        nativeQuery = true
    )
    fun findAllByMonth(@Param("startDate") startDate: String, @Param("endDate") endDate: String): List<Token>

    @Query("SELECT * FROM tokens tk WHERE tk.token_finished = :finished", nativeQuery = true)
    fun findAllFinishedTokens(@Param("finished") finished: Boolean): List<Token>

    @Query("SELECT * FROM tokens tk WHERE tk.token_type = :priority", nativeQuery = true)
    fun findAllPriorityTokens(@Param("priority") priority: String): List<Token>

    @Query("SELECT * FROM tokens tk WHERE tk.token_type = :priority AND tk.token_finished = :finished", nativeQuery = true)
    fun findAllFinishedPriorityTokens(@Param("priority") priority: String, @Param("finished") finished: Boolean): List<Token>

    @Modifying
    @Query(
        "UPDATE tokens tk SET tk.token_finished = true WHERE tk.id = :id",
        nativeQuery = true
    )
    fun updateTokenStatus(@Param("id") id: Int)
}