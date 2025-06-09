#!/usr/bin/env python3
import os, sys, datetime, subprocess, re

PRE_HEADER = """

<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<style>
@media (prefers-color-scheme: dark) {
    body {
        background-color: #1c1c1c;
        color: white;
    }
    .markdown-body table tr {
        background-color: #1c1c1c;
    }
    .markdown-body table tr:nth-child(2n) {
        background-color: black;
    }
}
</style>

"""

def compile_file(config, filename):
    args = ["pandoc", "--from", "markdown", "--to", "html"]

    if "[pandoc]: <> (--mathjax)" in open(filename).read():
        args += ["--mathjax"]

    args += [filename]
    result = subprocess.run(args, stdout=subprocess.PIPE)
    return result.stdout.decode("utf-8")

def get_metadata(filename):
    result = {}
    with open(filename) as f:
        for line in f:
            match = re.match("^(.*?): (.*?)$", line.strip())
            if not match:
                break
            result[match.group(1)] = match.group(2)
    return result

def render_post(config, path, metadata, body):
    root = os.path.relpath(".", os.path.dirname(path))

    header = HEADER_TEMPLATE.replace("$root", root)
    title = metadata.get("Title", "Untitled")
    subtitle = metadata.get("Subtitle", "")

    return PRE_HEADER + f"<title>{title}</title>" + header + f"<body><div class=markdown-body><h1>{title}</h1><i>{subtitle}</i><br>" + body + "</div></body>"

def get_output_dir(config, metadata):
    date = metadata["Date"]
    y, m, d = date.split("/")
    return os.path.join(y, m, d)

def metadata_to_path(config, metadata):
    directory = get_output_dir(config, metadata)
    os.makedirs(directory, exist_ok=True)
    filename = metadata["Title"].lower().replace(" ", "-") + ".html"
    return os.path.join(directory, filename)

def sync():
    config = get_metadata("config.md")
    subprocess.run([
        "rsync", "-a", ".", 
        f"{config['Server']}:{config['Directory']}"
    ])

HEADER_TEMPLATE = """
<link rel="stylesheet" type="text/css" href="$root/css/common-vendor.b8ecfc406ac0b5f77a26.css">
<link rel="stylesheet" type="text/css" href="$root/css/fretboard.f32f2a8d5293869f0195.css">
<link rel="stylesheet" type="text/css" href="$root/css/pretty.0ae3265014f89d9850bf.css">
<link rel="stylesheet" type="text/css" href="$root/css/pretty-vendor.83ac49e057c3eac4fce3.css">
<link rel="stylesheet" type="text/css" href="$root/css/global.css">
<link rel="stylesheet" type="text/css" href="$root/css/misc.css">
<script>
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js" async></script>
"""

# ---------- ENTRY POINT ----------
if __name__ == "__main__":
    if len(sys.argv) == 1:
        print("Usage: ./publish.py [--sync] posts/*.md")
        exit(1)

    if sys.argv[1] == "--sync":
        sync()
        exit(0)

    for filename in sys.argv[1:]:
        print("Processing file:", os.path.basename(filename))
        global_config = get_metadata("config.md")
        metadata = get_metadata(filename)
        print("DEBUG: Extracted metadata:", metadata)  # Debug line!
        path = metadata_to_path(global_config, metadata)

        compiled = compile_file(global_config, filename)
        html = render_post(global_config, path, metadata, compiled)

        with open(path, "w") as f:
            f.write(html)
        print("Created:", path)
