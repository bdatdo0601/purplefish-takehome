# Makefile for running all 3 servers

.PHONY: help dev stop clean install
include .env
export

help:
	@echo "Available commands"
	@echo "  stop     - Stop all running servers"
	@echo "  dev      - Start all servers"
	@echo "  install  - Install dependencies for all servers"
	@echo "  clean    - Clean all node_modules and build files"

install:
	@echo "validate environment variables exist"
	@if [ -z "$$PB_SUPERUSER_EMAIL" ]; then \
		echo "Error: PB_SUPERUSER_EMAIL environment variable is not set"; \
		exit 1; \
	fi
	@if [ -z "$$PB_SUPERUSER_PASSWORD" ]; then \
		echo "Error: PB_SUPERUSER_PASSWORD environment variable is not set"; \
		exit 1; \
	fi
	@echo "Installing dependencies..."
	cd ui && npm install
	cd purplefish-agent-core && npm install
	cd persist-store && ./pocketbase superuser create $(PB_SUPERUSER_EMAIL) $(PB_SUPERUSER_PASSWORD)

dev:
	@echo "validate environment variables exist"
	@if [ -z "$$OPENAI_API_KEY" ]; then \
		echo "Error: OPENAI_API_KEY environment variable is not set"; \
		exit 1; \
	fi
	@echo "Starting all servers in development mode..."
	npm run start

clean:
	@echo "Cleaning build files and dependencies..."
	cd ui && rm -rf node_modules dist build .next next-env.d.ts
	cd purplefish-agent-core && rm -rf node_modules dist build .env .mastra
	cd persist-store && rm -rf pb_data
	@echo "Clean complete."
