# reaction_analysis_db.py
# Version: 1.1.0
# Updated: Save plots to PNG instead of opening a window
# Added detailed comments

# =========================
# Imports
# =========================
import os
import pandas as pd
import matplotlib

matplotlib.use("TkAgg")  # Ensure matplotlib uses a GUI backend (optional)
import matplotlib.pyplot as plt
import seaborn as sns
from dotenv import load_dotenv
import requests

# =========================
# Load environment variables
# =========================
load_dotenv()
GRAPHQL_URL = os.getenv("GRAPHQL_URL")
if not GRAPHQL_URL:
    raise ValueError("GRAPHQL_URL not found in .env")


# =========================
# 1️⃣ Fetch all reaction times
# =========================
def fetch_all_reaction_times():
    """Fetch all reaction times from the backend GraphQL API."""
    query = """
    query {
      getAllReactionTimes {
        id
        userId
        reactionTime
        timestamp
      }
    }
    """
    response = requests.post(GRAPHQL_URL, json={"query": query})
    response.raise_for_status()
    data = response.json()

    # Convert to DataFrame
    df = pd.DataFrame(data["data"]["getAllReactionTimes"])
    df["reactionTime"] = pd.to_numeric(df["reactionTime"])
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    return df


# =========================
# 2️⃣ Fetch reaction times by user
# =========================
def fetch_reaction_times_by_user(user_id):
    """Fetch reaction times for a specific user."""
    query = f"""
    query {{
      getReactionTimesByUser(userId: "{user_id}") {{
        id
        userId
        reactionTime
        timestamp
      }}
    }}
    """
    response = requests.post(GRAPHQL_URL, json={"query": query})
    response.raise_for_status()
    data = response.json()

    df = pd.DataFrame(data["data"]["getReactionTimesByUser"])
    df["reactionTime"] = pd.to_numeric(df["reactionTime"])
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    return df


# =========================
# 3️⃣ Add a new reaction time
# =========================
def add_reaction_time(user_id, reaction_time):
    """Add a new reaction time to the backend."""
    mutation = f"""
    mutation {{
      addReactionTime(userId: "{user_id}", reactionTime: {reaction_time}) {{
        id
        userId
        reactionTime
        timestamp
      }}
    }}
    """
    response = requests.post(GRAPHQL_URL, json={"query": mutation})
    response.raise_for_status()
    return response.json()["data"]["addReactionTime"]


# =========================
# 4️⃣ Compute statistics
# =========================
def compute_statistics(df):
    """Compute descriptive statistics and identify outliers."""
    reaction_times = df["reactionTime"]

    stats_dict = {
        "mean": reaction_times.mean(),
        "median": reaction_times.median(),
        "mode": reaction_times.mode()[0] if not reaction_times.mode().empty else None,
        "LQ": reaction_times.quantile(0.25),
        "UQ": reaction_times.quantile(0.75),
        "IQR": reaction_times.quantile(0.75) - reaction_times.quantile(0.25),
        "min": reaction_times.min(),
        "max": reaction_times.max(),
    }

    stats_dict["lower_whisker"] = max(
        stats_dict["min"], stats_dict["LQ"] - 1.5 * stats_dict["IQR"]
    )
    stats_dict["upper_whisker"] = min(
        stats_dict["max"], stats_dict["UQ"] + 1.5 * stats_dict["IQR"]
    )
    stats_dict["outliers"] = reaction_times[
        (reaction_times < stats_dict["lower_whisker"])
        | (reaction_times > stats_dict["upper_whisker"])
    ].tolist()

    return stats_dict


