import os
import pandas as pd

def read_csv_files(directory: str):
    try:
        for filename in os.listdir(directory):
            if filename.endswith(".csv"):
                df = pd.read_csv(os.path.join(directory, filename), usecols=['Course', 'Days', 'Times', 'Location'])
                df = df[df['Location'].str.contains('TIER', na=False)]  # Select only rows where 'Location' contains 'CULM'
                for index, row in df.iterrows():
                    print(f"Course: {row['Course']}, Location: {row['Location']}, Days: {row['Days']}, Times: {row['Times']}")
        print("\n")
    except Exception as e:
        print(f"Error occurred: {e}")

read_csv_files('../Course Schedule')
