import os
import pandas as pd
from datetime import datetime, timedelta
import webbrowser

def read_csv_files(directory: str):
    schedule = {}  # Use a dictionary to store schedule
    open_time = datetime.strptime('8:00 AM', '%I:%M %p')
    close_time = datetime.strptime('10:00 PM', '%I:%M %p')
    day_order = {'M': 1, 'T': 2, 'W': 3, 'R': 4}  # Order for days of the week
    try:
        for filename in os.listdir(directory):
            if filename.endswith(".csv"):
                df = pd.read_csv(os.path.join(directory, filename), usecols=['Course', 'Days', 'Times', 'Location'])
                df = df[df['Location'].str.contains('KUPF', na=False)]  # Select only rows where 'Location' contains 'CKB'
                for index, row in df.iterrows():
                    room = row['Location'].split(' ')[1]  # Split the 'Location' on space and take the second part
                    if room not in schedule:
                        schedule[room] = []
                    start_time, end_time = [datetime.strptime(t, '%I:%M %p') for t in row['Times'].split(' - ')]
                    schedule[room].append((row['Days'], start_time, end_time))  # Add the days and times to the room's schedule
        data = []  # List to store the data for the DataFrame
        for room, times in schedule.items():
            for day in ['M', 'T', 'W', 'R']:
                sorted_times = sorted([time for time in times if day in time[0]], key=lambda x: x[1])  # Sort the times for this day
                if not sorted_times:
                    data.append([room, day, "Open all day"])
                    continue
                if open_time < sorted_times[0][1]:
                    data.append([room, day, f"Open from {open_time.strftime('%I:%M %p')} to {sorted_times[0][1].strftime('%I:%M %p')}"])
                for i in range(len(sorted_times) - 1):
                    if sorted_times[i][2] < sorted_times[i+1][1]:
                        data.append([room, day, f"Open from {sorted_times[i][2].strftime('%I:%M %p')} to {sorted_times[i+1][1].strftime('%I:%M %p')}"])
                if sorted_times[-1][2] < close_time:
                    data.append([room, day, f"Open from {sorted_times[-1][2].strftime('%I:%M %p')} to {close_time.strftime('%I:%M %p')}"])
        df = pd.DataFrame(data, columns=['Room', 'Day', 'Free Time'])  # Create a DataFrame from the data
        df['Day'] = df['Day'].map(day_order)  # Map the days to their order
        df = df.sort_values(['Room', 'Day', 'Free Time'])  # Sort the DataFrame by the 'Room', 'Day', and 'Free Time' columns
        df['Day'] = df['Day'].map({v: k for k, v in day_order.items()})  # Map the days back to their original values
        html = df.to_html(index=False)  # Convert the DataFrame to HTML without the index
        html = html.replace('<table', '<table style="border:1px solid black; border-collapse:collapse;"')  # Add some CSS to the HTML
        html = html.replace('<th', '<th style="background-color: #4CAF50; color: white; border:1px solid black; padding:5px;"')  # Add some CSS to the HTML
        html = html.replace('<td', '<td style="border:1px solid black; padding:5px;"')  # Add some CSS to the HTML
        with open('kupf-schedule.html', 'w') as f:
            f.write(html)  # Write the HTML to a file
        webbrowser.open('kupf-schedule.html', new=2)  # Open the HTML file in a new browser window
    except Exception as e:
        print(f"Error occurred: {e}")

read_csv_files('../Course Schedule')
