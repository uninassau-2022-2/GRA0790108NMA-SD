package com.token.project.service

import com.token.project.model.Token
import com.token.project.repositories.TokenRepository
import com.token.project.utils.Constants
import com.token.project.utils.DateFormatUtils
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.Month
import java.util.Date

@Service
class TokenService(val repository: TokenRepository) {
    fun getAll(): List<Token> = repository.findAll()

    fun findAllUnfinishedTokens(): List<Token> = repository.findAllUnfinishedTokens()

    fun getAllByDay(day: LocalDate): List<Token> {
        return repository.findAllByDay(day)
    }

    fun getAllByMes(month: String): List<Token> {
        val startDate = DateFormatUtils.getStartDate(month)
        val endDate = DateFormatUtils.getEndDate(month)
        return repository.findAllByMonth(startDate, endDate)
    }

    fun getAllPriorityTokens(): List<Token> {
        return repository.findAllPriorityTokens(Constants.PRIORITY_TOKEN)
    }

    fun getAllFinishedPriorityTokens(): List<Token> {
        return repository.findAllFinishedPriorityTokens(Constants.PRIORITY_TOKEN, true)
    }

    fun getAllFinishedTokens(): List<Token> {
        return repository.findAllFinishedTokens(true)
    }

    fun updateTokenStatus(tokenId: Int) {
        return repository.updateTokenStatus(tokenId)
    }

    fun create(token: Token): Token = repository.save(token)
}