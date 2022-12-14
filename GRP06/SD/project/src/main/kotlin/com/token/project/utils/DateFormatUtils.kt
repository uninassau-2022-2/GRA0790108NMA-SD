package com.token.project.utils

import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.Month
import java.util.Date
import java.util.Locale

object DateFormatUtils {
    val diaHoje = LocalDate.now()

    fun getStartDate(month: String): String {
        return "${Constants.YEAR}-$month-${Constants.START_DAY}"
    }

    fun getEndDate(month: String): String {
        return if(LocalDate.now().lengthOfMonth().toString() == Constants.MES_30) {
            "${Constants.YEAR}-$month-${Constants.MES_30}"
        } else {
            "${Constants.YEAR}-$month-${Constants.MES_31}"
        }
    }
}