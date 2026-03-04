# justfile for RESTORE-GRANTSFORM website

# default port used by hugo serve
PORT := "1992"

serve:
	# kill any process listening on the port
	-@if command -v lsof >/dev/null; then \
	pids=$(lsof -ti:{{PORT}}); \
	[ -n "$pids" ] && kill -9 $pids && echo "killed $pids on port {{PORT}}"; \
	fi
	# start hugo serve with explicit port
	hugo serve --disableFastRender --gc --noHTTPCache --port={{PORT}} &
	# give server a moment to start
	sleep 1
	# open default browser using xdg-open
	@xdg-open http://localhost:{{PORT}} >/dev/null 2>&1 || true




# directory where hugo output will be written by default
# default is the sibling repository used for publication
BUILD_DIR := "../grantsform.github.io"

# build the Hugo site from scratch
# you can override the target by passing BUILD_DIR on the command line:
#     just build BUILD_DIR=/some/path
# the directory is removed beforehand to ensure a clean output
build:
	@echo "building site to '{{BUILD_DIR}}' (clean)'"; \
	# ensure output directory exists and then purge its contents except git metadata
	@mkdir -p "{{BUILD_DIR}}"; \
	cd "{{BUILD_DIR}}" && \
		echo "contents before cleanup:" && ls -1A || true; \
	cd "{{BUILD_DIR}}" && \
		find . -mindepth 1 -maxdepth 1 \
			! -name .git ! -name .gitignore -print -exec rm -rf {} +; \
	# finally invoke Hugo to rebuild the site
	hugo --cleanDestinationDir --gc --destination="{{BUILD_DIR}}"