# =========================
# 5️⃣ Plot Dot Plot with Box-and-Whisker overlay
# =========================
# =========================
# Plot Dot Plot with Box-and-Whisker overlay
# =========================
def plot_boxplot(df, stats_dict, save_path="reaction_times_plot.png"):
    """
    Creates a dot plot (strip plot) overlaid with a box-and-whisker plot for reaction times.

    Args:
        df (pd.DataFrame): DataFrame containing reaction times
        stats_dict (dict): Precomputed statistics from compute_statistics()
        save_path (str): File path to save the plot
    """
    import matplotlib.pyplot as plt
    import seaborn as sns

    # --- Create figure and axis ---
    fig, ax = plt.subplots(figsize=(12, 6))
    fig.patch.set_facecolor("#f9f9f9")  # figure background
    ax.set_facecolor("#f9f9f9")  # plot background

    # --- Strip plot: true dot plot ---
    sns.stripplot(
        x=df["reactionTime"],
        ax=ax,
        size=8,  # dot size
        color="#4C72B0",
        alpha=0.65,
        jitter=True,  # slightly separate overlapping dots
    )

    # --- Box-and-whisker plot overlay ---
    y_max = ax.get_ylim()[1]  # use current y-limit for box width scaling
    sns.boxplot(
        x=df["reactionTime"],
        ax=ax,
        whis=1.5,
        width=y_max * 0.2,
        boxprops=dict(facecolor="white", edgecolor="#2c2c2c", linewidth=1.5, alpha=0.9),
        whiskerprops=dict(color="#2c2c2c", linewidth=1.5),
        capprops=dict(color="#2c2c2c", linewidth=2),
        medianprops=dict(color="#e63946", linewidth=2.5),
        flierprops=dict(marker="o", markerfacecolor="#e63946", markersize=5, alpha=0.5),
    )

    # --- Mean, median, mode vertical lines ---
    line_styles = [
        (stats_dict["mean"], "#e63946", "--", f'Mean: {stats_dict["mean"]:.1f} ms'),
        (
            stats_dict["median"],
            "#2a9d8f",
            "-.",
            f'Median: {stats_dict["median"]:.1f} ms',
        ),
        (stats_dict["mode"], "#f4a261", ":", f'Mode: {stats_dict["mode"]:.1f} ms'),
    ]
    for val, color, ls, label in line_styles:
        ax.axvline(val, color=color, linestyle=ls, linewidth=1.8, label=label)

    # --- IQR shading ---
    ax.axvspan(
        stats_dict["LQ"],
        stats_dict["UQ"],
        alpha=0.08,
        color="#4C72B0",
        label=f'IQR: {stats_dict["IQR"]:.1f} ms',
    )

    # --- Whisker endpoint annotations ---
    y_annot = y_max * 0.08
    for val, label in [
        (stats_dict["lower_whisker"], f"▲ {stats_dict['lower_whisker']:.1f}"),
        (stats_dict["upper_whisker"], f"{stats_dict['upper_whisker']:.1f} ▲"),
    ]:
        ax.text(
            val, y_annot, label, ha="center", fontsize=8, color="#555", style="italic"
        )

    # --- Outlier count badge ---
    n_outliers = len(stats_dict["outliers"])
    if n_outliers:
        ax.text(
            0.99,
            0.97,
            f"{n_outliers} outlier{'s' if n_outliers > 1 else ''}",
            transform=ax.transAxes,
            ha="right",
            va="top",
            fontsize=9,
            color="#e63946",
            bbox=dict(
                boxstyle="round,pad=0.3",
                facecolor="white",
                edgecolor="#e63946",
                alpha=0.7,
            ),
        )

    # --- Labels & legend ---
    ax.set_title("Reaction Time Distribution", fontsize=16, fontweight="bold", pad=14)
    ax.set_xlabel("Reaction Time (ms)", fontsize=12)
    ax.set_ylabel("Count / Dots", fontsize=12)
    ax.legend(loc="upper left", framealpha=0.85, fontsize=9)
    sns.despine(ax=ax)

    # --- Layout & Save ---
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)  # save plot to file
    print(f"Plot saved to {save_path}")
    plt.show()  # display the plot


# =========================
# 6️⃣ Main test function
# =========================
def main():
    # Fetch live reaction times
    print("Fetching all reaction times...")
    df = fetch_all_reaction_times()
    print(df.head(), "\n")

    # Optional: Add a new reaction time (comment out if not needed)
    # new_entry = add_reaction_time("python-test-user", 255)
    # print("Added new reaction time:", new_entry, "\n")

    # Compute statistics
    print("Computing statistics...")
    stats = compute_statistics(df)
    for key, value in stats.items():
        print(f"{key}: {value}")

    # Plot and save
    print("\nGenerating plot...")
    plot_boxplot(df, stats, save_path="reaction_times_plot.png")


# =========================
# Run if executed directly
# =========================
if __name__ == "__main__":
    main()
