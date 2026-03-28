.PHONY: update install setup run reset-github-token

MAKEFILE_DIR := $(abspath $(lastword ${MAKEFILE_LIST})/..)

update: 
	# モジュールの更新
	@sudo apt update && sudo apt upgrade

install: update
	# npm コマンドを使えるように
	@curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
	@bash -c "source $$HOME/.nvm/nvm.sh && nvm install 22 && nvm use 22"
	
	# フロントエンドサーバにて必要なモジュールのインストール
	@cd ${MAKEFILE_DIR}/my-portfolio-site && npm install

setup: install
	# 環境設定ファイルの作成
	@cd ${MAKEFILE_DIR}/my-portfolio-site && \
	touch .env && \
	echo "VITE_CONTENTFUL_SPACE_ID=''" > .env && \
	echo "VITE_CONTENTFUL_ACCESS_TOKEN=''" >> .env

run: 
	# フロントエンド側サーバの構築
	@cd ${MAKEFILE_DIR}/my-portfolio-site && npm run dev

reset-github-token: 
	# GitHub Token を一度リセットし，GitHub CLI を使って再度ログイン後，Bashコマンドを起動
	@unset GITHUB_TOKEN && \
	gh auth login && \
	gh auth setup-git && \
	echo -n "Bash で実行するコマンドを入力してください: " && \
	read BASH_CMD && \
	echo "$${BASH_CMD}" | bash
