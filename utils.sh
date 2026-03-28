# GitHub Token を一度リセットし，GitHub CLI を使って再度ログイン
function github_auth(){
	unset GITHUB_TOKEN && \
	gh auth login && \
	gh auth setup-git
}