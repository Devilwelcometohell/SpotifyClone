def format_views(count):

    count = int(count)

    if count >= 1_000_000_000:
        return f"{count/1_000_000_000:.1f}B"

    if count >= 1_000_000:
        return f"{count/1_000_000:.1f}M"

    if count >= 1_000:
        return f"{count/1000:.1f}K"

    return str(count)