import { duckdb, toParquetSql } from "@/lib/duckdb"

import { DateRangeKey, getDateRangeCondition } from "../utils"

import "server-only"

export type PublicationReactionsOvertime = {
  reaction_day: string
  reaction_type: string
  reaction_count: number
}[]

export async function getPublicationReactionsOvertime(
  rangeKey: DateRangeKey = "ALL"
) {
  let sql = `
    SELECT
      DATE_TRUNC('day', action_at) AS reaction_day,
      type AS reaction_type,
      COUNT(*) AS reaction_count
    FROM
      publication_reaction
  `

  sql += getDateRangeCondition(rangeKey, "action_at")

  sql += `
    GROUP BY
      reaction_day, reaction_type
    ORDER BY
      reaction_day;
  `

  const reactionsRaw = await duckdb.all(toParquetSql(sql))

  reactionsRaw.forEach((a) => {
    a.reaction_count = Number(a.reaction_count)
    a.reaction_day = new Date(a.reaction_day).toISOString().split("T")[0] // Format to 'YYYY-MM-DD'
  })

  const transformedData = reactionsRaw.reduce(
    (acc, { reaction_day, reaction_type, reaction_count }) => {
      let dayEntry = acc.find((entry: any) => entry.date === reaction_day)
      if (!dayEntry) {
        dayEntry = { date: reaction_day }
        acc.push(dayEntry)
      }
      dayEntry[reaction_type] = reaction_count
      return acc
    },
    []
  )

  return transformedData as PublicationReactionsOvertime
}
