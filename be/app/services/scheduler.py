from apscheduler.schedulers.background import BackgroundScheduler

scheduler = BackgroundScheduler()

def heartbeat():
    print("Scheduler is alive")

scheduler.add_job(
    heartbeat,
    "interval",
    seconds=30
)

