import logging


logging.basicConfig(
    level=logging.INFO,
    # Avoid duplicating request/trace info here; include only message + level.
    format="%(asctime)s | %(levelname)s | %(message)s",
)

logger = logging.getLogger("coo-agent")

