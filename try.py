import csv
import os

import pandas as pd
import camelot

def extract_tables_from_pdf(input_path, output_path):
    if not os.path.exists(input_path):
        raise ValueError("Input path does not exist")

    # Read the PDF file into a list of DataFrames
    df_list = camelot.read_pdf(input_path, pages="all", flavor="stream")

    # Convert each Table object to a DataFrame
    df_list = [table.df for table in df_list]

    # Concatenate all DataFrames into a single DataFrame
    df = pd.concat(df_list)

    # Write the DataFrame to a CSV file
    df.to_csv(f"{output_path}/output.csv", index=False, header=False, quoting=csv.QUOTE_ALL)


extract_tables_from_pdf("election.pdf", "output")
