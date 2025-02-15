# BigQuery to DuckDB Sync Script

This is a Python script which syncs data from a Lens Google BigQuery dataset to a local DuckDB database at regular intervals.

## Install the necessary Python packages:

```sh
poetry install
```

## Setup the Service Account

Before running the script, make sure you have downloaded the service account JSON file:

- Follow https://cloud.google.com/docs/authentication/getting-started#creating_a_service_account to create a new service account and download the JSON key file.
- Place the JSON key file in the same directory as this script and rename it to 'service_account.json'.

## Running the Script

Run the script using a Python interpreter:
Export all tables into parquet directory:

```sh
python sync_parquet.py -o  test/

# sync a specific table
python sync_parquet.py -o  test/ -t v2_polygon

# concurrent sync
python sync_parquet.py -o  test/ -c 4
```

Export all tables into a single DuckDB database and parquet directory:

```sh
poetry shell
python sync.py -i v2_polygon.db -o /tmp/v2_polygon
```

Export Sample Data from DuckDB:

```sh
poetry shell
python sample.py --db /tmp/v2_polygon.db
```

## How it Works

- On script start and at every scheduled interval, the script checks for new or updated rows in each table of the specified BigQuery dataset.
- Checks whether each table exists in the DuckDB database, creating it if not.
- Retrieves the BigQuery table schema, converts it from RECORD to individual fields and creates the table in DuckDB with this schema if it does not already exist.
- Retrieves the maximum `source_timestamp` value from the DuckDB table and fetches all rows from the BigQuery table that have a `source_timestamp` greater than this.
- Inserts the fetched rows into the corresponding DuckDB table.
