# Version 1.0.1
# This version will start on the analysis

# imports
import psycopg2
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Database connection parameters
connect = pspycopg2.connect(
    dbname="your_db_name",
    user="your_username",
    password="your_password",
    host="your_host",
    port="5432",
)
